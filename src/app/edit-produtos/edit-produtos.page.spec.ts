import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProdutosPage } from './edit-produtos.page';

describe('EditProdutosPage', () => {
  let component: EditProdutosPage;
  let fixture: ComponentFixture<EditProdutosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
