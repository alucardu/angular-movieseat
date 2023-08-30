/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MovieDetailsService } from './movie-details.service';

describe('Service: MovieDetails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailsService]
    });
  });

  it('should ...', inject([MovieDetailsService], (service: MovieDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
