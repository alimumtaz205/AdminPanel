import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Activity } from 'src/app/_models/Activity';
import { ActivityResponse } from 'src/app/_models/DTO/Response/Activity/ActivityResponse';
import { Profile } from 'src/app/_models/Profile';
import { Permission } from 'src/app/_models/permission.model';
import { ActivityService } from 'src/app/_services/activityService/activity.service';
import { ProfileService } from 'src/app/_services/profileService/profile.service';

import { delay, finalize } from 'rxjs/operators';
import { KtDialogService } from 'src/app/_services/kt-dialog.service';
import { AuditTrailService } from 'src/app/_services/audit-trail/audit-trail.service';
import { BaseResponseModel } from 'src/app/_models/_crud/_base.response.model';
import Swal from 'sweetalert2';


export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {
  dataSource = new MatTableDataSource();
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // displayedColumns = ['activityName', 'create', 'read', 'update', 'delete', 'export', 'extra'];
  displayedColumns = ['activityName', 'create', 'read', 'update', 'delete'];

  // Public properties
  loading: boolean;
  saving = false;
  submitted = false;
  profileForm: FormGroup;
  profile: Profile = new Profile();
  hasFormErrors = false;
  viewLoading = false;
  loadingAfterSubmit = false;
  allPermissions$: Observable<Permission[]>;
  rolePermissions: Permission[] = [];
  activities: Activity[];
  activitiesList: string;
  isActivityStringValid: boolean;
  gridHeight: string;
  activity_Id: number = 1;
  isDisabled: boolean;

  // Private properties
  private componentSubscriptions: Subscription;

  constructor(public dialogRef: MatDialogRef<AddProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //private store: Store<AppState>,
    private _profileService: ProfileService,
    private formBuilder: FormBuilder,
    private ktDialogService: KtDialogService,
    private _activityService: ActivityService,
    private auditService: AuditTrailService
    //private _snackBar: MatSnackBar
  ) { }


  ngOnInit() {
    debugger
    this.isActivityStringValid = true;
    this.profileForm = this.formBuilder.group({
      profileName: ['', [Validators.required, Validators.maxLength(60)]],
      profileDescription: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this._activityService.getActivities(this.activity_Id).subscribe((response) => {
      debugger;
      this.activities = response.data;
      this.dataSource.data = response.data;
      this.activities.forEach((o, i) => {
        debugger

        o.c = false;
        o.r = false;
        o.u = false;
        o.d = false;

        o.isActive = false;
        o.isAdmin = false;
        // o.e = false;
        // o.ex = false;
      });
      this.getProfile();
    });

    // this.auditService.create(PagesEnum.profilesUrl, 'Profile Form', AE.Navigate, true);
  }

  ngAfterViewInit() {
    this.gridHeight = window.innerHeight - 390 + 'px';
  }

  getProfile() {
    debugger
    if (this.data.profile && this.data.profile.profileID) {
      this.loading = true;

      this.profile = this.data.profile;
      this._profileService
        .getProfileByID(this.profile.profileID)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe((baseResponse) => {
          if (baseResponse.isSuccessful) {
            debugger;
            var userActivities = baseResponse.data;
            this.activities = userActivities;
            debugger
            console.log(baseResponse)
            var childActivities = this.activities.filter(x => 1 == 1);
            childActivities.forEach((o, i) => {
              this.activities.forEach((oo, i) => {
                if (o.activityID == oo.activityID) {
                  oo.c = o.c;
                  oo.r = o.r;
                  oo.u = o.u;
                  oo.d = o.d;
                  oo.e = o.e;
                  oo.ex = o.ex;
                }
              });
              this.changeActivityItemCheckbox(o.activityID);
            });

            this.profileForm.controls['profileName'].setValue(this.profile.profileName);
            this.profileForm.controls['profileDescription'].setValue(this.profile.profileDescription);
          }
          else {
            //  this.layoutUtilsService.alertElement("", baseResponse.message, baseResponse.code);
          }

          // this.auditService.create(PagesEnum.profilesUrl, '/UserManagement/GetProfileByID', AE.Get, baseResponse.isSuccess);
        });
    }
  }

  cbti(value: boolean) {
    if (value)
      return '1';
    return '0';
  }

  // private addCheckboxes() {
  //   this.activities.forEach((o, i) => {
  //     const control = new FormControl(); // if first item set to true, else false
  //     (this.profileForm.controls.orders as FormArray).push(control);
  //   });
  // }

  hasError(controlName: string, errorName: string): boolean {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  changeActivityCheckbox(activityId: number, value: boolean) {

    debugger;
    this.isActivityStringValid = true;
    var activity = this.activities.filter(x => x.activityID == activityId)[0];

    if (activity.parentActivityID == 0) {
      var childActivities = this.activities.filter(x => x.parentActivityID == activityId);
      childActivities.forEach((o, i) => {
        this.activities.forEach((oo, i) => {
          if (oo.activityID == o.activityID) {
            oo.c = value;
            oo.r = value;
            oo.u = value;
            oo.d = value;
            // oo.e = value;
            // oo.ex = value;
            oo.isActivityChecked = value;
          }
        })
      });
      {
        this.activities.forEach((o, i) => {
          if (o.activityID == activityId) {
            o.c = false;
            o.r = false;
            o.u = false;
            o.d = false;
            // o.e = value;
            // o.ex = value;
          }
        });
        this.checkParentActivityCheckbox(activityId);
      }
    }
    // else {
    {
      this.activities.forEach((o, i) => {
        if (o.activityID == activityId) {
          o.c = value;
          o.r = value;
          o.u = value;
          o.d = value;
          // o.e = value;
          // o.ex = value;
        }
      });
      this.checkParentActivityCheckbox(activityId);
    }

  }

  changeActivityItemCheckbox(activityId: number) {
    debugger
    this.isActivityStringValid = true;
    var parent = this.activities.filter(x => x.activityID == activityId)[0];

    this.activities.forEach((o, i) => {
      if (o.activityID == activityId) {
        if (o.c == true || o.r == true || o.u == true || o.d == true) {
          o.isActivityChecked = true;
          parent.isActivityChecked = true;
        }
        else {
          o.isActivityChecked = false;
        }
      }
    });
    this.checkParentActivityCheckbox(activityId);
  }

  checkParentActivityCheckbox(activityId: number) {
    debugger;
    var parentActivityId = this.activities.filter(x => x.activityID == activityId)[0].parentActivityID;
    var isParentChecked = false;
    var childActivities = this.activities.filter(x => x.parentActivityID == parentActivityId);
    childActivities.forEach((o, i) => {
      if (o.isActivityChecked == true)
        isParentChecked = true;
    });

    this.activities.forEach((o, i) => {
      if (o.activityID == parentActivityId) {
        o.isActivityChecked = isParentChecked;
      }
    });
  }

  onSubmit(): void {
    debugger

    console.log(this.activities);
    this.hasFormErrors = false;
    if (this.profileForm.invalid) {
      const controls = this.profileForm.controls;
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      return;
    }
    debugger
    this.profile = Object.assign(this.profile, this.profileForm.value);

    this.activitiesList = '';
    this.activities.forEach((o, i) => {
      // if (o.parentActivityID != 0 && (o.c == true || o.r == true || o.u == true || o.d == true || o.e == true || o.ex == true))
      if ((o.c == true || o.r == true || o.u == true || o.d == true))

        this.activitiesList = this.activitiesList + '' + (o.parentActivityID.toString() + ',' + o.activityID.toString() + ',' + this.cbti(o.c) + ',' + this.cbti(o.r) + ',' + this.cbti(o.u) + ',' + this.cbti(o.d) + '|');
    });

    this.activitiesList = this.activitiesList.substring(0, this.activitiesList.length - 1);
    if (this.activitiesList == '') {
      this.isActivityStringValid = false;
      return;
    }
    else {
      this.isActivityStringValid = true;
    }
    this.profile.activitiesList = this.activitiesList;
    this.submitted = true;
    this.ktDialogService.show();
    if (this.data.profile && this.data.profile.profileID > 0) {
      this.profile.activitiesListAdd = this.profile.activitiesList;
      this.profile.activitiesListDelete = '';

      this._profileService
        .updateProfile(this.profile)
        .pipe(
          finalize(() => {
            this.submitted = false;
            this.ktDialogService.hide();
          })
        )
        .subscribe((baseResponse) => {
          if (baseResponse.isSuccessful === true) {
            //this.layoutUtilsService.alertElement("", baseResponse.message, baseResponse.code);
            this.close(this.profile);
          }
          else {
            //this.layoutUtilsService.alertElement("", baseResponse.message, baseResponse.code);
          }

          //this.auditService.create(PagesEnum.profilesUrl, '/UserManagement/UpdateProfile', AE.Update, baseResponse.isSuccess);
        });
    }
    else {
      this._profileService
        .addProfile(this.profile)
        .pipe(
          finalize(() => {
            this.submitted = false;
            this.ktDialogService.hide();
          })
        )
        .subscribe((baseResponse) => {
          if (baseResponse.isSuccessful === true) {
            Swal.fire(
              'Great!',
              baseResponse.message,
              'success'
            )
            this.dialogRef.close('add');
            this.close(this.profile);
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'Error message' + baseResponse.message
            })
          }

          // this.auditService.create(PagesEnum.profilesUrl, '/UserManagement/AddProfile', AE.Create, baseResponse.isSuccess);
        });
    }

  }

  delete(profile: Profile): void {

    this._profileService
      .deleteProfile(profile.profileID)
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
  prepareProfile(): Profile {
    const _profile = new Profile();
    _profile.profileID = this.profile.profileID;
    _profile.profileName = this.profile.profileName;
    _profile.profileDescription = this.profile.profileDescription;
    _profile.channel = this.profile.channel;
    _profile.activitiesList = this.profile.activitiesList;

    return _profile;
  }

  onAlertClose() {
    this.hasFormErrors = false;
  }

  getTitle(): string {
    if (this.data.profile && this.data.profile.profileID) {
      return 'Edit Profile';
    }
    return 'New Profile';
  }

}
