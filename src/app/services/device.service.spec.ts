import { TestBed, inject } from '@angular/core/testing';
import { DeviceService } from './device.service';

describe('Service: Device', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceService]
    });
  });

  it('should ...', inject([DeviceService], (service: DeviceService) => {
    expect(service).toBeTruthy();
  }));
});
