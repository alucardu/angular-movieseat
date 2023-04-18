import { Injectable } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, NavigationSkipped, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { DeviceService } from './device.service';

interface IScrollTop {
  id: number
  position: number
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  public activeRoutesSubject$ = new BehaviorSubject<Array<IScrollTop>>([]);

  public constructor(
    private deviceService: DeviceService,
    private router: Router) {}

    public scrollToHistory(mainContent: MatSidenavContent): void {
      this.router.events.pipe(
        filter(
          (event): event is NavigationStart | NavigationEnd => event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationSkipped,
        ),
      ).subscribe({
        next: (data) => {
          if (data instanceof NavigationStart && data.id !== 1) {
            const previousRoute = this.activeRoutesSubject$.getValue().find((route) => route.id === data.restoredState?.navigationId)

            if (previousRoute) {
              const activeRoutes = [...this.activeRoutesSubject$.getValue()]
              activeRoutes.pop()
              this.activeRoutesSubject$.next(activeRoutes)
            } else {
              this.activeRoutesSubject$.next([...this.activeRoutesSubject$.getValue(), {id: data.id - 1, position: mainContent.measureScrollOffset('top')}])
            }

            setTimeout(() => {
              mainContent.scrollTo({
                top: previousRoute ? previousRoute.position : 0
              })
              // setTimeout is required for mobile animation
            }, this.deviceService.deviceIsMobile$ ? 25 : 0)
          }
        }
      });
    }
}
