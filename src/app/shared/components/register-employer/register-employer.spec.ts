import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmployer } from './register-employer';

describe('RegisterEmployer', () => {
  let component: RegisterEmployer;
  let fixture: ComponentFixture<RegisterEmployer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEmployer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterEmployer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
