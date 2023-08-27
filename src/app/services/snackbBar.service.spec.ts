/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { SnackbBarService } from './snackbBar.service';

describe('Service: SnackbBar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnackbBarService]
    });
  });

  it('should ...', inject([SnackbBarService], (service: SnackbBarService) => {
    expect(service).toBeTruthy();
  }));
});
