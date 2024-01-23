import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CadProdutosPage } from './cad-produtos.page';

describe('CadProdutosPage', () => {
  let component: CadProdutosPage;
  let fixture: ComponentFixture<CadProdutosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});