import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { environment } from 'src/environments/environment';
import { ProfileResponse } from 'src/app/_models/DTO/Response/Profile/ProfileResponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private API_URL = environment.API_URL + "UserManagment/";

  constructor(private http: HttpClient) { }

  GetProfiles(): Observable<GenericResponse<ProfileResponse[]>> {
    return this.http.get<GenericResponse<ProfileResponse[]>>(`${this.API_URL}GetProfiles`)
      .pipe(map(data => <GenericResponse<ProfileResponse[]>>data));
  }

  addProfile(formData: any): Observable<GenericResponse<ProfileResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<ProfileResponse[]>>(`${this.API_URL}AddProfile`, formData)
      .pipe(map(data => <GenericResponse<ProfileResponse[]>>data));
  }

  updateActivity(formData: any): Observable<GenericResponse<ProfileResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<ProfileResponse[]>>(`${this.API_URL}UpdateActivity`, formData)
      .pipe(map(data => <GenericResponse<ProfileResponse[]>>data));
  }

  getParentActivities(activity_ID: any): Observable<GenericResponse<ProfileResponse[]>> {
    debugger;
    return this.http.get<GenericResponse<ProfileResponse[]>>(`${this.API_URL}GetParentActivities`)
      .pipe(map(data => <GenericResponse<ProfileResponse[]>>data));
  }
}
