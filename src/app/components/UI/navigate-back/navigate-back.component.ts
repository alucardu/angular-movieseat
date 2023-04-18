import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  standalone: true,
  selector: 'app-navigate-back',
  imports: [CommonModule],
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss']
})

export class NavigateBackComponent implements OnInit {
  public backBtnActive = false;
  public deviceIsMobile$ = this.deviceService.deviceIsMobile$

  public constructor(
    private location: Location,
    private scrollService: ScrollService,
    private deviceService: DeviceService,
  ) {}

  public ngOnInit(): void {
    this.scrollService.activeRoutesSubject$.subscribe({
      next: (data) => this.backBtnActive = data.length > 0
    })
  }

  public navigateBack(): void {
    this.location.back();
  }
}
