import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {
    notificationService.notification$.subscribe(n => this.notifications.push(n))
  }

  ngOnInit(): void {
  }

}
