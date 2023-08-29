import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
     misdn : new FormControl(''),
     password : new FormControl('')
  });

  constructor(
    private router: Router
  ) { }

  ngOnInit(){ 
  }

  onSubmit():void{
    debugger;
    this.router.navigate(['/home']);

    // if(this.loginForm.value.misdn == "5555" && this.loginForm.value.password == "admin")
    // {
    //   //console.warn(this.loginForm.value);
    //   this.router.navigate(['/home']);
    // }else{
      
    // }
  
  }
}
