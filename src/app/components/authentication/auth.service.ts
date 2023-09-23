import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Apollo, MutationResult } from 'apollo-angular';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { AUTHENTICATE_BY_COOKIE, LOGIN_USER } from 'src/operations/userOperations/mutations';
import { AuthenticateByCookie, LoginUser } from 'src/types/userTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apollo = inject(Apollo)

  private userLoggedInStatusSubject$ = new BehaviorSubject<boolean>(false);
  public userLoggedInStatus$ = this.userLoggedInStatusSubject$.asObservable();

  public authenticateByCookie(authToken: string): Observable<MutationResult<AuthenticateByCookie>> {
    return this.apollo.mutate<AuthenticateByCookie>({
      mutation: AUTHENTICATE_BY_COOKIE,
      variables: {
        token: authToken
      }
    })
  }

  public authenticateByLogin(authForm: FormGroup): Observable<MutationResult<LoginUser>> {
    const formData = authForm.value
    return this.apollo.mutate<LoginUser>({
      mutation: LOGIN_USER,
      variables: {
        email: formData.email,
        password: formData.password
      }
    })
  }

  public loginUser(): void {
    this.userLoggedInStatusSubject$.next(true);
  }

  public logoutUser(): void {
    this.userLoggedInStatusSubject$.next(false);
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
