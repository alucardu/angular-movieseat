import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo, MutationResult } from 'apollo-angular';
import { BehaviorSubject, Observable, first, map } from 'rxjs';
import { LOGIN_USER, LOGOUT_USER } from 'src/operations/userOperations/mutations';
import { AUTHENTICATE_BY_COOKIE } from 'src/operations/userOperations/queries';
import { AuthenticateByCookie, LoginUser, LogoutUser } from 'src/types/userTypes';
import { CapacitorCookies } from '@capacitor/core';
import { IUser } from './sign-up/sign-up.service';
import { NotificationService } from '../notifications/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apollo = inject(Apollo)
  private notificationService = inject(NotificationService)

  private currentUserSubject$ = new BehaviorSubject<IUser | null>(null);
  public currentUser$ = this.currentUserSubject$.asObservable();

  private userLoggedInStatusSubject$ = new BehaviorSubject<boolean>(false);
  public userLoggedInStatus$ = this.userLoggedInStatusSubject$.asObservable();

  public authenticateByCookie(): Observable<MutationResult<AuthenticateByCookie>> {
    return this.apollo.query<AuthenticateByCookie>({
      query: AUTHENTICATE_BY_COOKIE,
      fetchPolicy: 'no-cache'
    })
  }

  public authenticateByLogin(authForm: FormGroup): Observable<MutationResult<LoginUser>> {
    const formData = authForm.value
    return this.apollo.mutate<LoginUser>({
      mutation: LOGIN_USER,
      variables: {
        username: formData.username,
        password: formData.password
      }
    })
  }

  public loginUser(user: IUser): void {
    this.currentUserSubject$.next(user)
    this.userLoggedInStatusSubject$.next(true);
    this.notificationService.getAllNotifications();

    CapacitorCookies.setCookie({
      url: 'https://moviese.at',
      key: '',
      value: '',
    });
  }

  public logoutUser(): Observable<MutationResult<LogoutUser>> {
    this.userLoggedInStatusSubject$.next(false);
    this.currentUserSubject$.next(null)

    CapacitorCookies.deleteCookie({
      url: 'https://moviese.at',
      key: 'authToken',
    });

    return this.apollo.mutate<LogoutUser>({
      mutation: LOGOUT_USER,
      fetchPolicy: 'no-cache'
    })
  }

  public updateCurrentUser(user: IUser): void {
    this.currentUserSubject$.next(user)
  }

  public getCurrentUser(): IUser {
    let currentUser!: IUser

    this.currentUserSubject$.pipe(first()).subscribe({
      next: (user) => {
        if(user) currentUser = user
      }
    })

    return currentUser;
  }

  public checkLoginState(): Observable<void | boolean> {
    return this.userLoggedInStatus$.pipe(
      map((loggedInState) => {
        if (loggedInState) {
          return true;
        } else {
          throw new Error('Not logged in');
        }
      })
    );
  }
}
