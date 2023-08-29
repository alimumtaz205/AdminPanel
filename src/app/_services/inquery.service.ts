import { HttpClient } from '@angular/common/http';
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

  getPosts(): Observable<GenericResponse<InqueryResponse[]>> {
    debugger;
    return this.http.get<GenericResponse<InqueryResponse[]>>(`${this.API_URL}Inquiry/GetInquiry`).pipe(map(data => <GenericResponse<InqueryResponse[]>>data));
  }
}
