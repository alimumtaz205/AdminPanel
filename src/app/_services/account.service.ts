import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_URL = environment.API_URL;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  login(msidn: string, password: string) {
    debugger;
    return this.http.post<User>(`${environment.API_URL}/users/authenticate`, { msidn, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  changePassword(data: any): Observable<any> {
    debugger;
    var requestData = {
      userCode: data.userCode,
      oldPassword: data.old_password,
      newPassword: data.new_password,
      confirmNewPassword: data.confirm_password
    }
    debugger;
    return this.http.post(`${this.API_URL}UserManagment/ChangePassword`, requestData)
      .pipe(
        map((response: any) => {
          debugger
          return response;
        })
      );
  }
}
