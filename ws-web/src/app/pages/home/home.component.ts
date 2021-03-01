import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  messages: string[] = [];
  name: string = '';

  constructor(
    private socketService: SocketService,
  ) {}

  ngOnInit(): void {
  }

  connect(): void {
    this.socketService.connect(this.messages);
  }

  desconect(): void {
    this.socketService.desconect();
  }

  sendName(): void {
    this.socketService.sendName(this.name);
    this.name = '';
  }

  isSocketConnected(): boolean {
    return this.socketService.isConnected();
  }

}
