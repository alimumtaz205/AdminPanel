import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CourseResponse } from 'src/app/_models/DTO/Response/CourseResponse';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {


  private API_URL= environment.API_URL;

  constructor(private http:HttpClient) { }

  getCourses(UniversityID:number): Observable<GenericResponse<CourseResponse[]>> {
    var universityID={
      universityID:UniversityID
    }
    return this.http.post<GenericResponse<CourseResponse[]>>(`${this.API_URL}Lov/GetCourses`, universityID)
    .pipe(map(data => <GenericResponse<CourseResponse[]>>data));
  }

  deleteCourses(courseID:number): Observable<GenericResponse<CourseResponse[]>> {
    var CourseID={
      CourseID:courseID
    }
    return this.http.post<GenericResponse<CourseResponse[]>>(`${this.API_URL}Lov/DeleteCourse`, CourseID)
    .pipe(map(data => <GenericResponse<CourseResponse[]>>data));
  }

  addCounse(formData:any): Observable<GenericResponse<CourseResponse[]>> {
    return this.http.post<GenericResponse<CourseResponse[]>>(`${this.API_URL}Lov/AddCourse`, formData)
    .pipe(map(data => <GenericResponse<CourseResponse[]>>data));
  }

  updateCourse(formData:any): Observable<GenericResponse<CourseResponse[]>> {
    return this.http.post<GenericResponse<CourseResponse[]>>(`${this.API_URL}Lov/UpdateCourse`, formData)
    .pipe(map(data => <GenericResponse<CourseResponse[]>>data));
  }
}
