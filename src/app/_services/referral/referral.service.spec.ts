import { TestBed } from '@angular/core/testing';

import { referralService } from './referral.service';

describe('raferralService', () => {
  let service: referralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(referralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
