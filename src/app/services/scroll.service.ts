import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription, delay, filter, first, map, switchMap } from 'rxjs';

interface IScrollTop {
  id: number
  scrollPosition: number
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  public activeRoutesSubject$ = new BehaviorSubject<Array<IScrollTop>>([]);
  public activeRoutes$ = this.activeRoutesSubject$.asObservable();
  private routeSubscription$ = new Subscription;

  public constructor(
    private router: Router) {}

    public scrollPositionHistory(mainContent: ElementRef<HTMLElement>): void {
      this.routeSubscription$ = this.router.events.pipe(
        filter((event): event is NavigationStart => event instanceof NavigationStart),
        switchMap((navigationStart) => {
          return this.activeRoutes$.pipe(
            // wait for animation containers to spawn
            delay(0),
            first(),
            map((activeRoutes) => {
              const scrollPosition = activeRoutes.find((route) => route.id === navigationStart.restoredState?.navigationId)?.scrollPosition || 0;
              const updatedRoutes = this.getUpdatedRoutes(activeRoutes, navigationStart, mainContent);

              return { scrollPosition, updatedRoutes };
            })
          );
        })
      ).subscribe(({ scrollPosition, updatedRoutes }) => {
        this.activeRoutesSubject$.next(updatedRoutes);
        mainContent.nativeElement.children[2]?.scrollTo({ top: scrollPosition });
      });
    }

    private getUpdatedRoutes(activeRoutes: Array<IScrollTop>, navigationStart: NavigationStart, mainContent: ElementRef<HTMLElement>): Array<IScrollTop> {
      if (navigationStart.navigationTrigger === 'popstate') {
        return activeRoutes.filter((route) => route.id !== navigationStart.restoredState?.navigationId)
      } else {
        const newRoute = { id: navigationStart.id - 1, scrollPosition: mainContent.nativeElement.children[1]?.scrollTop }
        return [...activeRoutes, newRoute]
      };
    }

    public ngOnDestroy(): void {
      this.routeSubscription$.unsubscribe();
    }
}
