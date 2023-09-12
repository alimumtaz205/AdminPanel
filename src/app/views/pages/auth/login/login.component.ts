import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  retUrl: any;
  user_name: any;
  user_password: any;
  loginForm!: FormGroup

  // loginForm = new FormGroup({
  //   misdn: new FormControl("", [Validators.required, Validators.minLength(5)]),
  //   password: new FormControl('')
  // });

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      misdn: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.maxLength(16)]]
    });
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.retUrl = params.get('retUrl');
        console.log('LoginComponent/ngOnInit ' + this.retUrl);
      });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    debugger;
    this.user_name = this.loginForm.value.misdn,
      this.user_password = this.loginForm.value.password

    if (this.user_name == "admin" && this.user_password == "admin") {
      this.authService.login(this.user_name, this.user_password).subscribe(data => {
        console.log('return to ' + this.retUrl);
        if (this.retUrl != null) {
          this.router.navigate([this.retUrl]);
        } else {
          this.router.navigate(['/home']);
        }
      });

      this.router.navigate(['/home']);
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect username or password!',
        //footer: '<a href="">Why do I have this issue?</a>'
      })
    }

  }
}
