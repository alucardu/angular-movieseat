import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Subject, delay, interval, switchMap, takeWhile } from 'rxjs';

@Directive({
  selector: '[appIsTouching]',
  standalone: true
})
export class IsTouchingDirective {
  @Output() public appIsTouching = new EventEmitter();

  private touching = false;
  private touchStartSubject$ = new Subject<TouchEvent>();

  @HostListener('touchstart', ['$event']) public handleTouchStart(event: TouchEvent): void {
    this.startTouching();
    this.touchStartSubject$.next(event)
  }
  @HostListener('touchend', ['$event']) public handleTouchEnd(): void {
    this.touching = false
  }

  public startTouching(): void {
    this.touching = true

    this.touchStartSubject$.pipe(
      switchMap(() => interval(25).pipe(delay(600))),
      takeWhile(() => this.touching),
    ).subscribe({
      next: () => {
        this.appIsTouching.emit();
        this.touching = false
      }
    })
  }
}
