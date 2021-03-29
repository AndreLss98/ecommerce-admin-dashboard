import { TestBed } from '@angular/core/testing';

import { UsuariosResolver } from './usuarios.resolver';

describe('UsuariosService', () => {
  let service: UsuariosResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
