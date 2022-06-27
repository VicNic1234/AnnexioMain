import { Injectable, Inject, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country-model';


const baseUrl = Inject('BASE_URL');

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {
  constructor(private http: HttpClient) { }
  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl +'countrylist', { params });
  }
  //constructor() { }
}
