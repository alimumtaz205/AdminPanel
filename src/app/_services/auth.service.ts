import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    invokeEvent: Subject<any> = new Subject();
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private http: HttpClient, private router: Router) {
        this.userSubject = new BehaviorSubject<User>(
            JSON.parse(localStorage.getItem('token') as string)
        );
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    callMethodOfSecondComponent(Data: any) {
        debugger;
        // this.someValue = "someVal";
        this.invokeEvent.next(Data)
    }

    gettoken() {
        return !!localStorage.getItem("token");
    }

    Logout() {
        localStorage.removeItem('token');
        // localStorage.clear();
        this.router.navigateByUrl("/login");
    }

    setMenuItems(items: any) {

    }

}