import { ElementRef, Injectable, OnDestroy, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription, debounceTime, delay, filter, first, fromEvent, map, switchMap } from 'rxjs';

interface IScrollTop {
  id: number
  scrollPosition: number
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  private router = inject(Router)

  public activeRoutesSubject$ = new BehaviorSubject<Array<IScrollTop>>([]);
  public activeRoutes$ = this.activeRoutesSubject$.asObservable();

  public scrollPosition = 1;

  private routeSubscription$ = new Subscription;

  public detectScrollElement(mainContent: ElementRef<HTMLElement>): void {
    this.scrollPositionHistory(mainContent);

    this.router.events.pipe(
      filter((routingEvent): routingEvent is NavigationEnd => routingEvent instanceof NavigationEnd),
    ).subscribe({
      next: () => {
        this.detectScrollPosition(mainContent)
      }
    })
  }

  private detectScrollPosition(mainContent: ElementRef<HTMLElement>): void {
    const scrollElement = mainContent.nativeElement.children[2] ? mainContent.nativeElement.children[2] : mainContent.nativeElement.children[1];

    setTimeout(() => {
      this.scrollPosition = mainContent.nativeElement.children[2]?.scrollTop
    }, 96)

    fromEvent(scrollElement, 'scroll').pipe(
      debounceTime(16)
    ).subscribe({
      next: () => {
        this.scrollPosition = mainContent.nativeElement.children[1]?.scrollTop}
    })
  }

  public scrollPositionHistory(mainContent: ElementRef<HTMLElement>): void {
    this.routeSubscription$ = this.router.events.pipe(
      filter((event): event is NavigationStart => event instanceof NavigationStart),
      switchMap((navigationStart) => {
        return this.activeRoutes$.pipe(
          // wait for animation containers to initialize
          delay(0),
          first(),
          map((activeRoutes) => {
            const scrollPosition = activeRoutes.find((route) => route.id === navigationStart.restoredState?.navigationId)?.scrollPosition || 0;
            const updatedRoutes = this.getUpdatedRoutes(activeRoutes, navigationStart);

            return { scrollPosition, updatedRoutes };
          })
        );
      })
    ).subscribe({
      next: ({scrollPosition, updatedRoutes}) => {
        this.activeRoutesSubject$.next(updatedRoutes);
        mainContent.nativeElement.children[2]?.scrollTo({ top: scrollPosition });
      }
    });
  }

  private getUpdatedRoutes(activeRoutes: Array<IScrollTop>, navigationStart: NavigationStart): Array<IScrollTop> {
    if (navigationStart.navigationTrigger === 'popstate') {
      return activeRoutes.filter((route) => route.id !== navigationStart.restoredState?.navigationId)
    } else {
      const newRoute = { id: navigationStart.id - 1, scrollPosition: this.scrollPosition }
      this.scrollPosition = 0;
      return [...activeRoutes, newRoute]
    };
  }

  public ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
  }
}
