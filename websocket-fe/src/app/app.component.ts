import { ChangeDetectorRef, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import {ChatService } from '../services/chat.service';
import { AlertService } from './../services/alert.service';

type Data = {
  sender: string;
  room: string;
  message: string;
};

type AlertData = {
  type: string;
  message: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy, DoCheck {
  title = 'websocket-fe';
  newMessage: string;
  sender: string;
  activeRoom = 'general';
  messageList = {
    general: [],
    typescript: [],
    nestJs: []
  };
  rooms = {
    general: false,
    typescript: false,
    nestJs: false
  };
  alertList: AlertData[] = [];
  isMemberOfActiveRoom = false;

  constructor(
    private chatService: ChatService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef
    ) {
    this.sender = prompt('Please enter your name');
  }

  sendMessage(): void {
    if (this.isMemberOfActiveRoom) {
      this.chatService.sendMessage({sender: this.sender, room: this.activeRoom, message: this.newMessage});
      console.log({sender: this.sender, room: this.activeRoom, message: this.newMessage}, 'sending');
      this.newMessage = '';
    } else {
      alert('You must be member of the active room to send messages!');
    }
  }

  onSelectRoom = (room: string) => {
    this.activeRoom = room;
  }

  toggleRoomMemebership(): void {
    if (this.isMemberOfActiveRoom) {
      this.chatService.leaveRoom(this.activeRoom);
    } else {
      this.chatService.joinRoom(this.activeRoom);
    }
  }

  playAudio(): void{
    const audio = new Audio();
    audio.src = '../assets/audio/alarm.mp3';
    audio.load();
    audio.play();
  }

  ngOnInit(): void {
    this.chatService.onConnect()
    .subscribe(() => {
      this.toggleRoomMemebership();
    });

    this.chatService.getMessages()
      .subscribe((data: Data) => {
        this.messageList[data.room].push(data);
        this.playAudio();
    });

    this.alertService.getAlerts()
      .subscribe((data: AlertData) => {
        this.alertList.push(data);
    });

    this.chatService.joinedRoom()
      .subscribe((room: string) => {
        this.rooms[room] = true;
        this.isMemberOfActiveRoom = true;
        this.cdr.markForCheck();
    });

    this.chatService.leftRoom()
      .subscribe((room: string) => {
        this.rooms[room] = false;
        this.isMemberOfActiveRoom = false;
    });
    this.chatService.getLan()
    .subscribe((data: any) => {
      console.log(data);
    });
  }

  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }
}
