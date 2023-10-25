import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { UniversityResponse } from 'src/app/_models/DTO/Response/UniversityResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }

  getUniversities(countryId:number): Observable<GenericResponse<UniversityResponse[]>> {
    var country_ID={
      countryID: countryId 
    }
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/GetUniversities`, country_ID)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }

   deleteUniversities(universityId:string): Observable<GenericResponse<UniversityResponse[]>> {
    var UniversityId={
      UniversityId: universityId 
    }
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/DeleteUniveristy`, UniversityId)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }


  addUniversity(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/AddUniveristy`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }

  updateUniveristy(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/UpdateUniveristy`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }
}
