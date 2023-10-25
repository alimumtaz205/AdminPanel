import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericResponse } from '../_models/DTO/Response/GenericResponse';
import { InqueryResponse } from '../_models/DTO/Response/InqueryResponse';

@Injectable({
  providedIn: 'root'
})
export class InqueryService {
  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }


  getPosts(Id:any): Observable<GenericResponse<InqueryResponse[]>> {
    debugger;
    var user_Id = {
      userId:Id
    }
  //  let header = new HttpHeaders().set( "Authorization", "bearer" + token );

    return this.http.post<GenericResponse<InqueryResponse[]>>(`${this.API_URL}Inquiry/GetInquiryPortal`, user_Id).pipe(map(data => <GenericResponse<InqueryResponse[]>>data));
  }


  
  updateInquery(formData: any): Observable<GenericResponse<any[]>> {
      debugger;
      return this.http.post<GenericResponse<any[]>>(`${this.API_URL}Inquiry/UpdateInquiry`, formData)
        .pipe(map(data => <GenericResponse<any[]>>data));
    }

    GetProfileApp(Email:any): Observable<GenericResponse<InqueryResponse[]>> {
      debugger;
      return this.http.post<GenericResponse<InqueryResponse[]>>(`${this.API_URL}ProfileManagment/GetProfileApp`, Email).pipe(map(data => <GenericResponse<InqueryResponse[]>>data));
    }

    GetAcademicApp(Email:any): Observable<GenericResponse<any[]>> {
      debugger;
      return this.http.post<GenericResponse<any[]>>(`${this.API_URL}ProfileManagment/GetAcademicApp`, Email).pipe(map(data => <GenericResponse<InqueryResponse[]>>data));
    }

    GetWorkApp(Email:any): Observable<GenericResponse<any[]>> {
      debugger;
      return this.http.post<GenericResponse<any[]>>(`${this.API_URL}ProfileManagment/GetWorkDetailsApp`, Email).pipe(map(data => <GenericResponse<InqueryResponse[]>>data));
    }
}
