import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChildrenOutletContexts, OutletContext, } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';
import { ScrollService } from 'src/app/services/scroll.service';
import { slideInAnimation } from 'src/app/animations';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [slideInAnimation],
  encapsulation: ViewEncapsulation.None
})
export class DrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContent', { static: false }) private mainContent!: ElementRef<HTMLElement>
  public exitConfirmation = false;

  public constructor(
    private contexts: ChildrenOutletContexts,
    private scrollService: ScrollService,
    private deviceService: DeviceService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (window.screen.orientation.type === 'landscape-primary') return;

      if (canGoBack) {
        window.history.back()
      } else {
        this.exitConfirmation = true;
        this.changeDetectorRef.detectChanges();
      };
    });

  }

  public ngAfterViewInit(): void {
    this.scrollService.detectScrollElement(this.mainContent)
  }

  public exitApp(state: string): void {
    if (state === 'exit') {
      CapacitorApp.exitApp()
    } else {
      this.exitConfirmation = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  public getRouteAnimationData(): OutletContext | null {
    return this.deviceService.deviceIsMobile$ ? this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'] : null;
  }
}
