import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm!: FormGroup

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {

    this.changePassForm = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.changePassForm.controls[controlName].hasError(errorName);
  }


  onSubmit() {
    debugger
    const controls = this.changePassForm.controls;
    if (this.changePassForm.invalid) {
      debugger
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    const authData = {
      userCode: JSON.parse(localStorage.getItem('userCode') as string),
      old_password: controls['old_password'].value,
      new_password: controls['new_password'].value,
      confirm_password: controls['confirm_password'].value
    };

    this.accountService.changePassword(authData)
      .subscribe((resp) => {
        if (resp.isSuccessful) {
          localStorage.removeItem('token');
          localStorage.removeItem('userCode');

          Swal.fire({
            title: 'Success',
            text: resp.message,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Great!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          })
        }
        else {
          debugger
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: resp.message,
            //footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      });

  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.changePassForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
