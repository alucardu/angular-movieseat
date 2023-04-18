import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChildrenOutletContexts, OutletContext, } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';
import { MatSidenavContent } from '@angular/material/sidenav';
import { ScrollService } from 'src/app/services/scroll.service';
import { slideInAnimation } from 'src/app/animations';
import { Location } from '@angular/common';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [slideInAnimation],
})
export class DrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContent', { static: false }) private mainContent!: MatSidenavContent

  public constructor(
    private contexts: ChildrenOutletContexts,
    private scrollService: ScrollService,
    private deviceService: DeviceService,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (window.screen.orientation.type === 'landscape-primary') return;
      canGoBack ? window.history.back() : CapacitorApp.exitApp();
    });
  }

  public ngAfterViewInit(): void {
    this.scrollService.scrollToHistory(this.mainContent);
  }

  public getRouteAnimationData(): OutletContext | null {
    return this.deviceService.deviceIsMobile$ ? this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'] : null;
  }

  public isRouteActive(route: string): boolean {
    return this.location.path() === route
  }
}
