import { TestBed } from '@angular/core/testing';

import { CambioFondoService } from './cambio-fondo.service';

describe('CambioFondoService', () => {
  let service: CambioFondoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioFondoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
