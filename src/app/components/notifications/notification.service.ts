import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from 'src/app/mock/notifications.json';
import { IMovie } from 'src/app/mock/watchlist.json';
import { IUser } from '../authentication/sign-up/sign-up.service';
import { Apollo } from 'apollo-angular';
import { CreateNotification, GetAllNotifications, markAllNotificationsAsRead, MarkNotificationAsRead } from 'src/types/notifications';
import { CREATE_NOTIFICATION, GET_ALL_NOTIFICATIONS, MARK_ALL_NOTIFICATION_AS_READ, MARK_NOTIFICATION_AS_READ } from 'src/operations/notificationOperations/mutations';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apollo = inject(Apollo)

  private notificationAmountSubject$ = new BehaviorSubject<number>(0)
  public notificationAmount$ = this.notificationAmountSubject$.asObservable()

  private notificationsSubject$ = new BehaviorSubject<INotification[] | null>(null)
  public notifications$ = this.notificationsSubject$.asObservable();

  private notificationOpenedIndexSubject$ = new BehaviorSubject<number>(-1)
  public notificationOpenedIndex$ = this.notificationOpenedIndexSubject$.asObservable();

  public getAllNotifications(): void {
    this.apollo.query<GetAllNotifications>({
      query: GET_ALL_NOTIFICATIONS,
      fetchPolicy: 'no-cache'
    }).subscribe({
      next: ({data}) => {
        this.notificationsSubject$.next(data.getAllNotifications.data)
        this.notificationAmountSubject$.next(data.getAllNotifications.data.filter((notification) => !notification.read).length)
      },
      error: (data) => console.log(data)
    })
  }

  public markNotificationAsRead(index: number, notification: INotification): void {
    const notifications = this.notificationsSubject$.value!.slice();
    const updatedNotification = notifications.find((_notification, i) => index === i)

    if (updatedNotification && !updatedNotification.read) {
      updatedNotification.read = true
      this.notificationAmountSubject$.next(this.notificationAmountSubject$.value - 1)
      this.notificationsSubject$.next(notifications)
    }

    this.apollo.mutate<MarkNotificationAsRead>({
      mutation: MARK_NOTIFICATION_AS_READ,
      variables: {
        notification: notification
      }
    }).subscribe()
  }

  public markNotificationsAsRead(): void {
    this.apollo.mutate<markAllNotificationsAsRead>({
      mutation: MARK_ALL_NOTIFICATION_AS_READ
    }).subscribe({
      next: ({data}) => {
        if (!data) return
        this.notificationsSubject$.next(data.markAllNotificationsAsRead.data)
        this.notificationAmountSubject$.next(0)
      }
    })
  }

  public setOpenedNotificationIndex(index: number): void {
    this.notificationOpenedIndexSubject$.value === index ? this.notificationOpenedIndexSubject$.next(-1) : this.notificationOpenedIndexSubject$.next(index)
  }

  public createNotification(type: string, code: string, data: IMovie, performer: IUser): void {
    const notification: INotification = {
      id: 1, read: false, code: '', type: '', createdAt: new Date,
      performer: { id: '', username: '', email: '', movies: [], friends: [], friendOf: [] }
    }

    switch (type) {
      case 'movie':

        switch (code) {
          case 'N_01':
            notification.code = code
            notification.type = type
            notification.performer = performer
            notification.movie = data

            break;

          default:
            break;
        }
        break;

      default:
        break;
    }

    this.apollo.mutate<CreateNotification>({
      mutation: CREATE_NOTIFICATION,
      variables: {
        notification: notification
      }
    }).subscribe()
  }
}
