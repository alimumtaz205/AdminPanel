import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuthenticate: boolean = false;

    login(token: string, userId: string): Observable<boolean> {
        debugger;
        userId = JSON.parse(localStorage.getItem("loginUserId") || '{}');
        token = JSON.parse(localStorage.getItem('token') || '{}');
        if (userId.length > 0 && token.length > 0) {
            this.isAuthenticate = true;
            return of(true);
        }
        return of(false);
    }
}