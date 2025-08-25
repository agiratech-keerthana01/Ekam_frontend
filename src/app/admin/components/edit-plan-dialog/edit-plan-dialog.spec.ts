import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanDialog } from './edit-plan-dialog';

describe('EditPlanDialog', () => {
  let component: EditPlanDialog;
  let fixture: ComponentFixture<EditPlanDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPlanDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlanDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
