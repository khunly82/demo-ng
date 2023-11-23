import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Test } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private readonly _http: HttpClient,
    @Inject('test') a : number,
    @Inject('test2') b : {val: number},
    t: Test,
  ) { console.log(a, b, t) }

  get() {
    return this._http.get<any[]>('http://localhost:3000/persons');
  }

  getById(id: number) {
    return this._http.get<any>('http://localhost:3000/persons/' + id);
  }

  getCoords(ad: string): any|undefined {
    return this._http.get<any[]>('https://nominatim.openstreetmap.org/search', { params: {
      q: ad,
      format: 'json'
    }}).pipe(map((t: any[]) => t[0]));
  }
}
