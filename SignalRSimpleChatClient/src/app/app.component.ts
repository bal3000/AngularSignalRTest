import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  connectedToServer = false;
  showChatRoom = false;
  name = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.startConnection()
      .then(() => {
        console.log('Connection started!');
        this.connectedToServer = true;
      });
  }

  onLogIn(userName: string) {
    this.name = userName;
    this.showChatRoom = true;
  }

  onLogOut() {
    this.name = '';
    this.showChatRoom = false;
  }
}
