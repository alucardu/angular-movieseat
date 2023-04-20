import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appIsTouching]'
})
export class IsTouchingDirective {
  @Output() public appIsTouching = new EventEmitter();

  public touching = false

  @HostListener('touchstart', ['$event']) public handleTouchStart(): void {
    this.touching = true;
    const startTouch = new Date;

    const touchInterval = setInterval(() => {
      const currentTime = new Date
      const timeDifference = currentTime.getTime() - startTouch.getTime()

      if (!this.touching) {
        clearInterval(touchInterval)
      }

      if (timeDifference > 500) {
        clearInterval(touchInterval)
        this.appIsTouching.emit();
      }
    }, 25);
  }

  @HostListener('touchend', ['$event']) public handleTouchEnd(): void {
    this.touching = false;
  }
}
