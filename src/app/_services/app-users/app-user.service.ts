import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { UserResponse } from 'src/app/_models/DTO/Response/User/UserResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class appUserService {
  private API_URL = environment.API_URL + "UserManagment/";

  constructor(private http: HttpClient) { }

  GetAppUsers(): Observable<GenericResponse<UserResponse[]>> {
    return this.http.get<GenericResponse<UserResponse[]>>(`${this.API_URL}GetAppUsers`)
      .pipe(map(data => <GenericResponse<UserResponse[]>>data));
  }


}
