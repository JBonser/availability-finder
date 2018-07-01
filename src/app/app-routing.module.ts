import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AvailabilityPickerModule } from './availability-picker/availability-picker.module';
import { LoginModule } from './login/login.module';

const routes: Routes = [
  { path: '', redirectTo: 'availability', pathMatch: 'full' },
  { path: 'availability', loadChildren: () => AvailabilityPickerModule },
  { path: 'login', loadChildren: () => LoginModule},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules})],
  exports: [ RouterModule ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}]
})

export class AppRoutingModule {}
