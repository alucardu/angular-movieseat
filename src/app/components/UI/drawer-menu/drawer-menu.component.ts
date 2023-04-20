import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-drawer-menu',
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.scss']
})
export class DrawerMenuComponent {
  @Input() public drawer!: MatSidenav

  public constructor(
    private location: Location,
  ) {}

  public isRouteActive(route: string): boolean {
    return this.location.path() === route
  }
}
