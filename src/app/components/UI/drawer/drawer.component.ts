import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { ChildrenOutletContexts, OutletContext, RouterModule, } from '@angular/router';
import { App as CapacitorApp } from '@capacitor/app';
import { ScrollService } from 'src/app/services/scroll.service';
import { fadeAnimation, routeAnimations } from 'src/app/animations';
import { DeviceService } from 'src/app/services/device.service';
import { Observable, map } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { DrawerSidenavComponent } from '../drawer-sidenav/drawer-sidenav.component';
import { CommonModule } from '@angular/common';
import { DrawerBottomMenuComponent } from '../drawer-bottom-menu/drawer-bottom-menu.component';
import { IsTouchingDirective } from 'src/app/directives/is-touching/is-touching.directive';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [routeAnimations, fadeAnimation],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  hostDirectives: [IsTouchingDirective],
  imports: [MaterialModule, CommonModule, RouterModule, DrawerSidenavComponent, DrawerBottomMenuComponent]
})
export class DrawerComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContent', { static: false }) private mainContent!: ElementRef<HTMLElement>
  private deviceIsMobile$: Observable<boolean>;

  public exitConfirmation = false;
  public displayMenu = false;
  public scrollingUp$ = this.scrollService.scrollingUp$

  public constructor(
    private contexts: ChildrenOutletContexts,
    private scrollService: ScrollService,
    private deviceService: DeviceService,
    private touchingDirective: IsTouchingDirective = inject(IsTouchingDirective, {self: true})
  ) {
    this.deviceIsMobile$ = this.deviceService.deviceIsMobile$;
    this.touchingDirective.isTouching$.subscribe({
      next: (data) => this.toggleMenu(data)
    })
  }

  public ngOnInit(): void {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      // if (window.screen.orientation.type === 'landscape-primary') return;

      if (canGoBack) {
        window.history.back();
      } else {
        this.exitConfirmation = true;
      };
    });
  }

  public ngAfterViewInit(): void {
    this.scrollService.detectScrollElement(this.mainContent)
    this.scrollService.getScrollingDirection(this.mainContent)
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

  private toggleMenu(isTouching: boolean): void {
    this.displayMenu = (!this.displayMenu && isTouching) ? true : false;
  }
}
