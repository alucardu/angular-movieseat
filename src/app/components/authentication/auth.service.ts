import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router)

  private userLoggedInStatusSubject$ = new BehaviorSubject<boolean>(false);
  public userLoggedInStatus$ = this.userLoggedInStatusSubject$.asObservable();

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
