import { TestBed } from '@angular/core/testing';

import { BundlesFormEditResolver } from './bundles-form-edit-resolver';

describe('BundlesFormEditResolverService', () => {
  let service: BundlesFormEditResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundlesFormEditResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
