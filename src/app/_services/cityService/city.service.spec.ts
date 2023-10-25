import { TestBed } from '@angular/core/testing';

import { cityService } from '../cityService/city.service';

describe('cityService', () => {
  let service: cityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(cityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
