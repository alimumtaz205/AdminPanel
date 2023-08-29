import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {
  title = 'APanel';
  isLogin: boolean | undefined;

  constructor (private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.isLogin= true;
        } else {
          this.isLogin= false;
        }
      }
    });
  }

}

