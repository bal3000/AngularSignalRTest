import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  hubConnection: HubConnection;

  constructor() { }

  startConnection(): Promise<void> {
    this.hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5000/chat').build();

    return this.hubConnection.start()
      .catch((error) => console.log('Error while establishing connection :('));
  }
}
