import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isloggedIn: boolean;
    private userName:any;
 
    constructor() {
        this.isloggedIn=false;
    }
 
    login(username: string, password: string) {
      debugger;
        this.isloggedIn=true;
        this.userName="admin";
        return of(this.isloggedIn);
    }
 
    isUserLoggedIn(): boolean {
        debugger;
        return this.isloggedIn;
    }
 
    isAdminUser():boolean {
        if (this.userName=='Admin') {
            return true; 
        }
        return false;
    }
    
    logoutUser(): void{
        this.isloggedIn = false;
    }
  }