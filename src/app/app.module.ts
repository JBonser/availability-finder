import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/';
import { MatButtonModule } from '@angular/material/button';
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
    MatButtonModule,
    CalendarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
