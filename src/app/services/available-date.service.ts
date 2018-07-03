import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';

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

    getDatesForUser(id: number): Observable<Date[]> {
      const url =  `${this.datesUrl}/${id}`;
      const result = this.http.get<Date[]>(`${this.datesUrl}/${id}`, httpOptions);
      return result;
    }

}
