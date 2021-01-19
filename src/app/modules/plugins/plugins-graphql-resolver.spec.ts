import { TestBed } from '@angular/core/testing';

import { PluginsGraphqlResolver } from './plugins-graphql-resolver';

describe('PluginsGraphqlResolverService', () => {
  let service: PluginsGraphqlResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginsGraphqlResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
