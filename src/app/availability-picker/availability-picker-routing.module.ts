import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AvailabilityPickerComponent } from './availability-picker.component';

const routes: Routes = [
  { path: '', component: AvailabilityPickerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ],
})

export class AvailabilityPickerRoutingModule {}
