import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: [fadeAnimation],
  encapsulation: ViewEncapsulation.None
})
export class SpeedDialFabComponent  {
  @HostListener('window:touchstart', ['$event', '$event.target']) public handleClick = (_event: Event, targetElement: HTMLElement):void => {
    if (!this.el.nativeElement.contains(targetElement) && this.fabTogglerState) {
      this.hideItems();
      this.cd.detectChanges();
    }
  }

  public fabTogglerState = false;

  public constructor(private el: ElementRef<HTMLElement>, private cd: ChangeDetectorRef) {}

    public showItems(): void {
    this.fabTogglerState = true
  }

  public hideItems(): void {
    this.fabTogglerState = false
  }

  public onToggleFab(): void {
    this.fabTogglerState ? this.hideItems() : this.showItems();
  }
}
