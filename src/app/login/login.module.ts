import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppMaterialsModule } from '../app-materials.module';

// used to create fake backend
import { fakeBackendProvider } from '../helpers/fake-backend';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    AppMaterialsModule,
    LoginRoutingModule ],
  declarations : [ LoginComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    // provider used to create fake backend
    fakeBackendProvider],
})

export class LoginModule {}
