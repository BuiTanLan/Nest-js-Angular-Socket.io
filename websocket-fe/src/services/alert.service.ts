import { Injectable } from '@angular/core';
import { SocketAlert } from './../webSockets/socket.alert';

type AlertData = {
  type: string;
  message: string;
};


@Injectable({
  providedIn: 'root'
})

export class AlertService {
  constructor(private socket: SocketAlert) { }

  public sendMessage(data: AlertData): void {
    this.socket.emit('sendAlertToClient', data);
  }

  public getAlerts = () => {
    return this.socket.fromEvent<AlertData>('sendAlertToClient');
  }
}
