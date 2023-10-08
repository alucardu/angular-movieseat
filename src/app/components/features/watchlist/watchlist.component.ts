import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovieDisplayComponent } from '../movie-dashboard/movie-display/movie-display.component';
import { MovieDetailsService } from '../movie-details/movie-details/movie-details.service';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  standalone: true,
  imports: [CommonModule, MovieDisplayComponent, MaterialModule]
})
export class WatchlistComponent implements OnInit {
  private metaTitleService = inject(Title)
  private movieDetailService = inject(MovieDetailsService)
  private route = inject(ActivatedRoute)

  public movieWatchlist$ = this.movieDetailService.movieWatchlist$
  public movieWatchlistUsername$ = this.movieDetailService.movieWatchlistUsername$

  public showFollowBtn = false;

  public ngOnInit(): void {
    this.metaTitleService.setTitle('Movieseat Watchlist')

    this.route.paramMap.pipe(first()).subscribe({
      next: (data) => {
        const id = Number(data.get('id'))
        this.movieDetailService.getWatchlistUser(id, id ? 'external' : 'internal');
        this.showFollowBtn = id ? true : false
      }
    })
  }

  public followUser(): void {
    console.log('user')
  }
}
