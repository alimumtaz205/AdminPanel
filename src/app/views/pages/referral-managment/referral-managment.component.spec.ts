import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralManagmentComponent } from './referral-managment.component';

describe('ReferralManagmentComponent', () => {
  let component: ReferralManagmentComponent;
  let fixture: ComponentFixture<ReferralManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
