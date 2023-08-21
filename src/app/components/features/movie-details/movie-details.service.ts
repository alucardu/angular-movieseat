import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IClip, clips } from 'src/app/mock/movie-clips.json';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsServiceService {
  private clipsSubject$ = new BehaviorSubject<IClip[]>(clips);
  public clips$ = this.clipsSubject$.asObservable()
}
