/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MovieReviewsService } from './movie-reviews.service';

describe('Service: MovieReviews', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieReviewsService]
    });
  });

  it('should ...', inject([MovieReviewsService], (service: MovieReviewsService) => {
    expect(service).toBeTruthy();
  }));
});
