import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(environment.baseUrl + '/api/users/authenticate', { auth: { email: email, password: password } })
            .pipe(map((res: any) => {
                // login successful if there's a jwt token in the response
                if (res && res.jwt) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email, jwt: res.jwt }));
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
