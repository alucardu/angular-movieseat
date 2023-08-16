import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-profile-movies',
  templateUrl: './profile-movies.component.html',
  styleUrls: ['./profile-movies.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class ProfileMoviesComponent implements OnInit {

  public moviesForm!: FormGroup;

  public constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.setMoviesForm();
  }

  private setMoviesForm(): void {
    this.moviesForm = this.formBuilder.nonNullable.group({
      moviesAdded: [{ value: 69, disabled: true}],
      moviesWatched: [{ value: 28, disabled: true}],
      moviesReviewed: [{ value: 123, disabled: true}],
      moviesSuggested: [{ value: 5, disabled: true}]
    })
  }

  public getAddedMovies(): AbstractControl {
    return this.moviesForm.get('moviesAdded')?.value
  }

  public getWatchedMovies(): AbstractControl {
    return this.moviesForm.get('moviesWatched')?.value
  }

  public getRevievedMovies(): AbstractControl {
    return this.moviesForm.get('moviesReviewed')?.value
  }

  public getSuggestedMovies(): AbstractControl {
    return this.moviesForm.get('moviesSuggested')?.value
  }

}
