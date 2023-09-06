import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { ChildrenOutletContexts, OutletContext, RouterModule, } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import { ScrollService } from 'src/app/services/scroll.service';
import { fadeAnimation, routeAnimations } from 'src/app/animations';
import { DeviceService } from 'src/app/services/device.service';
import { Observable, map } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { DrawerBottomMenuComponent } from '../bottom-menu/drawer-bottom-menu.component';
import { IsTouchingDirective } from 'src/app/directives/is-touching/is-touching.directive';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Keyboard } from '@capacitor/keyboard';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  animations: [routeAnimations, fadeAnimation],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  hostDirectives: [IsTouchingDirective],
  imports: [MaterialModule, CommonModule, RouterModule, DrawerBottomMenuComponent]
})
export class ContainerComponent implements OnInit, AfterViewInit {
  private dialog = inject(MatDialog)
  private authService = inject(AuthService)

  @ViewChild('mainContent', { static: false }) private mainContent!: ElementRef<HTMLElement>

  private deviceIsMobile$: Observable<boolean>;

  public displayMenu = false;
  public scrollingUp$ = this.scrollService.scrollingUp$
  public userLoggedInStatus$ = this.authService.userLoggedInStatus$

  public constructor(
    private contexts: ChildrenOutletContexts,
    private scrollService: ScrollService,
    private deviceService: DeviceService,
  ) {
    this.deviceIsMobile$ = this.deviceService.deviceIsMobile$;
  }

  public ngOnInit(): void {
    const isKeyboardAvailable = Capacitor.isPluginAvailable('Keyboard');
    // this.authService.checkLogOutRoute();

    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        this.openDialog();
      };
    });

    if (isKeyboardAvailable) {
      Keyboard.addListener('keyboardDidShow', () => {
        this.scrollService.hideBottomMenu();
      });

      Keyboard.addListener('keyboardDidHide', () => {
        this.scrollService.showBottomMenu();
      });
    }
  }

  public ngAfterViewInit(): void {
    this.scrollService.detectScrollElement(this.mainContent)
    this.scrollService.getScrollingDirection(this.mainContent)
  }

  private openDialog(): void {
    this.dialog.open(DialogExitConfirmationComponent, {
      width: '98vw',
      enterAnimationDuration: 250,
      exitAnimationDuration: 250,
    }).afterClosed().subscribe((value: boolean) => {
      this.exitApp(value)
    })
  }

  public exitApp(value: boolean): void {
    if (value) {
      CapacitorApp.exitApp()
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

@Component({
  selector: 'app-exit-formation-dialog',
  templateUrl: 'exit-confirmation/exit-confirmation-dialogue.html',
  standalone: true,
  imports: [MaterialModule],
})
export class DialogExitConfirmationComponent {
  public constructor(public dialogRef: MatDialogRef<DialogExitConfirmationComponent>) {}
}
