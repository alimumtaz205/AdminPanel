import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  header_text: any = "Dashboard";

  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut() {
    debugger;
    this.authService.Logout();
  }
}
