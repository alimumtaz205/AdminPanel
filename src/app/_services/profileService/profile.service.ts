import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { environment } from 'src/environments/environment';
import { ProfileResponse } from 'src/app/_models/DTO/Response/Profile/ProfileResponse';
import { Profile } from 'src/app/_models/Profile';
import { BaseResponseModel } from 'src/app/_models/_crud/_base.response.model';
import { PagesEnum } from 'src/app/_models/enums/pages.enum';

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

  getProfileByID(formData: any): Observable<GenericResponse<ProfileResponse[]>> {
    debugger;
    var profileID = {
      profileID: formData
    }
    return this.http.post<GenericResponse<ProfileResponse[]>>(`${this.API_URL}GetProfileByID`, profileID)
      .pipe(map(data => <GenericResponse<ProfileResponse[]>>data));
  }

  addProfile(formData: any): Observable<GenericResponse<ProfileResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<ProfileResponse[]>>(`${this.API_URL}AddProfile`, formData)
      .pipe(map(data => <GenericResponse<ProfileResponse[]>>data));
  }

  deleteProfile(formData: any): Observable<GenericResponse<ProfileResponse[]>> {
    debugger;
    var request = {
      profileID: formData
    }
    return this.http.post<GenericResponse<ProfileResponse[]>>(`${this.API_URL}DeleteProfile`, request)
      .pipe(map(data => <GenericResponse<ProfileResponse[]>>data));
  }


  updateProfile(formData: any): Observable<GenericResponse<ProfileResponse[]>> {
    debugger;
    var user_request = {
      profileID: formData.profileID,
      profileName: formData.profileName,
      profileDescription: formData.profileDescription,
      updatedBy: "string",
      activitiesListAdd: formData.activitiesListAdd
    }

    return this.http.post<GenericResponse<ProfileResponse[]>>(`${this.API_URL}UpdateProfile`, user_request)
      .pipe(map(data => <GenericResponse<ProfileResponse[]>>data));
  }


  createProfile(formData: any): Observable<GenericResponse<ProfileResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<ProfileResponse[]>>(`${this.API_URL}UpdateActivity`, formData)
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
