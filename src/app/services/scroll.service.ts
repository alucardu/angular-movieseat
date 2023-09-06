import { isPlatformBrowser } from '@angular/common';
import { ElementRef, Injectable, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription, debounceTime, delay, filter, first, fromEvent, map, pairwise, switchMap, tap } from 'rxjs';

interface IScrollTop {
  id: number
  scrollPosition: number
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  private router = inject(Router)
  private platformId = inject(PLATFORM_ID);

  private scrollPositionSubject$ = new BehaviorSubject<number>(0)
  public scrollPosition$ = this.scrollPositionSubject$.asObservable();

  private activeRoutesSubject$ = new BehaviorSubject<Array<IScrollTop>>([]);
  public activeRoutes$ = this.activeRoutesSubject$.asObservable();

  private scrollingDownSubject$ = new BehaviorSubject<boolean>(false);
  public scrollingDown$ = this.scrollingDownSubject$.asObservable();

  private scrollingUpSubject$ = new BehaviorSubject<boolean>(true);
  public scrollingUp$ = this.scrollingUpSubject$.asObservable();

  private routeSubscription$ = new Subscription;

  public getScrollingDirection(mainContent: ElementRef<HTMLElement>): void {
    let scrollElement!: Element;

    if (isPlatformBrowser(this.platformId)) {
      this.router.events.pipe(
        filter((routingEvent): routingEvent is NavigationEnd => routingEvent instanceof NavigationEnd),
        tap(() => this.scrollingUpSubject$.next(true)),
        switchMap(() => {
          scrollElement = mainContent.nativeElement.children[2] ? mainContent.nativeElement.children[2] : mainContent.nativeElement.children[1];

          return fromEvent(scrollElement, 'scroll').pipe(
            debounceTime(10),
            map(() => ({
              scrollTop: scrollElement.scrollTop,
              scrollHeight: scrollElement.scrollHeight,
              clientHeight: scrollElement.clientHeight
            })),
            pairwise(),
          );
        })
        ).subscribe(([prev, current]) => {
          const scrollDifference = current.scrollTop - prev.scrollTop;

          if (current.scrollTop > prev.scrollTop && scrollDifference > 8) {
          this.scrollingDownSubject$.next(true)
          this.scrollingUpSubject$.next(false)
        } else {
          if (scrollDifference < -8 ) {
            this.scrollingUpSubject$.next(true)
            this.scrollingDownSubject$.next(false)
          }
        }

        const isNearBottom = current.scrollTop + current.clientHeight >= current.scrollHeight - 44;

        if (isNearBottom) {
          this.scrollingUpSubject$.next(true)
          this.scrollingDownSubject$.next(false)
        }
      });
    }
  }

  public detectScrollElement(mainContent: ElementRef<HTMLElement>): void {
    this.scrollPositionHistory(mainContent);

    this.router.events.pipe(
      filter((routingEvent): routingEvent is NavigationEnd => routingEvent instanceof NavigationEnd),
    ).subscribe({
      next: () => {
        if (isPlatformBrowser(this.platformId)) {
          this.detectScrollPosition(mainContent)
        }
      }
    })
  }

  public hideBottomMenu(): void {
    this.scrollingUpSubject$.next(false)
  }

  public showBottomMenu(): void {
    this.scrollingUpSubject$.next(true)
  }

  private detectScrollPosition(mainContent: ElementRef<HTMLElement>): void {
    const scrollElement = mainContent.nativeElement.children[2] ? mainContent.nativeElement.children[2] : mainContent.nativeElement.children[1];

    if (!scrollElement) { return }

    setTimeout(() => {
      this.scrollPositionSubject$.next(mainContent.nativeElement.children[2]?.scrollTop)
    }, 96)

    fromEvent(scrollElement, 'scroll').pipe(
      debounceTime(16)
    ).subscribe({
      next: () => {
        this.scrollPositionSubject$.next(mainContent.nativeElement.children[1]?.scrollTop)
      }
    })
  }

  private scrollPositionHistory(mainContent: ElementRef<HTMLElement>): void {
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
      const newRoute = { id: navigationStart.id - 1, scrollPosition: this.scrollPositionSubject$.value }
      this.scrollPositionSubject$.next(0)
      return [...activeRoutes, newRoute]
    };
  }

  public ngOnDestroy(): void {
    this.routeSubscription$.unsubscribe();
  }
}
