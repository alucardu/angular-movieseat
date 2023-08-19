import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { notifications } from 'src/app/mock/notifications.json';
import { INotification } from './notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationAmountSubject$ = new BehaviorSubject<number>(3)
  public notificationAmount$ = this.notificationAmountSubject$.asObservable()

  private notificationsSubject$ = new BehaviorSubject<INotification[]>(notifications)
  public notifications$ = this.notificationsSubject$.asObservable();

  private notificationOpenedIndexSubject$ = new BehaviorSubject<number>(-1)
  public notificationOpenedIndex$ = this.notificationOpenedIndexSubject$.asObservable();

  public markNotificationAsRead(index: number): void {
    const notifications = this.notificationsSubject$.value.slice();
    const updatedNotification = notifications.find((_notification, i) => index === i)

    if (updatedNotification && !updatedNotification.read) {
      updatedNotification.read = true
      this.notificationAmountSubject$.next(this.notificationAmountSubject$.value - 1)
      this.notificationsSubject$.next(notifications)
    }
  }

  public markNotificationsAsRead(): void {
    const updatedNotifications = this.notificationsSubject$.value.map((notification) => {
      return {...notification, read: true}
    })

    this.notificationsSubject$.next(updatedNotifications)
    this.notificationAmountSubject$.next(0)
  }

  public setOpenedNotificationIndex(index: number): void {
    this.notificationOpenedIndexSubject$.value === index ? this.notificationOpenedIndexSubject$.next(-1) : this.notificationOpenedIndexSubject$.next(index)
  }
}
