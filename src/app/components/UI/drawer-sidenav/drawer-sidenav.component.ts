import { Location } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-drawer-sidenav',
  templateUrl: './drawer-sidenav.component.html',
  styleUrls: ['./drawer-sidenav.component.scss'],
  standalone: true,
  imports: [MaterialModule, RouterModule]
})
export class DrawerSidenavComponent {
  private location = inject(Location)

  @Input() public drawer!: MatSidenav

  public isRouteActive(route: string): boolean {
    return this.location.path() === route
  }
}
