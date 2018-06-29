import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/';
import { CalendarModule } from 'angular-calendar';
import { AvailabilityPickerComponent } from './availability-picker/availability-picker.component';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    AvailabilityPickerComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    CalendarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
