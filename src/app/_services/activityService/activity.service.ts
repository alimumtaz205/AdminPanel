import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CountryResponse } from 'src/app/_models/DTO/Response/CountryResponse';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { UniversityResponse } from 'src/app/_models/DTO/Response/UniversityResponse';
import { environment } from 'src/environments/environment';
import { ActivityResponse } from 'src/app/_models/DTO/Response/Activity/ActivityResponse';
import { BaseResponseModel } from 'src/app/_models/_crud/_base.response.model';
import { PagesEnum } from 'src/app/_models/enums/pages.enum';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private API_URL = environment.API_URL + "UserManagment/";

  constructor(private http: HttpClient) { }

  getActivities(activity_ID: any): Observable<GenericResponse<ActivityResponse[]>> {
    debugger;
    var activityID = {
      activityID: activity_ID
    }
    return this.http.post<GenericResponse<ActivityResponse[]>>(`${this.API_URL}GetActivities`, activityID)
      .pipe(map(data => <GenericResponse<ActivityResponse[]>>data));
  }

  addActivity(formData: any): Observable<GenericResponse<ActivityResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<ActivityResponse[]>>(`${this.API_URL}AddActivity`, formData)
      .pipe(map(data => <GenericResponse<ActivityResponse[]>>data));
  }

  updateActivity(formData: any): Observable<GenericResponse<ActivityResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<ActivityResponse[]>>(`${this.API_URL}UpdateActivity`, formData)
      .pipe(map(data => <GenericResponse<ActivityResponse[]>>data));
  }

  getParentActivities(activity_ID: any): Observable<GenericResponse<ActivityResponse[]>> {
    debugger;
    return this.http.get<GenericResponse<ActivityResponse[]>>(`${this.API_URL}GetParentActivities`)
      .pipe(map(data => <GenericResponse<ActivityResponse[]>>data));
  }
}