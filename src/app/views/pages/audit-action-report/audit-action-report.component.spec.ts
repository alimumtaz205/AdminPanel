import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditActionReportComponent } from './audit-action-report.component';

describe('AuditActionReportComponent', () => {
  let component: AuditActionReportComponent;
  let fixture: ComponentFixture<AuditActionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditActionReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditActionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
