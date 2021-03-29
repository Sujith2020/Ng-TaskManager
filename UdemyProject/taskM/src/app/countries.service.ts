import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {
  base: string = "http://localhost:54573"
  constructor(private httpClient: HttpClient) {

  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.base + "/api/countries", { responseType: "json" });
  }

  getCountries1(): Country[] {
    return [
      new Country(1, "India"),
      new Country(2, "UK"),
      new Country(3, "USA"),
      new Country(4, "Japan")
    ];
  }
}
