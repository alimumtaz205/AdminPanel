import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryManagemntComponent } from './inquiry-managemnt.component';

describe('InquiryManagemntComponent', () => {
  let component: InquiryManagemntComponent;
  let fixture: ComponentFixture<InquiryManagemntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryManagemntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryManagemntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
