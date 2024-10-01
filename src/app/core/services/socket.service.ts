import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: Socket;

  constructor() {}

  connect(): void {
    const user = SessionService.getUser()
    const userId = user.authId
    this.socket = io(`${environment.web_socket_url}/notifications`, {
      query: { userId },
    });

    this.socket.on('connect', () => {
      console.log('Conectado al WebSocket con ID:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del WebSocket');
    });
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }


  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
