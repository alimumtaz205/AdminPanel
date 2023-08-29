import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityManagementComponent } from './university-management.component';

describe('UniversityManagementComponent', () => {
  let component: UniversityManagementComponent;
  let fixture: ComponentFixture<UniversityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniversityManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
