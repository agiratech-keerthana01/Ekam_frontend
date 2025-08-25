import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPlan } from './buy-plan';

describe('BuyPlan', () => {
  let component: BuyPlan;
  let fixture: ComponentFixture<BuyPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
