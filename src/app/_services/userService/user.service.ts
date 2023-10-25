import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { UserResponse } from 'src/app/_models/DTO/Response/User/UserResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL + "UserManagment/";

  constructor(private http: HttpClient) { }

  GetUsers(): Observable<GenericResponse<UserResponse[]>> {
    return this.http.get<GenericResponse<UserResponse[]>>(`${this.API_URL}GetUsers`)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }

  GetUsersTypes(): Observable<GenericResponse<UserResponse[]>> {
    return this.http.get<GenericResponse<UserResponse[]>>(`${this.API_URL}GetUserTypes`)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }

  getProfileByID(formData: any): Observable<GenericResponse<UserResponse[]>> {
    debugger;
    var profileID = {
      profileID: formData
    }
    return this.http.post<GenericResponse<UserResponse[]>>(`${this.API_URL}GetProfileByID`, profileID)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }

  addUser(formData: any): Observable<GenericResponse<UserResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<UserResponse[]>>(`${this.API_URL}AddNewUser`, formData)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }

  deleteUser(formData: any): Observable<GenericResponse<UserResponse[]>> {
    debugger;
    var request = {
      userId: formData
    }
    return this.http.post<GenericResponse<UserResponse[]>>(`${this.API_URL}DeleteUser`, request)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }


  updateUser(formData: any): Observable<GenericResponse<UserResponse[]>> {
    debugger;
    var user_request = {
      userId: formData.userId,
      userName: formData.userName,
      profileID: formData.profileID,
      userCode: "string",
      emailAddress: formData.emailAddress,
      mobileNo: formData.mobileNo,
      userTypeId: formData.userTypeId,
      cityId: formData.cityId,
      BranchId: formData.branchId,
      address: formData.address
    }

    return this.http.post<GenericResponse<UserResponse[]>>(`${this.API_URL}UpdateUser`, user_request)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }


  createProfile(formData: any): Observable<GenericResponse<UserResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<UserResponse[]>>(`${this.API_URL}UpdateActivity`, formData)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }

  updateActivity(formData: any): Observable<GenericResponse<UserResponse[]>> {
    debugger;
    return this.http.post<GenericResponse<UserResponse[]>>(`${this.API_URL}UpdateActivity`, formData)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }

}
