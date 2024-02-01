import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PremiumModalPage } from './premium-modal.page';

describe('PremiumModalPage', () => {
  let component: PremiumModalPage;
  let fixture: ComponentFixture<PremiumModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PremiumModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
