import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription, finalize } from 'rxjs';
import { Activity } from 'src/app/_models/Activity';
import { BaseResponseModel } from 'src/app/_models/_crud/_base.response.model';
import { AE } from 'src/app/_models/enums/audit.enum';
import { PagesEnum } from 'src/app/_models/enums/pages.enum';
import { Permission } from 'src/app/_models/permission.model';
import { ActivityService } from 'src/app/_services/activityService/activity.service';
import { AuditTrailService } from 'src/app/_services/audit-trail/audit-trail.service';
import { KtDialogService } from 'src/app/_services/kt-dialog.service';
import Swal from 'sweetalert2';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  // Public properties
  saving = false;
  testData: any;
  submitted = false;
  activityForm: FormGroup;
  activity: Activity = new Activity();
  parentActivities: Activity[] = [];
  hasFormErrors = false;
  viewLoading = false;
  loadingAfterSubmit = false;
  allPermissions$: Observable<Permission[]>;
  rolePermissions: Permission[] = [];


  // Private properties
  private componentSubscriptions: Subscription;
  form: any;
  disabled: any;
  read: boolean = false;
  layoutUtilsService: any;

  constructor(public dialogRef: MatDialogRef<AddActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //private store: Store<AppState>,
    private _activityService: ActivityService,
    private formBuilder: FormBuilder,
    //private layoutUtilsService: LayoutUtilsService,
    private ktDialogService: KtDialogService,
    private auditService: AuditTrailService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    debugger;
    this.activity.clear();

    this._activityService.getParent_Activities().subscribe(
      response => {
        console.log(response);
        debugger;
        this.parentActivities = response.data;
      }
    )

    if (this.data.activity && this.data.activity.activityID) {
      this.activity = this.data.activity;
    }

    if (this.activity.parentActivityID == 0) {
      this.read = true;
    }
    else {
      this.read = false;

    }

    this.activityForm = this.formBuilder.group({
      activityName: [this.activity.activityName, [Validators.required, Validators.maxLength(200)]],

      activityURL: [this.activity.activityURL, [Validators.required, Validators.maxLength(200)]],
      parentActivityID: [this.activity.parentActivityID],
      //isActive: [this.activity.isActive, [Validators.required]],
      //isAdmin: [this.activity.isAdmin, [Validators.required]],
      c: [this.activity.c, [Validators.required]],
      //isReadOnly: [this.activity.isReadOnly, [Validators.required]],
      r: [this.activity.r, [Validators.required]],
      u: [this.activity.u, [Validators.required]],
      d: [this.activity.d, [Validators.required]],
      //e: [this.activity.e, [Validators.required]],
      //ex: [this.activity.ex, [Validators.required]],
      activityID: [this.activity.activityID],
      checkAll: [false],
    });
    this.auditService.create(PagesEnum.activitiesUrl, 'Activity Form', AE.Navigate, true);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.activityForm.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    debugger

    this.hasFormErrors = false;
    if (this.activityForm.invalid) {
      const controls = this.activityForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }
    this.activity = Object.assign(this.activity, this.activityForm.value);
    this.submitted = true;
    this.ktDialogService.show();
    debugger;
    // update Activity
    if (this.data.activity && this.data.activity.activityID > 0) {
      debugger
      this._activityService
        .updateActivity(this.activity)
        .pipe(
          finalize(() => {
            this.submitted = false;
            this.ktDialogService.hide();
          })
        )
        .subscribe((baseResponse: any) => {
          if (baseResponse.isSuccessful === true) {
            Swal.fire(
              'Great!',
              baseResponse.message,
              'success'
            )
            //this.layoutUtilsService.alertElement("", baseResponse.message, baseResponse.code);
            this.close(this.activity);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Error message' + baseResponse.message
            })
            // this.layoutUtilsService.alertElement("", baseResponse.message, baseResponse.code);
          }

          this.auditService.create(PagesEnum.activitiesUrl, '/UserManagement/UpdateActivity', AE.Update, baseResponse.isSuccess);
        });
    }
    //Create Activity
    else {
      debugger
      this._activityService
        .createActivity(this.activity)
        .pipe(
          finalize(() => {
            this.submitted = false;
            this.ktDialogService.hide();
          })
        )
        .subscribe((baseResponse: BaseResponseModel) => {
          debugger;
          console.log('base response');
          console.log(baseResponse);
          if (baseResponse.isSuccessful === true) {
            Swal.fire(
              'Great!',
              baseResponse.message,
              'success'
            )
            //this.layoutUtilsService.alertElement("", baseResponse.message, baseResponse.responseCode);
            this.close(this.activity);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Error message' + baseResponse.message
            })
            // this.layoutUtilsService.alertElement("", baseResponse.message, baseResponse.code);
          }

          this.auditService.create(PagesEnum.activitiesUrl, '/UserManagement/AddActivity', AE.Create, baseResponse.isSuccessful);
        });
    }
  }

  get f(): any {
    return this.activityForm.controls;
  }

  toggleCheckAll(value: boolean) {
    //this.activityForm.controls['isActive'].setValue(value);
    //.activityForm.controls['isAdmin'].setValue(value);
    this.activityForm.controls['c'].setValue(value);
    this.activityForm.controls['u'].setValue(value);
    this.activityForm.controls['d'].setValue(value);
    this.activityForm.controls['r'].setValue(value);
    //this.activityForm.controls['isReadOnly'].setValue(value);
    //this.activityForm.controls['e'].setValue(value);
    //this.activityForm.controls['ex'].setValue(value);
  }

  // changeCheckbox() {
  //   if (!this.f.isActive.value && !this.f.isAdmin.value && !this.f.c.value && !this.f.r.value && !this.f.u.value && !this.f.d.value && !this.f.e.value && !this.f.ex.value && !this.f.isReadOnly.value)
  //     this.f.checkAll.setValue(false);
  //   else if (this.f.isActive.value && this.f.isAdmin.value && this.f.c.value && this.f.r.value && this.f.u.value && this.f.d.value && this.f.e.value && this.f.ex.value && this.f.isReadOnly.value)
  //     this.f.checkAll.setValue(true);
  // }

  changeCheckbox() {
    if (!this.f.c.value && !this.f.r.value && !this.f.u.value && !this.f.d.value)
      this.f.checkAll.setValue(false);
    else if (this.f.c.value && this.f.r.value && this.f.u.value && this.f.d.value && this.f.e.value)
      this.f.checkAll.setValue(true);
  }

  delete(activity: Activity): void {

    this._activityService
      .deleteActivity(activity.activityID)
      .pipe(
        finalize(() => {
          //abp.notify.success(this.l('SuccessfullyDeleted'));
        })
      )
      .subscribe(() => { });
  }

  close(result: any): void {
    this.dialogRef.close(result);
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
    if (this.componentSubscriptions) {
      this.componentSubscriptions.unsubscribe();
    }
  }

  /**
   * Returns role for save
   */
  prepareActivity(): Activity {
    const _activity = new Activity();
    _activity.activityID = this.activity.activityID;
    _activity.activityName = this.activity.activityName;
    _activity.activityURL = this.activity.activityURL;
    _activity.parentActivityID = this.activity.parentActivityID;
    _activity.isActive = this.activity.isActive;
    _activity.isAdmin = this.activity.isAdmin;
    _activity.c = this.activity.c;
    _activity.r = this.activity.r;
    _activity.u = this.activity.u;
    _activity.d = this.activity.d;
    _activity.e = this.activity.e;
    _activity.ex = this.activity.ex;
    return _activity;
  }

  onAlertClose() {
    this.hasFormErrors = false;
  }

  getTitle(): string {
    if (this.data && this.data.activity.activityID) {
      return 'Edit Activity';
    }
    return 'New Activity';
  }
}
