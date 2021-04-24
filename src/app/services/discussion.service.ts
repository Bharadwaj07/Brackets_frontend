import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private socket:Socket = io(environment.url,{transports:['websocket']});

  token = localStorage.getItem('authToken');
  constructor(private http :HttpClient) { }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessageReceived():any {
    const observable = new Observable<any>(observer => {
      this.socket.on('message_broadcast', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getRoomMessages(roomId):Observable<any>{
    return this.http.get(`${environment.url}discuss/${roomId}`,{
      headers:{
        Authorization:`Bearer ${this.token}`
      }
    })
  }
  
}
