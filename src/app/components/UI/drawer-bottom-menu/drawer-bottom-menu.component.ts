import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MaterialModule } from 'src/app/material.module';
import { DrawerToggleComponent } from '../drawer-toggle/drawer-toggle.component';
import { MovieSearchIconComponent } from '../movie-search-icon/movie-search-icon.component';

@Component({
  selector: 'app-drawer-bottom-menu',
  templateUrl: './drawer-bottom-menu.component.html',
  styleUrls: ['./drawer-bottom-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, DrawerToggleComponent, MovieSearchIconComponent],
})
export class DrawerBottomMenuComponent {
  @Input() public drawer!: MatSidenav;
}
