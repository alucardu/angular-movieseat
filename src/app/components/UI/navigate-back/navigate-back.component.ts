import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceService } from 'src/app/services/device.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  standalone: true,
  selector: 'app-navigate-back',
  imports: [CommonModule],
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss']
})

export class NavigateBackComponent implements OnInit, OnDestroy {
  private activeRoutesSubject$!: Subscription
  public backBtnActive = false;
  public deviceIsMobile$ = this.deviceService.deviceIsMobile$

  public constructor(
    private location: Location,
    private scrollService: ScrollService,
    private deviceService: DeviceService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.activeRoutesSubject$ = this.scrollService.activeRoutesSubject$.subscribe({
      next: (routes) => {
        this.backBtnActive = routes.length > 1
        this.changeDetectorRef.detectChanges();
      }
    })
  }

  public navigateBack(): void {
    this.location.back();
  }

  public ngOnDestroy(): void {
    this.activeRoutesSubject$.unsubscribe();
  }
}
