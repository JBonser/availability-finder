import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialsModule } from './app-materials.module';
import { AvailabilityPickerModule
} from './availability-picker/availability-picker.module';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppMaterialsModule,
    AvailabilityPickerModule,
    LoginModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
