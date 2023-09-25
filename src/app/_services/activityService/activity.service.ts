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
import { Activity } from 'src/app/_models/Activity';
import { UserUtilsService } from '../_global/user.utils.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  private API_URL = environment.API_URL + "UserManagment/";
  httpUtils: any;

  constructor(private http: HttpClient) { }

  getActivities(activity_ID: any): Observable<GenericResponse<ActivityResponse[]>> {
    debugger;
    var activityID = {
      activityID: activity_ID
    }
    return this.http.post<GenericResponse<ActivityResponse[]>>(`${this.API_URL}GetActivities`, activityID)
      .pipe(map(data => <GenericResponse<ActivityResponse[]>>data));
  }

  getAllActivities(): Observable<BaseResponseModel> {
    var userInfo = this.httpUtils.getUserInfo();
    userInfo.activity = PagesEnum.activitiesUrl;
    debugger;
    return this.http.post(`${environment.API_URL}/UserManagement/GetActivities`,
      //	{ userInfo: userInfo, activityID: "0", channel: this.userUtilsService.getUserDetails().channelID },
      { headers: this.httpUtils.getHTTPHeaders() }).pipe(

        map((res: any) => res)

      );
  }

  createActivity(activity: Activity): Observable<BaseResponseModel> {
    debugger;
    var reqData = {
      activityID: activity.activityID,
      activityName: activity.activityName,
      parentActivityID: activity.parentActivityID,
      activityURL: activity.activityURL,
      c: activity.c,
      r: activity.r,
      u: activity.u,
      d: activity.d
    }

    // var userInfo = this.httpUtils.getUserInfo();
    // userInfo.activity = PagesEnum.activitiesUrl;
    // activity.userInfo = userInfo;
    //activity.channelId = this.userUtilsService.getUserDetails().channelID;;

    return this.http.post(`${this.API_URL}AddActivity`, reqData,
    ).pipe(
      map((res: any) => res)
    );
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

  getParent_Activities(): Observable<GenericResponse<ActivityResponse[]>> {
    debugger;
    return this.http.get<GenericResponse<ActivityResponse[]>>(`${this.API_URL}GetParentActivities`)
      .pipe(map(data => <GenericResponse<ActivityResponse[]>>data));
  }

  deleteActivity(formData: any): Observable<GenericResponse<ActivityResponse[]>> {
    debugger;
    var request = {
      activityID: formData
    }
    return this.http.post<GenericResponse<ActivityResponse[]>>(`${this.API_URL}DeleteActivity`, request)
      .pipe(map(data => <GenericResponse<ActivityResponse[]>>data));
  }
}