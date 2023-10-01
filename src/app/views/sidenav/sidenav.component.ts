import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  menuItems: any;
  menuItems1: any;


  constructor(private authService: AuthService) {
    this.authService.invokeEvent.subscribe(value => {
      debugger;
      // if (value != "") {
      //   debugger;
      this.menuItems = value;
      //this.pupulateMenuItem();
      //}
    });
  }

  ngOnInit(): void {
    debugger
    this.menuItems1 = localStorage.getItem("menuItems")
    //this.menuItems1 = this.menuItems;
    console.log("menu item test", this.menuItems1)
    this.menuItems = JSON.parse(this.menuItems1);



    // this.menuItems1 = [{ "name": "Student", "link": "/student", "icon": "M11.3333 6.16667C11.3333 8.25389 9.64278 9.94444 7.55556 9.94444C5.46833 9.94444 3.77778 8.25389 3.77778 6.16667L3.88167 5.27889L0.944444 3.80556L7.55556 0.5L14.1667 3.80556V8.52778H13.2222V4.27778L11.2294 5.27889L11.3333 6.16667ZM7.55556 11.8333C11.73 11.8333 15.1111 13.5239 15.1111 15.6111V17.5H0V15.6111C0 13.5239 3.38111 11.8333 7.55556 11.8333Z" },
    // { "name": "Staff", "link": "/", "icon": "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" }, { "name": "University Management", "link": "/student" },
    // { "name": "Country Management", "link": "/" }, { "name": "Subject Management", "link": "/" },
    // { "name": "Course Management", "link": "/" }, { "name": "University Management", "link": "/" },
    // { "name": "Reports", "link": "/" }, { "name": "Activity", "link": "/app-activity" },];

    // console.log("menu item 1", this.menuItems1)
  }

  pupulateMenuItem() {
    debugger
    //this.menuItems = 
  }

}
