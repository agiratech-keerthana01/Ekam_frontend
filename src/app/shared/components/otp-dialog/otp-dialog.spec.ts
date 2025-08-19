import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpDialog } from './otp-dialog';

describe('OtpDialog', () => {
  let component: OtpDialog;
  let fixture: ComponentFixture<OtpDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
