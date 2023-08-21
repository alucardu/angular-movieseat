/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MovieDetailsServiceService } from './movie-details.service';

describe('Service: MovieDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailsServiceService]
    });
  });

  it('should ...', inject([MovieDetailsServiceService], (service: MovieDetailsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
