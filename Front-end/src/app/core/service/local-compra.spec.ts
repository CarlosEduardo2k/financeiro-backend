import { TestBed } from '@angular/core/testing';
import { LocalCompra } from './local-compra';

describe('LocalCompra', () => {
  let service: LocalCompra;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalCompra);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
