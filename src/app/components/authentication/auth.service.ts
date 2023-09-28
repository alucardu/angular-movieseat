import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo, MutationResult } from 'apollo-angular';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LOGIN_USER, LOGOUT_USER } from 'src/operations/userOperations/mutations';
import { AUTHENTICATE_BY_COOKIE } from 'src/operations/userOperations/queries';
import { AuthenticateByCookie, LoginUser, LogoutUser } from 'src/types/userTypes';
import { CapacitorCookies } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apollo = inject(Apollo)

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
        username: formData.email,
        password: formData.password
      }
    })
  }

  public loginUser(): void {
    this.userLoggedInStatusSubject$.next(true);

    CapacitorCookies.setCookie({
      url: 'https://moviese.at',
      key: '',
      value: '',
    });
  }

  public logoutUser(): Observable<MutationResult<LogoutUser>> {
    this.userLoggedInStatusSubject$.next(false);

    CapacitorCookies.deleteCookie({
      url: 'https://moviese.at',
      key: 'authToken',
    });

    return this.apollo.mutate<LogoutUser>({
      mutation: LOGOUT_USER,
      fetchPolicy: 'no-cache'
    })
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
