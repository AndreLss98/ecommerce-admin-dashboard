import { TestBed } from '@angular/core/testing';

import { BundlesService } from './bundles.service';

describe('BundlesService', () => {
  let service: BundlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
