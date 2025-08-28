import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlan } from './add-plan';

describe('AddPlan', () => {
  let component: AddPlan;
  let fixture: ComponentFixture<AddPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
