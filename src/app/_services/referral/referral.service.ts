import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { ReferralResponse } from 'src/app/_models/DTO/Response/ReferralResponse';
import { UniversityResponse } from 'src/app/_models/DTO/Response/UniversityResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class referralService {

  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }


  getreferrals(): Observable<GenericResponse<ReferralResponse[]>> {
    return this.http.get<GenericResponse<ReferralResponse[]>>(`${this.API_URL}Referral/GetReferral`).pipe(map(data => <GenericResponse<ReferralResponse[]>>data));
  }

  updateReferral(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Referral/UpdateReferral`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }
}
