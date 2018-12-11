import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { HubConnectionState } from '@aspnet/signalr';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  @Input() userName: string;
  @Output() loggedOut = new EventEmitter();
  message = '';
  messages: Array<string> = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    if (this.chatService.hubConnection.state === HubConnectionState.Connected) {
      this.chatService.hubConnection.on('sendToAll', (name: string, receivedMessage: string) => {
        const text = `${name}: ${receivedMessage}`;
        this.messages.push(text);
      });

      this.chatService.hubConnection.on('statusChange', (name: string, state: string) => {
        const text = `${name} has ${state} the chat room`;
        this.messages.push(text);
      });
      this.chatService.hubConnection
        .invoke('statusChange', this.userName, 'entered')
        .catch((error) => console.error(error));
    }
  }

  ngOnDestroy() {
    if (this.chatService.hubConnection.state === HubConnectionState.Connected) {
      this.chatService.hubConnection
        .invoke('statusChange', this.userName, 'left')
        .catch((error) => console.error(error));
    }
  }

  sendMessage(): void {
    if (this.chatService.hubConnection.state === HubConnectionState.Connected) {
      this.chatService.hubConnection
        .invoke('sendToAll', this.userName, this.message)
        .then(() => this.message = '')
        .catch((error) => console.error(error));
    }
  }

  logOut(): void {
    this.loggedOut.emit();
  }
}
