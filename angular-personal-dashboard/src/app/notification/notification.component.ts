import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationData } from '../shared/notification.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationsAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(70px) scale(0.8)',
        }),
        animate('250ms 150ms ease-out'),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({
            opacity: 0,
            transform: 'translateX(70px) scale(0.8)',
          })
        ),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  notification: NotificationData[];

  notificationTimeOut: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification: NotificationData) => {
      this.notification = Array(notification);

      clearTimeout(this.notificationTimeOut);

      this.notificationTimeOut = setTimeout(() => {
        this.notification = []
      }, notification.duration);
    });
  }
}
