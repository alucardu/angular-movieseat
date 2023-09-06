import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

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

  public checkLogOutRoute(): void {
    this.router.events.pipe(
      filter((routingEvent): routingEvent is NavigationEnd => routingEvent instanceof NavigationEnd),
    ).subscribe({
      next: (data) => {
        if (data.url === '/login' && data.id !== 1) {
          this.checkLoginState().pipe().subscribe({
            next: (data) => {
              console.log(data)
              if (data) {
                this.router.navigate(['/logout']);
              }
            }
          })
        }
      }
    })
  }
}
