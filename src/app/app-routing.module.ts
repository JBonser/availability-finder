import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'availability', pathMatch: 'full' },
  { path: 'availability', loadChildren: './availability-picker/availability-picker.module#AvailabilityPickerModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
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
