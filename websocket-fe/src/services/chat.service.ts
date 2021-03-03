import { SocketChat } from '../webSockets/socket.chat';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

type Data = {
  sender: string;
  room: string;
  message: string;
};

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  constructor(private socket: SocketChat) { }

  public sendMessage(data: Data): void {
    this.socket.emit('msgToServer', data);
  }

  public getMessages = () => {
    return this.socket.fromEvent<Data>('msgToClient');
  }

  getLan(): Observable<any> {
    return this.socket.fromEvent<any>('lan');
  }

  public joinRoom = (room: string): void => {
    this.socket.emit('joinRoom', room);
  }

  public leaveRoom = (room: string): void => {
    this.socket.emit('leaveRoom', room);
  }

  public joinedRoom = () => {
    return this.socket.fromEvent('joinedRoom');
  }

  public leftRoom = () => {
    return this.socket.fromEvent('leftRoom');
  }

  public onConnect = () => {
    return this.socket.fromEvent('connect')
      .pipe(
        tap()
      );
  }
}
