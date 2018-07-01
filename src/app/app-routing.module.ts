import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailabilityPickerComponent
} from './components/availability-picker/availability-picker.component';

const routes: Routes = [
  { path: '', redirectTo: '/availability', pathMatch: 'full' },
  {path: 'availability', component: AvailabilityPickerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
