import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { UserDate } from '../models/user-date';
import { environment } from '../../environments/environment';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    testUserDates = [];
    testUser = { id: 1, email: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
    dateIdCounter = 6;

    constructor() {
      this.testUserDates = [
        new UserDate(0, 0, new Date('2018-07-14T00:00:00')),
        new UserDate(1, 0, new Date('2018-07-15T00:00:00')),
        new UserDate(2, 0, new Date('2018-07-16T00:00:00')),
        new UserDate(3, 1, new Date('2018-07-14T00:00:00')),
        new UserDate(4, 1, new Date('2018-07-15T00:00:00')),
        new UserDate(5, 1, new Date('2018-07-16T00:00:00'))
      ];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (environment.production) {
          return next.handle(request);
        }

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // authenticate
            if (request.url.endsWith('/api/users/authenticate') && request.method === 'POST') {
                if (request.body.auth.email === this.testUser.email && request.body.auth.password === this.testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({ status: 200, body: { jwt: 'fake-jwt-token' } }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or password is incorrect' } });
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if
                // valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({ status: 200, body: [this.testUser] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
            }

            // Get Dates By User ID
            if (request.url.match(/\/api\/available-dates\/user\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid,
                // this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    const urlParts = request.url.split('/');
                    const id = parseInt(urlParts[urlParts.length - 1], 10);
                    const userDates = [];
                    this.testUserDates.forEach( userDate => {
                      if (userDate.userId === id) {
                        userDates.push(userDate);
                      }
                    });
                    if (userDates.length) {
                      return of(new HttpResponse({ status: 200, body: userDates }));
                    }
                    return of(new HttpResponse({ status: 404 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } });
                }
              }

              // Add Date by User ID
              if (request.url.match(/\/api\/available-dates\/user\/\d+$/) && request.method === 'POST') {
                  // check for fake auth token in header and return user if valid,
                  // this security is implemented server side in a real application
                  if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                      // find user by id in users array
                      const urlParts = request.url.split('/');
                      const id = parseInt(urlParts[urlParts.length - 1], 10);
                      const foundMatch = this.testUserDates.find( date => {
                        return date.date.getTime() === request.body.date.getTime() && request.body.userId === date.userId; });
                      if (!foundMatch) {
                        request.body.id = this.dateIdCounter++;
                        this.testUserDates.push(request.body);
                        localStorage.setItem('user-dates', JSON.stringify(this.testUserDates));
                      }
                      return of(new HttpResponse({ status: 200, body: request.body }));
                  } else {
                      // return 401 not authorised if token is null or invalid
                      return throwError({ error: { message: 'Unauthorised' } });
                  }
                }

                // Remove Date ID
                if (request.url.match(/\/api\/available-dates\/\d+$/) && request.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid,
                    // this security is implemented server side in a real application
                    if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array

                        const urlParts = request.url.split('/');
                        const id = parseInt(urlParts[urlParts.length - 1], 10);
                        const index = this.testUserDates.findIndex( date => id === date.id );
                        if (index !== -1) {
                          this.testUserDates.splice(index, 1);
                          localStorage.setItem('user-dates', JSON.stringify(this.testUserDates));
                        }
                        return of(new HttpResponse({ status: 200 }));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        return throwError({ error: { message: 'Unauthorised' } });
                    }
                  }

            // pass through any requests not handled above
            return next.handle(request);

        }))

        // call materialize and dematerialize to ensure delay even if an error
        // is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
