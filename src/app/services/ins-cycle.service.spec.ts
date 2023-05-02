import { TestBed } from '@angular/core/testing';

import { InsCycleService } from './ins-cycle.service';

describe('InsCycleService', () => {
  let service: InsCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
