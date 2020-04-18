import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Notification } from './models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private notificationsSource = new Subject<Notification>();
  notification$ = this.notificationsSource.asObservable();

  notify(notification: Notification): void {
    console.log(`notification service: ${notification}`)
    this.notificationsSource.next(notification)
  }
}
