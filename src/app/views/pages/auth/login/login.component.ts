import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, finalize, takeUntil, tap } from 'rxjs';
import { AuthorizationService } from 'src/app/_services/_global/authorization.service';
import { UserUtilsService } from 'src/app/_services/_global/user.utils.service';
import { AuthNoticeService } from 'src/app/_services/auth-notice/auth-notice.service';
import { AuthService } from 'src/app/_services/auth.service';
import { CustomValidators } from 'src/app/core/_base/Validators/CustomValidators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  retUrl: any;
  user_name: any;
  user_password: any;
  loginForm!: FormGroup
  ipAddress: string;
  menuItems: any;
  private unsubscribe: Subject<any>;

  constructor(
    //private _userUtilsService: UserUtilsService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    //private translate: TranslateService,
    private auth: AuthorizationService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authNoticeService: AuthNoticeService
  ) { }


  ngOnInit() {
    this.initLoginForm();
    this.activatedRoute.queryParamMap
      .subscribe(params => {
        this.retUrl = params.get('retUrl');
        console.log('LoginComponent/ngOnInit ' + this.retUrl);
      });
  }


  /**
 * Form initalization
 * Default params, validators
 */
  initLoginForm() {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],

      password: [
        null,
        Validators.compose([
          Validators.required,
        ])
      ],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    debugger

    const controls = this.loginForm.controls;
    /** check form */
    var test1: any;
    if (this.loginForm.invalid) {
      debugger
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    const authData = {
      username: controls['username'].value,
      password: controls['password'].value,
      ipAddress: this.ipAddress,
      sessionID: this.randomString(30, '#aA')
      //sessionID: Date.now() + '' + (Math.floor(Math.random() * (999999 - 100000)) + 100000)

    };
    //console.log(authData);
    this.auth.login(authData.username, authData.password, authData.ipAddress, authData.sessionID.toString())
      .subscribe((resp) => {
        if (resp.isSuccessful) {
          debugger
          this.authService.callMethodOfSecondComponent(this.menuItems);
          localStorage.setItem("menuItems", JSON.stringify(resp.data.menuItems))
          localStorage.setItem("userCode", JSON.stringify(resp.data.userCode))
          localStorage.setItem("token", JSON.stringify(resp.data.token))
          localStorage.setItem("loginUserId", JSON.parse(resp.data.userId))

          this.router.navigate(['/home']);

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


  randomString(length: number, chars: string | string[]) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;

  }

  /**  
 * Checking control validation
 *
 * @param controlName: string => Equals to formControlName
 * @param validationType: string => Equals to valitors name
 */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
