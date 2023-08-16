import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule]
})
export class SearchUserComponent {
  public searchUser = new FormControl('', { nonNullable: true });
  public showResults = false;

  public constructor() {
    this.searchUser.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe({
      next: (data) => {
        this.showResults = data.length > 0
      }
    })
  }
}
