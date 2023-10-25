import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuditActionReportResponse } from 'src/app/_models/DTO/Response/AuditActionReportResponse';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { UserResponse } from 'src/app/_models/DTO/Response/User/UserResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditActionReportService {
  private API_URL = environment.API_URL + "Report/";

  constructor(private http: HttpClient) { }

  GetReport(userId:number): Observable<GenericResponse<AuditActionReportResponse[]>> {
    var user_Id={
      userId:userId
    }
    return this.http.post<GenericResponse<AuditActionReportResponse[]>>(`${this.API_URL}GetAuditActionReport`,user_Id)
      .pipe(map(data => <GenericResponse<AuditActionReportResponse[]>>data));
  }

}
