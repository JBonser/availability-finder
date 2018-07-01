import { NgModule } from '@angular/core';
import { AvailabilityPickerComponent } from './availability-picker.component';
import { AppMaterialsModule } from '../app-materials.module';
import { CalendarModule } from 'angular-calendar';
import { AvailabilityPickerRoutingModule } from './availability-picker-routing.module';

@NgModule({
  imports: [
    AppMaterialsModule,
    CalendarModule.forRoot(),
    AvailabilityPickerRoutingModule],
  declarations : [ AvailabilityPickerComponent ],
})

export class AvailabilityPickerModule {}
