import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fadeAnimation } from 'src/app/animations';
import { MaterialModule } from 'src/app/material.module';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-drawer-toggle',
  templateUrl: './drawer-toggle.component.html',
  styleUrls: ['./drawer-toggle.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule],
  animations: [fadeAnimation]
})
export class DrawerToggleComponent {
  private scrollService = inject(ScrollService);
  public recentlyScrolled$ = this.scrollService.recentlyScrolled$

  @Input() public drawer!: MatSidenav

}
