import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityPickerComponent } from './availability-picker.component';

describe('AvailabilityPickerComponent', () => {
  let component: AvailabilityPickerComponent;
  let fixture: ComponentFixture<AvailabilityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilityPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
