import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';
import { UserDate } from '../models/user-date';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AvailableDatesService {
    constructor(private http: HttpClient) { }
    private datesUrl = '/api/available-dates';  // URL to web api

    getAllDates() {
        return this.http.get<Date[]>(this.datesUrl);
    }

    getDatesForUser(id: number): Observable<UserDate[]> {
      return this.http.get<UserDate[]>(`${this.datesUrl}/user/${id}`, httpOptions).pipe(
        tap(date => console.log(date))
      );
    }

    addDateForUser(id: number, date: UserDate): Observable<UserDate> {
      console.log(`Add Date For User: ${id}`);
      return this.http.post<UserDate>(`${this.datesUrl}/user/${id}`, date);
    }

    removeDateById(id: number): Observable<UserDate> {
      return this.http.delete<UserDate>(`${this.datesUrl}/${id}`);
    }
}
