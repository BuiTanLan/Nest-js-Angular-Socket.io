import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { SocketChat } from './../webSockets/socket.chat';
import { SocketAlert } from './../webSockets/socket.alert';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule
  ],
  providers: [SocketAlert, SocketChat],
  bootstrap: [AppComponent]
})
export class AppModule { }
