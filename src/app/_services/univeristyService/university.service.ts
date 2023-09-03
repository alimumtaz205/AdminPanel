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

  addUniversity(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/AddUniveristy`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }

  updateUniveristy(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/UpdateUniveristy`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }
}
