import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

    private API_URL= environment.API_URL;
  
    constructor(private http:HttpClient) { }
  
    getBranches(data:any): Observable<GenericResponse<any[]>> {
      debugger;
      var request = {
        cityID: data
      }
      return this.http.post<GenericResponse<any[]>>(`${this.API_URL}Lov/GetBranches`, request)
        .pipe(map(data => <GenericResponse<any[]>>data)); 
    }
  
     deletebranch(BranchID:string): Observable<GenericResponse<any[]>> {
  
      var branchID={
        branchID: BranchID 
      }
     
      return this.http.post<GenericResponse<any[]>>(`${this.API_URL}Lov/DeleteBranch`, branchID)
      .pipe(map(data => <GenericResponse<any[]>>data));
    }
  
  
    addbranch(formData:any): Observable<GenericResponse<any[]>> {
      return this.http.post<GenericResponse<any[]>>(`${this.API_URL}Lov/AddBranch`, formData)
      .pipe(map(data => <GenericResponse<any[]>>data));
    }
  
    updatebranch(formData:any): Observable<GenericResponse<any[]>> {
      return this.http.post<GenericResponse<any[]>>(`${this.API_URL}Lov/UpdateBranch`, formData)
      .pipe(map(data => <GenericResponse<any[]>>data));
    }
  }
  
