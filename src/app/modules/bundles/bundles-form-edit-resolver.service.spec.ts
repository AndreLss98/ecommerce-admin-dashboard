import { TestBed } from '@angular/core/testing';

import { BundlesFormEditResolverService } from './bundles-form-edit-resolver.service';

describe('BundlesFormEditResolverService', () => {
  let service: BundlesFormEditResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundlesFormEditResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
