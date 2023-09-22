import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private route: Router) { }

  canActivate(): boolean {


    if (!this.authService.gettoken()) {
      this.route.navigateByUrl("/login");
    }
    return this.authService.gettoken();

    //   if(this.authService.authenticateUser()
    //     .subscribe({
    //       next: (resp) => {
    //         if (resp) {
    //           return true;
    //         }
    //         else {
    //         }
    //         console.error();
    //         return false;
    //       }
    //     });

  }

}
