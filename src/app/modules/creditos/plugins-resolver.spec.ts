import { TestBed } from '@angular/core/testing';

import { PluginsResolver } from './plugins-resolver';

describe('PluginsResolverService', () => {
  let service: PluginsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginsResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
