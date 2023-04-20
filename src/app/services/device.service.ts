import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StatusBar } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  public deviceIsMobileSubject$ = new BehaviorSubject<boolean>(false);
  public deviceIsMobile$ = this.deviceIsMobileSubject$.asObservable();

  public constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  public detectDevice(): void {
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.Small]).subscribe((state: BreakpointState) => {
      this.deviceIsMobileSubject$.next(state.matches);
      this.styleStatusBar();
    });
  }

  private styleStatusBar(): void {
    StatusBar.setBackgroundColor({color: '#280028'}).catch(() => {
      // error //
    });
  }
}
