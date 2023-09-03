import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDialogDeleteComponent } from './alert-dialog-delete.component';

describe('AlertDialogDeleteComponent', () => {
  let component: AlertDialogDeleteComponent;
  let fixture: ComponentFixture<AlertDialogDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertDialogDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDialogDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
