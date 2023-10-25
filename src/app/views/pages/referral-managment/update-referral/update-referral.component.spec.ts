import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReferralComponent } from './update-referral.component';

describe('UpdateReferralComponent', () => {
  let component: UpdateReferralComponent;
  let fixture: ComponentFixture<UpdateReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
