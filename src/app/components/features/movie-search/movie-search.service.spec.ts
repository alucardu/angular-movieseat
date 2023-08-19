/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MovieSearchService } from './movie-search.service';

describe('Service: MovieSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieSearchService]
    });
  });

  it('should ...', inject([MovieSearchService], (service: MovieSearchService) => {
    expect(service).toBeTruthy();
  }));
});
