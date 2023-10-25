import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { UniversityResponse } from 'src/app/_models/DTO/Response/UniversityResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class cityService {

  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }

  
   deleteCity(cityID:string): Observable<GenericResponse<UniversityResponse[]>> {
    var CityID={
      CityID: cityID 
    }
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/Deletecity`, CityID)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }


  addCity(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/AddCity`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }

  updateCity(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/UpdateCity`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }
}
