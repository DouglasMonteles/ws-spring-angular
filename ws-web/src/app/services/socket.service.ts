import { Injectable } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private baseURL = 'http://localhost:8080/gs-guide-websocket';
  private topic: string = "/topic/greetings";
  private stompClient: any;

  constructor() { }

  connect(messages: string[]): void {
    let socket = new SockJS(this.baseURL);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: Stomp.Frame) => {
      console.log('Conectado! - ' + frame);
      this.stompClient.subscribe(this.topic, (message: Stomp.Message) => {
        messages.push(JSON.parse(message.body).content);
      });
    });
  }

  desconect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Desconectado!!!');
      });
    }
  }

  sendName(name: string): void {
    this.stompClient.send("/app/hello", {}, JSON.stringify(name));
  }

  isConnected(): boolean {
    return (this.stompClient?.connected);
  }
}
