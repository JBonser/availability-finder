import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from '../helpers/fake-backend';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';


import { AvailabilityPickerComponent } from './availability-picker.component';
import { AppMaterialsModule } from '../app-materials.module';
import { CalendarModule } from 'angular-calendar';
import { AvailabilityPickerRoutingModule } from './availability-picker-routing.module';
import { AvailableDatesService } from '../services/available-date.service';


@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    AppMaterialsModule,
    CalendarModule.forRoot(),
    AvailabilityPickerRoutingModule],
  declarations : [ AvailabilityPickerComponent ],
  providers:     [
    AvailableDatesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider],
})

export class AvailabilityPickerModule {}
