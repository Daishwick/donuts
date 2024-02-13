import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, of, retry, tap, throwError } from 'rxjs';

import { Donut } from '../models/donut.model';

@Injectable({
  providedIn: 'root',
})
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}

  read() {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    return this.http.get<Donut[]>(`http://localhost:3000/donut`).pipe(
      tap((donuts) => {
        this.donuts = donuts;
      }),
      retry(2),
      catchError(this.handleError)
    );
  }

  readOne(id: string) {
    return this.read().pipe(
      map((donuts: Donut[]) => {
        const donut = donuts.find((donut: Donut) => donut.id === id);
        if (donut) {
          return donut;
        }
        return {
          name: '',
          icon: '',
          price: 0,
          description: '',
        };
      })
    );
  }

  create(payload: Donut) {
    return this.http.post<Donut>(`http://localhost:3000/donut`, payload).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Donut) {
    return this.http
      .put<Donut>(`http://localhost:3000/donut/${payload.id}`, payload)
      .pipe(
        tap((donut) => {
          this.donuts = this.donuts.map((item: Donut) => {
            if (item.id === donut.id) {
              return donut;
            }
            return item;
          });
        }),
        catchError(this.handleError)
      );
  }

  delete(payLoad: Donut) {
    return this.http
      .delete<Donut>(`http://localhost:3000/donut/${payLoad.id}`)
      .pipe(
        tap(() => {
          this.donuts = this.donuts.filter(
            (donut: Donut) => donut.id !== payLoad.id
          );
        }),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      //client-side
      console.warn('Client', err.message);
    } else {
      //server-side
      console.warn('Server', err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
