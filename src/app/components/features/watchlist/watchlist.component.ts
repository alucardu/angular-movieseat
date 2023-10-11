import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MovieDisplayComponent } from '../movie-dashboard/movie-display/movie-display.component';
import { MovieDetailsService } from '../movie-details/movie-details/movie-details.service';
import { MaterialModule } from 'src/app/material.module';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IUser } from '../../authentication/sign-up/sign-up.service';
import { UserService } from '../../profile/search-user/user.service';
import { AuthService } from '../../authentication/auth.service';
import { SnackBarState, SnackbBarService } from 'src/app/services/snackbBar.service';

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
  private authService = inject(AuthService)
  private userService = inject(UserService)
  private snackBarService = inject(SnackbBarService)

  public movieWatchlist$ = this.movieDetailService.movieWatchlist$
  public movieWatchlistUser$ = this.movieDetailService.movieWatchlistUser$
  public currentUser$ = this.authService.currentUser$;

  public isFriend?: boolean;
  public notCurrentUser?: boolean;
  public watchlistUser!: IUser

  public ngOnInit(): void {
    this.metaTitleService.setTitle('Movieseat Watchlist')

    this.route.paramMap.pipe(first()).subscribe({
      next: (data) => {
        const id = Number(data.get('id'))
        this.movieDetailService.getWatchlistUser(id, id ? 'external' : 'internal');
      }
    })

    this.movieWatchlistUser$.pipe(first()).subscribe({
      next: (data) => {
        if (!data) return
        this.isFriend = data.friendOf.some((friend) => friend.id === this.authService.getCurrentUser().id)
        this.notCurrentUser = data.id !== this.authService.getCurrentUser().id
        this.watchlistUser = data
      }
    })

  }

  private setFriendState(): void {
    this.isFriend = !this.isFriend;
  }

  public addFriend(user: IUser): void {
    this.userService.addFriend(user).pipe(first()).subscribe({
      next: ({data}) => {
        if (!data) return
        this.authService.updateCurrentUser(data.addFriend.data.user)
        this.snackBarService.openSnackBar(data.addFriend.response, SnackBarState.SUCCESS, data?.addFriend.data.friend)
        this.setFriendState();
      },
      error: (data) => console.log(data)
    })
  }

  public removeFriend(user: IUser): void {
    this.userService.removeFriend(user).pipe(first()).subscribe({
      next: ({data}) => {
        if (!data) return
        this.authService.updateCurrentUser(data.removeFriend.data.user)
        this.snackBarService.openSnackBar(data.removeFriend.response, SnackBarState.SUCCESS, data?.removeFriend.data.friend)
        this.setFriendState();
      },
      error: (data) => console.log(data)
    })
  }
}
