import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as humps from 'humps';
import { Record } from './models/record';
import { Observable, of } from 'rxjs';
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

  produce(message: Record): Observable<Record> {
    console.log(message);
    return this.http.post<Record>(`${this.serverUrl}/record`,
      humps.decamelizeKeys(message as Object),
      this.httpOptions).pipe(
        map(res => humps.camelizeKeys(res)),
        map(res => Record.fromObject(res['response'])),
        tap((message: Record) => this.notificationService.notify(new Notification(new Date, 'INFO', `successfully published 1 message to topic ${message.topic}`))),
        catchError(err => {
          this.notificationService.notify(new Notification(new Date, 'ERROR', `failed publishing message to topic ${message.topic}`));
          throw err;
        })
      )
  }
}
