import { Injectable } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

interface IScrollTop {
  id: number
  position: number
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  public routeEvents: Array<IScrollTop> = []

  public constructor(private router: Router) {}

    public scrollToHistory(mainContent: MatSidenavContent, deviceIsMobile: boolean): void {
      this.router.events.pipe(
        filter(
          (event): event is NavigationStart | NavigationEnd => event instanceof NavigationStart || event instanceof NavigationEnd,
        ),
      ).subscribe({
        next: (data) => {
          if (data instanceof NavigationStart) {
            this.routeEvents.push({id: data.id, position: mainContent.measureScrollOffset('top')})

            const previousRoute = this.routeEvents.find((route) => data.restoredState !== undefined && data.restoredState !== null && route.id === data.restoredState.navigationId + 1)

            setTimeout(() => {
              mainContent.scrollTo({
                top: previousRoute ? previousRoute.position : 0
              })
              // setTimeout is required for mobile animation
            }, deviceIsMobile ? 25 : 0)
          }
        }
      });
    }
}
