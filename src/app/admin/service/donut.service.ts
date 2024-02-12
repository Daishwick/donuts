import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { find, map, of, tap } from 'rxjs';

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

    return this.http
      .get<Donut[]>(`http://localhost:3000/donut`)
      .pipe(tap((donuts) => (this.donuts = donuts)));
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
      })
    );
  }

  update(payload: Donut) {
    this.donuts = this.donuts.map((donut: Donut) => {
      if (donut.id === payload.id) {
        return payload;
      }
      return donut;
    });
    console.log(this.donuts);
  }

  delete(payLoad: Donut) {
    this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payLoad.id);
    console.log(this.donuts);
  }
}
