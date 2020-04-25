import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as humps from 'humps';
import { Message } from './models/message';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { Notification } from './models/notification';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private httpOptions = { headers: this.httpHeaders };
  private serverUrl = 'http://0.0.0.0:5876'

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  produce(message: Message): Observable<Message> {
    console.log(message);
    return this.http.post<Message>(`${this.serverUrl}/record`,
      humps.decamelizeKeys(message as Object),
      this.httpOptions).pipe(
        map(res => humps.camelizeKeys(res)),
        map(res => Message.fromObject(res['response'])),
        tap((message: Message) => this.notificationService.notify(new Notification(new Date, 'INFO', `successfully published 1 message to topic ${message.topic}`)))
      )
  }
}
