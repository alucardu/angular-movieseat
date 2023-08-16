import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-drawer-toggle',
  templateUrl: './drawer-toggle.component.html',
  styleUrls: ['./drawer-toggle.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class DrawerToggleComponent {
  @Input() public drawer!: MatSidenav;
}
