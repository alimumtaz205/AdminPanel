import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityManagmentComponent } from './city-managment.component';

describe('CityManagmentComponent', () => {
  let component: CityManagmentComponent;
  let fixture: ComponentFixture<CityManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
