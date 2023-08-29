import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: ' <div class="main-container"> <app-sidenav></app-sidenav> <div class="main-content"><app-header></app-header><router-outlet></router-outlet></div></div>',
  styleUrls: []
})
export class HomeLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
