import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroLocalCompra } from './cadastro-local-compra';

describe('CadastroLocalCompra', () => {
  let component: CadastroLocalCompra;
  let fixture: ComponentFixture<CadastroLocalCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroLocalCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroLocalCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
