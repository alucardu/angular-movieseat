import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification, notifications } from 'src/app/mock/notifications.json';
import { IMovie } from 'src/app/mock/watchlist.json';
import { IUser } from '../authentication/sign-up/sign-up.service';
import { Apollo } from 'apollo-angular';
import { CreateNotification, GetAllNotifications } from 'src/types/notifications';
import { CREATE_NOTIFICATION, GET_ALL_NOTIFICATIONS } from 'src/operations/notificationOperations/mutations';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apollo = inject(Apollo)

  private notificationAmountSubject$ = new BehaviorSubject<number>(3)
  public notificationAmount$ = this.notificationAmountSubject$.asObservable()

  private notificationsSubject$ = new BehaviorSubject<INotification[]>(notifications)
  public notifications$ = this.notificationsSubject$.asObservable();

  private notificationOpenedIndexSubject$ = new BehaviorSubject<number>(-1)
  public notificationOpenedIndex$ = this.notificationOpenedIndexSubject$.asObservable();

  public getAllNotifications(): void {
    this.apollo.query<GetAllNotifications>({
      query: GET_ALL_NOTIFICATIONS,
      fetchPolicy: 'no-cache'
    }).subscribe({
      next: ({data}) => this.notificationsSubject$.next(data.getAllNotifications.data),
      error: (data) => console.log(data)
    })
  }

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

  public createNotification(type: string, code: string, data: IMovie, performer: IUser): void {
    const notification: INotification = {
      read: false, code: '', type: '',
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
    }).subscribe({
      next: (data) => console.log(data),
      error: (data) => console.log(data),
    })


    // send notification to server
  }
}
