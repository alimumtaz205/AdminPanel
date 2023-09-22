import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    value: any = null;
    user = new BehaviorSubject<User>(this.value);

    private tokenExpirationTimer: any;

    isAuthenticate: boolean = false;
    /**
     *
     */
    constructor(
        private http: HttpClient,
        private router: Router
    ) {

    }

    gettoken() {
        return !!localStorage.getItem("token");
    }

    Logout() {
        localStorage.removeItem('token');
        // localStorage.clear();
        this.router.navigateByUrl("/login");
    }
    // }  

    // authenticateUser(): Observable<boolean> {
    //     debugger;
    //     var userId = JSON.parse(localStorage.getItem("loginUserId") || '{}');
    //     var token = JSON.parse(localStorage.getItem('token') || '{}');
    //     if (userId.length > 0 && token.length > 0) {
    //         this.isAuthenticate = true;
    //         return of(true);
    //     }
    //     return of(false);
    // }

}