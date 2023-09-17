import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchEntityDialogComponent } from './fetch-entity-dialog.component';

describe('FetchEntityDialogComponent', () => {
  let component: FetchEntityDialogComponent;
  let fixture: ComponentFixture<FetchEntityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchEntityDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
