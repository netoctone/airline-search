import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportPopupComponent } from './airport-popup.component';

describe('AirportPopupComponent', () => {
  let component: AirportPopupComponent;
  let fixture: ComponentFixture<AirportPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirportPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
