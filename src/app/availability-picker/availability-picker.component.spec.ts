import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { MatButtonModule } from '@angular/material/button';

import { AvailabilityPickerComponent } from './availability-picker.component';


describe('AvailabilityPickerComponent', () => {
  let component: AvailabilityPickerComponent;
  let fixture: ComponentFixture<AvailabilityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        CalendarModule.forRoot() ],
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
