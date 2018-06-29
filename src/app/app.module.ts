import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/';

import { AppComponent } from './app.component';
import { AvailabilityPickerComponent } from './availability-picker/availability-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    AvailabilityPickerComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
