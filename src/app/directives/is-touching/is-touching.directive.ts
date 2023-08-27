import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { Subject, delay, interval, switchMap, takeWhile } from 'rxjs';

@Directive({
  selector: '[appIsTouching]',
  standalone: true
})
export class IsTouchingDirective implements OnInit {
  private el = inject(ElementRef<HTMLElement>)

  private isTouchingSubject$ = new Subject<boolean>;
  public isTouching$ = this.isTouchingSubject$.asObservable();

  private touchStartSubject$ = new Subject<TouchEvent>();

  private touching = false;
  private touched  = false;

  public ngOnInit(): void {
    this.el.nativeElement.addEventListener('touchstart', this.handleTouchStart, {passive: true});
    this.el.nativeElement.addEventListener('touchmove', this.handleTouchMove, {passive: true});
    this.el.nativeElement.addEventListener('touchend', this.handleTouchEnd, {passive: true});
    this.el.nativeElement.addEventListener('touchcancel', () => this.handleTouchCancel(), { passive: true });
  }

  private handleTouchStart = (event: TouchEvent): void => {
    this.startTouching();
    this.touchStartSubject$.next(event)
  }

  private handleTouchMove = ():void => {
    this.touching = false;
    this.isTouchingSubject$.next(false)
  }

  private startTouching(): void {
    this.touching = true

    if (this.touched) {
      this.isTouchingSubject$.next(false)
      this.touching = false
      this.touched = false
    }

    this.touchStartSubject$.pipe(
      switchMap(() => interval(25).pipe(delay(600))),
      takeWhile(() => this.touching),
    ).subscribe({
      next: () => {
        this.isTouchingSubject$.next(true)
        this.touching = false
        this.touched = true;
      }
    })
  }

  private handleTouchEnd(): void {
    this.touching = false;
  }

  private handleTouchCancel(): void {
    this.touching = false;
    this.isTouchingSubject$.next(false)
  }
}
