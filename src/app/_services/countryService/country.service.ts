import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  getCountries(lovType:any): Observable<GenericResponse<CountryResponse[]>> {
    debugger;
    var lov_Type={
      lovType:lovType
    }
    return this.http.post<GenericResponse<CountryResponse[]>>(`${this.API_URL}Lov/GetCountries`, lov_Type)
    .pipe(map(data => <GenericResponse<CountryResponse[]>>data));
  }

  getUniversities(countryId:string): Observable<GenericResponse<UniversityResponse[]>> {
    debugger;
    var country_ID={
      countryID: countryId += ''
    }
    debugger;
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/GetUniversities`, country_ID)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }

}