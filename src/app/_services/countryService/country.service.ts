import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CityResponse } from 'src/app/_models/DTO/Response/CityResponse';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { UniversityResponse } from 'src/app/_models/DTO/Response/UniversityResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }

  getCountries(lovType: number): Observable<GenericResponse<CountryResponse[]>> {
    var lov_Type={
      lovType:lovType
    }
    return this.http.post<GenericResponse<CountryResponse[]>>(`${this.API_URL}Lov/Get`, lov_Type)
    .pipe(map(data => <GenericResponse<CountryResponse[]>>data));
  }

  getCities() {
    debugger;
    var lov_Type = {
      lovType: 2
    }
    return this.http.post<GenericResponse<CityResponse[]>>(`${this.API_URL}Lov/Get`, lov_Type)
      .pipe(map(data => <GenericResponse<CityResponse[]>>data));
  }

  deleteCountry(CountryId: number): Observable<GenericResponse<CountryResponse[]>> {
    var countryId={
      countryId:CountryId
    }
    return this.http.post<GenericResponse<CountryResponse[]>>(`${this.API_URL}Lov/DeleteCountry`, countryId)
    .pipe(map(data => <GenericResponse<CountryResponse[]>>data));
  }
  
  addCountry(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/AddCountry`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }

  updateCountry(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/UpdateCountry`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }
}