import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-drawer-menu',
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterModule]
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
