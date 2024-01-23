import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteProdutosPage } from './delete-produtos.page';

describe('DeleteProdutosPage', () => {
  let component: DeleteProdutosPage;
  let fixture: ComponentFixture<DeleteProdutosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeleteProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
