import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  retUrl:any;
  user_name:any;
  user_password:any;

  loginForm = new FormGroup({
     misdn : new FormControl("",[Validators.required,Validators.minLength(5)]),
     password : new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) { }

  get misdn() {
    return this.loginForm.get('misdn');
  } 

  ngOnInit() {
    this.activatedRoute.queryParamMap
            .subscribe(params => {
        this.retUrl = params.get('retUrl'); 
        console.log( 'LoginComponent/ngOnInit '+ this.retUrl);
    });
}
  onSubmit():void{
    debugger;
      this.user_name = this.loginForm.value.misdn,
      this.user_password = this.loginForm.value.password

    this.authService.login(this.user_name, this.user_password).subscribe(data => {
      console.log( 'return to '+ this.retUrl);
      if (this.retUrl!=null) {
           this.router.navigate( [this.retUrl]);
      } else {
           this.router.navigate( ['home']);
      }
  });

    this.router.navigate(['/home']);

    // if(this.loginForm.value.misdn == "5555" && this.loginForm.value.password == "admin")
    // {
    //   //console.warn(this.loginForm.value);
    //   this.router.navigate(['/home']);
    // }else{
      
    // }
  
  }
}
