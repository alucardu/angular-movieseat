import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from './user.service';
import { IUser } from '../../authentication/sign-up/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class SearchUserComponent {
  private userService = inject(UserService)
  private router = inject(Router)

  public userSearchResults$ = this.userService.userSearchResults$;

  public searchUser = new FormControl('', { nonNullable: true });

  public constructor() {
    this.searchUser.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe({
      next: (query) => {
        if (query.trim().length === 0 || query.trim().length < 4 ) {
          return;
        }

        this.userService.getUser(query)
      }
    })
  }

  public navigateToWatchList(user: IUser): void  {
    this.router.navigate([`/watchlist/${user.id}/${user.username}`])
  }
}
