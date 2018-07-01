import { RouterModule, Routes } from '@angular/router';
import { AvailabilityPickerComponent
} from './components/availability-picker/availability-picker.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'availability', pathMatch: 'full' },
  { path: 'availability',
    component: AvailabilityPickerComponent,
    canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
