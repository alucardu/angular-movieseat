import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChildrenOutletContexts, OutletContext, RouterModule, } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';
import { ScrollService } from 'src/app/services/scroll.service';
import { slideInAnimation } from 'src/app/animations';
import { DeviceService } from 'src/app/services/device.service';
import { Observable, map } from 'rxjs';
import { NavigateBackComponent } from '../navigate-back/navigate-back.component';
import { MaterialModule } from 'src/app/material.module';
import { DrawerMenuComponent } from '../drawer-menu/drawer-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [slideInAnimation],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, DrawerMenuComponent, NavigateBackComponent]
})
export class DrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContent', { static: false }) private mainContent!: ElementRef<HTMLElement>
  public exitConfirmation = false;

  private deviceIsMobile$: Observable<boolean>;

  public constructor(
    private contexts: ChildrenOutletContexts,
    private scrollService: ScrollService,
    private deviceService: DeviceService,
  ) {
    this.deviceIsMobile$ = this.deviceService.deviceIsMobile$;
  }

  public ngOnInit(): void {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (window.screen.orientation.type === 'landscape-primary') return;

      if (canGoBack) {
        window.history.back();
      } else {
        this.exitConfirmation = true;
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
    }
  }

  public getRouteAnimationData(): Observable<OutletContext | null> {
    return this.deviceIsMobile$.pipe(
      map(deviceIsMobile => {
        return deviceIsMobile ? this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'] : null
      })
    );
  }
}
