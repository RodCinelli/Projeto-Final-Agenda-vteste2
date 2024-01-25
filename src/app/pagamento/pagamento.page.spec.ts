import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagamentoPage } from './pagamento.page';

describe('PagamentoPage', () => {
  let component: PagamentoPage;
  let fixture: ComponentFixture<PagamentoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
