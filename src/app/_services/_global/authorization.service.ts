import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { LoginResponse } from 'src/app/_models/_crud/login-response';
import { UserUtilsService } from './user.utils.service';
import { HttpUtilsService } from './http-utils.service';
import { environment } from 'src/environments/environment';
import { BaseResponseModel } from 'src/app/_models/_crud/_base.response.model';
import { User } from 'src/app/_models/user';
import { UserInfoModel } from 'src/app/_models/_userInfo.model';
import { Permission } from 'src/app/_models/permission.model';
import { QueryParamsModel } from 'src/app/_models/query-models/query-params.model';
import { QueryResultsModel } from 'src/app/_models/query-models/query-results.model';
import { Role } from 'src/app/_models/role.model';
import { GenericResponse } from 'src/app/_models/DTO/Response/GenericResponse';

const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthorizationService {
  private currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;
  private API_URL = environment.API_URL_AUTHENTICATION;

  constructor(private http: HttpClient, private httpUtils: HttpUtilsService) {
    var userUtilService = new UserUtilsService();
    var data = userUtilService.getUserDetails();
    //var data = localStorage.getItem(environment.userInfoKey);
    if (data != undefined) {
      this.currentUserSubject = new BehaviorSubject<LoginResponse>(data);
      //this.currentUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(data));
      this.currentUser = this.currentUserSubject.asObservable();
    }

  }
  // Authentication/Authorization
  //login(email: string, password: string): Observable<User> {
  //    return this.http.post<User>(API_USERS_URL, { email, password });
  //}

  login(loginID: string, password: string, ipAddress: string, sessionID: string): Observable<LoginResponse> {
    debugger;
    var requestData = {
      username: loginID,
      password: password,
    }
    debugger;
    return this.http.post(`${this.API_URL}Login/Login`, requestData)
      .pipe(
        map((response: any) => {
          //this.currentUserSubject.next(user:User);
          debugger
          return response;
        })
      );
  }

  // login2(loginID: string, password: string, ipAddress: string, sessionID: string): Observable<LoginResponse> {
  //   debugger;
  //   return this.http.post(`${environment.API_URL_AUTHENTICATION}Login/Login`,
  //     {
  //       username: loginID,
  //       password: password,
  //       //ipAddress: ipAddress,
  //       //sessionID: sessionID
  //     },
  //     { headers: this.httpUtils.getHTTPHeaders() }).pipe(
  //       map((response: any) => {
  //         //this.currentUserSubject.next(user:User);
  //         debugger
  //         return response;
  //       })
  //     );
  // }

  getToken(): string {
    return this.currentUserSubject.value.token;
  }

  public get currentUserValue(): LoginResponse {
    return this.currentUserSubject.value;
  }

  logout() {

    // remove user from local storage to log user out
    var userUtilService = new UserUtilsService();
    debugger;
    userUtilService.removeUserDetails();
    //localStorage.removeItem(environment.userInfoKey);
    this.currentUserSubject.next(null as any);

  }

  verifyOTP(otp: number): Observable<BaseResponseModel> {

    debugger;
    var userInfo = this.httpUtils.getUserInfo();
    userInfo.activity = 'ValidateOTP';
    return this.http.post(`${environment.API_URL}/Account/ValidateOTP`, { userInfo: userInfo, otp: otp },
      { headers: this.httpUtils.getHTTPHeaders() }).pipe(
        map((res: any) => res)
      );
  }

  resendOTP(): Observable<BaseResponseModel> {

    var userService = new UserUtilsService();
    var user = userService.getUserDetails();
    var userInfo = this.httpUtils.getUserInfo();
    userInfo.activity = 'RGenerateOTP';
    debugger;
    return this.http.post(`${environment.API_URL}/Account/RGenerateOTP`, { userInfo: userInfo, userCode: user.userCode },
      { headers: this.httpUtils.getHTTPHeaders() }).pipe(
        map((res: any) => res)
      );
  }

  public getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  getUserByToken(): Observable<User> {
    const userToken = 'xyz';
    //const userToken = localStorage.getItem(environment.authTokenKey);
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<User>(API_USERS_URL, { headers: httpHeaders });
  }

  register(user: User): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders })
      .pipe(
        map((res: User) => {
          return res;
        }),
        catchError(err => {
          return null as any;
        })
      );
  }

  public requestPassword(email: string): Observable<any> {
    return this.http.get(API_USERS_URL + '/forgot?=' + email)
      .pipe(catchError(this.handleError('forgot-password', []))
      );
  }

  requestPasswordReset(email: string): Observable<BaseResponseModel> {
    //var userInfo = this.httpUtils.getUserInfo();
    var userInfo = new UserInfoModel();
    userInfo.activity = 'GetTemporaryPassword';
    debugger;
    return this.http.post(`${environment.API_URL}/Account/GetTemporaryPassword`,
      { userInfo: userInfo, userCode: email },
      { headers: this.httpUtils.getHTTPHeaders() }).pipe(
        map((res: any) => res)
      );
  }

  resetPassword(userCode: string, oldPassword: string, newPassword: string, confirmNewPassword: string): Observable<BaseResponseModel> {
    var userInfo = this.httpUtils.getUserInfo();
    userInfo.activity = 'ChangePassword';
    return this.http.post(`${environment.API_URL}/Account/ChangePassword`,
      { userInfo: userInfo, userCode: userCode, oldPassword: oldPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword },
      { headers: this.httpUtils.getHTTPHeaders() }).pipe(
        map((res: any) => res)
      );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API_USERS_URL);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(API_USERS_URL + `/${userId}`);
  }


  // DELETE => delete the user from the server
  deleteUser(userId: number) {
    const url = `${API_USERS_URL}/${userId}`;
    return this.http.delete(url);
  }

  // UPDATE => PUT: update the user on the server
  updateUser(_user: User): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_USERS_URL, _user, { headers: httpHeaders });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: User): Observable<User> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders });
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, { headers: httpHeaders });
  }

  // Permission
  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(API_PERMISSION_URL);
  }

  getRolePermissions(roleId: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
  }

  // Roles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(API_ROLES_URL);
  }

  getRoleById(roleId: number): Observable<Role> {
    return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
  }

  // CREATE =>  POST: add a new role to the server
  createRole(role: Role): Observable<Role> {
    // Note: Add headers if needed (tokens/bearer)
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders });
  }

  // UPDATE => PUT: update the role on the server
  updateRole(role: Role): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_ROLES_URL, role, { headers: httpHeaders });
  }

  // DELETE => delete the role from the server
  deleteRole(roleId: number): Observable<Role> {
    const url = `${API_ROLES_URL}/${roleId}`;
    return this.http.delete<Role>(url);
  }

  // Check Role Before deletion
  isRoleAssignedToUsers(roleId: number): Observable<boolean> {
    return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
  }

  findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, { headers: httpHeaders });
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
