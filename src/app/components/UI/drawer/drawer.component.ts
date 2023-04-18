import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChildrenOutletContexts, OutletContext } from '@angular/router';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { App as CapacitorApp } from '@capacitor/app';
import { MatSidenavContent } from '@angular/material/sidenav';
import { ScrollService } from 'src/app/services/scroll.service';
import { slideInAnimation } from 'src/app/animations';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [slideInAnimation],
})
export class DrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContent', { static: false }) private mainContent!: MatSidenavContent
  private deviceIsMobile = false;

  public constructor(
    private breakpointObserver: BreakpointObserver,
    private contexts: ChildrenOutletContexts,
    private scrollService: ScrollService,
  ) {}

  public ngOnInit(): void {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (window.screen.orientation.type === 'landscape-primary') return;
      canGoBack ? window.history.back() : CapacitorApp.exitApp();
    });

    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.Small]).subscribe((state: BreakpointState) => {
      this.deviceIsMobile = state.matches;
    });
  }

    public ngAfterViewInit(): void {
      this.scrollService.scrollToHistory(this.mainContent, this.deviceIsMobile);
    }

  public getRouteAnimationData(): OutletContext | null {
    return this.deviceIsMobile ? this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'] : null;
  }
}
