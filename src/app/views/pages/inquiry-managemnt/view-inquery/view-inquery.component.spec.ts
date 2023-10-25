import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInqueryComponent } from './view-inquery.component';

describe('ViewInqueryComponent', () => {
  let component: ViewInqueryComponent;
  let fixture: ComponentFixture<ViewInqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInqueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
