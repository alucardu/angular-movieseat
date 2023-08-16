import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drawer-bottom-menu',
  templateUrl: './drawer-bottom-menu.component.html',
  styleUrls: ['./drawer-bottom-menu.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, MaterialModule],
})
export class DrawerBottomMenuComponent {
  @Input() public drawer!: MatSidenav;
}
