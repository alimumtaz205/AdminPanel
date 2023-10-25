import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInqueryComponent } from './edit-inquery.component';

describe('EditInqueryComponent', () => {
  let component: EditInqueryComponent;
  let fixture: ComponentFixture<EditInqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInqueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
