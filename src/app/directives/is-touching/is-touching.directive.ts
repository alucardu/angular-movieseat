 import { Directive, ElementRef, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, delay, filter, interval, switchMap, takeWhile } from 'rxjs';

@Directive({
  selector: '[appIsTouching]',
  standalone: true
})
export class IsTouchingDirective {
  private isTouchingSubject$ = new Subject<boolean>;
  public isTouching$ = this.isTouchingSubject$.asObservable();

  private touching = false;
  private touchStartSubject$ = new Subject<TouchEvent>();

  public constructor(
    private el: ElementRef<HTMLElement>,
    private router: Router) {
    this.el.nativeElement.addEventListener('touchstart', this.handleTouchStart, {passive: true})
    this.el.nativeElement.addEventListener('touchmove', this.handleTouchMove, {passive: true})
    this.router.events.pipe(
      filter((routingEvent): routingEvent is NavigationEnd => routingEvent instanceof NavigationEnd),
    ).subscribe({
      next: () => this.detectRoutingEvent()
    })
  }

  @HostListener('touchend', ['$event']) public handleTouchEnd(): void {
    this.touching = false
  }

  private detectRoutingEvent(): void {
    this.isTouchingSubject$.next(false)
    this.touching = false
  }

  private handleTouchMove = ():void => {
    this.touching = false;
    this.isTouchingSubject$.next(false)
  }

  private handleTouchStart = (event: TouchEvent): void => {
    this.startTouching();
    this.touchStartSubject$.next(event)
  }

  private startTouching(): void {
    this.touching = true

    this.touchStartSubject$.pipe(
      switchMap(() => interval(25).pipe(delay(300))),
      takeWhile(() => this.touching),
    ).subscribe({
      next: () => {
        this.isTouchingSubject$.next(true)
        this.touching = false
      }
    })
  }
}
