import { Injectable } from '@angular/core';
import { PersistedSchema, Schema } from './models/schema';
import { Subject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as humps from 'humps';

import { NotificationService } from './notification.service';
import { Notification } from './models/notification';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private httpOptions = { headers: this.httpHeaders };
  private serverUrl = 'http://0.0.0.0:5876'

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getAllSchemas(): Observable<PersistedSchema[]> {
    return this.http.get<PersistedSchema[]>(`${this.serverUrl}/schema`, this.httpOptions).pipe(
      map(res => humps.camelizeKeys(res)),
      map(res => res['response'].map(json => PersistedSchema.fromObject(json)))
    )
  }

  addSchema(schema: Schema): Observable<PersistedSchema> {
    return this.http.post<PersistedSchema>(`${this.serverUrl}/schema`, humps.decamelizeKeys(schema as Object), this.httpOptions).pipe(
      map(res => humps.camelizeKeys(res)),
      map(res => PersistedSchema.fromObject(res['response'])),
      tap((persistedSchema: PersistedSchema) => this.notificationService.notify(new Notification(new Date, 'INFO', `successfully added schema to subject ${persistedSchema.subject}`))),
    );
  }
}
