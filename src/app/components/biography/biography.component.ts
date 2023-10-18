import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToggleDirective } from 'src/app/directives/toggle-content/toggle-content.directive';
import { MaterialModule } from 'src/app/material.module';
import { BiographyService } from './biography.service';
import { first } from 'rxjs';
import { IMovie, IPerson } from 'src/app/mock/watchlist.json';
import { MovieDetailsService } from '../features/movie-details/movie-details/movie-details.service';
import { MovieSearchService } from '../features/movie-search/movie-search.service';
import { ReplaceSpaces } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-biography',
  templateUrl: './biography.component.html',
  styleUrls: ['./biography.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink, ToggleDirective],
})
export class BiographyComponent implements OnInit {
  private biographyService = inject(BiographyService)
  private route = inject(ActivatedRoute)
  private movieDetailService = inject(MovieDetailsService)
  private router = inject(Router)
  private movieSearchService = inject(MovieSearchService)

  public biography = ''
  public name = ''
  public profile_path = ''
  public showBiography = false;

  public directorMovies: IMovie[] = [];
  public writerMovies: IMovie[] = [];
  public editorMovies: IMovie[] = [];
  public directorOfPhotography: IMovie[] = [];
  public executiveProducer: IMovie[] = [];
  public soundEditor: IMovie[] = [];
  public visualEffects: IMovie[] = [];
  public actorMovies: IMovie[] = [];

  public ngOnInit(): void {
    this.route.paramMap.pipe(first()).subscribe({
      next: (data) => {
        const id = Number(data.get('id'))
        this.biographyService.getPersonData(id).subscribe({
          next: ({data}) => {
            this.setPersonData(data.searchPerson.data)
            this.setMovieData(data.searchPerson.data.movies!)
          },
          error: (data) => console.log(data)
        })
      }
    })
  }

  private setPersonData(person: IPerson): void {
    this.biography = person.biography
    this.name = person.name!
    this.profile_path = person.profile_path
  }

  private setMovieData(movies: IMovie[]): void {
    this.directorMovies = movies.filter((movie) => { return movie.job === 'Director'})
    this.writerMovies = movies.filter((movie) => { return movie.job === 'Screenplay'})
    this.editorMovies = movies.filter((movie) => { return movie.job === 'Editor'})
    this.directorOfPhotography = movies.filter((movie) => { return movie.job === 'Director of Photography'})
    this.soundEditor = movies.filter((movie) => { return movie.job === 'Sound'})
    this.executiveProducer = movies.filter((movie) => { return movie.job === 'Executive Producer' || movie.job === 'Producer'})
    this.visualEffects = movies.filter((movie) => { return movie.job === 'Visual Effects'})
    this.actorMovies = movies.filter((movie) => { return movie.character !== null})
  }

  public navigateToMovie(movie: IMovie): void {
    this.movieDetailService.test(movie.id).pipe(first()).subscribe({
      next: () => this.router.navigate([`/movie/${movie.id}/${ReplaceSpaces(movie.title)}`]),
      error: () => this.createMovie(movie)
    })
  }

  public createMovie(movie: IMovie): void {
    this.movieSearchService.createMovie(movie).subscribe({
      next: () => this.router.navigate([`/movie/${movie.id}/${ReplaceSpaces(movie.title)}`]),
      error: (error) => console.log(error)
    })
  }
}
