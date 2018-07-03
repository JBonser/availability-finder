import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialsModule } from '../app-materials.module';
import { CalendarModule } from 'angular-calendar';
import { HttpClientModule } from '@angular/common/http';

import { AvailabilityPickerComponent } from './availability-picker.component';


describe('AvailabilityPickerComponent', () => {
  let component: AvailabilityPickerComponent;
  let fixture: ComponentFixture<AvailabilityPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialsModule,
        HttpClientModule,
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
