import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Subject, delay, interval, switchMap, takeWhile } from 'rxjs';

@Directive({
  selector: '[appIsTouching]',
  standalone: true
})
export class IsTouchingDirective {
  @Output() public appIsTouching = new EventEmitter();

  private touching = false;
  private touchStartSubject$ = new Subject<TouchEvent>();

  public constructor(private el: ElementRef<HTMLElement>) {
    this.el.nativeElement.addEventListener('touchstart', this.handleTouchStart, {passive: true})
    this.el.nativeElement.addEventListener('touchmove', this.handleTouchMove, {passive: true})
  }

  @HostListener('touchend', ['$event']) public handleTouchEnd(): void {
    this.touching = false
  }

  private handleTouchMove = ():void => {
    this.touching = false;
  }

  private handleTouchStart = (event: TouchEvent): void => {
    this.startTouching();
    this.touchStartSubject$.next(event)
  }

  private startTouching(): void {
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
