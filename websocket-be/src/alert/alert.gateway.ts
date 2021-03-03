import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: '/alert' })
export class AlertGateway {
  @WebSocketServer() wss: Server;
  
  @SubscribeMessage('sendAlertToClient')
  sendAlert(@MessageBody() message: string): void {
    const event = 'sendAlertToClient'
    this.wss.emit(event, {type: 'Alert', message})
  }
}
