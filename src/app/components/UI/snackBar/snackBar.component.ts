import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
import { SnackBarData } from 'src/app/services/snackbBar.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-snackBar',
  templateUrl: './snackBar.component.html',
  styleUrls: ['./snackBar.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class SnackBarComponent {
  public constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {}
}
