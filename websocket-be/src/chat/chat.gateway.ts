import { Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload } from "@nestjs/microservices";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Client, Server, Socket } from "socket.io";

@WebSocketGateway({ namespace: '/chat' })

export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  
  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized!')
  }

  @SubscribeMessage('msgToServer')
  message(@MessageBody() data: {sender: string, room: string, message: string}): void {
    const event = 'msgToClient';
    this.wss.to(data.room).emit(event, data)
    // return {event, data};
  }

  @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  handleConnection(client: Client, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
  }
  
  handleDisconnect(client: Client) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

}
