import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeAnimation } from 'src/app/animations';
import { MaterialModule } from 'src/app/material.module';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-movie-search-icon',
  templateUrl: './movie-search-icon.component.html',
  styleUrls: ['./movie-search-icon.component.scss'],
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule],
  animations: [fadeAnimation]
})
export class MovieSearchIconComponent {
  private scrollService = inject(ScrollService);

  public recentlyScrolled$ = this.scrollService.recentlyScrolled$
}
