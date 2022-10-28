import { TestBed } from '@angular/core/testing';

import { RegstirationService } from './regstiration.service';

describe('RegstirationService', () => {
  let service: RegstirationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegstirationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
