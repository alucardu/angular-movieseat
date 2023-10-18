/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BiographyService } from './biography.service';

describe('Service: Biography', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiographyService]
    });
  });

  it('should ...', inject([BiographyService], (service: BiographyService) => {
    expect(service).toBeTruthy();
  }));
});
