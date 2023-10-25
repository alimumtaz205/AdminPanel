import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { UniversityResponse } from 'src/app/_models/DTO/Response/UniversityResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class subjectService {

  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }

  getsubjects(CourseID:number): Observable<GenericResponse<UniversityResponse[]>> {
    var courseID={
      courseID: CourseID 
    }

    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/GetSubjects`, courseID)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }

   deletesubjects(SubjectID:number): Observable<GenericResponse<UniversityResponse[]>> {
    var subjectID={
      subjectID: SubjectID 
    }
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/DeleteSubject`, subjectID)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }


  addsubjects(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/AddSubject`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }

  updatesubjects(formData:any): Observable<GenericResponse<UniversityResponse[]>> {
    return this.http.post<GenericResponse<UniversityResponse[]>>(`${this.API_URL}Lov/UpdateSubject`, formData)
    .pipe(map(data => <GenericResponse<UniversityResponse[]>>data));
  }
}
