import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityResponse } from 'src/app/_models/DTO/Response/Activity/ActivityResponse';
import { ActivityService } from 'src/app/_services/activityService/activity.service';
import { ProfileService } from 'src/app/_services/profileService/profile.service';
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
  public headerText: any = "Add Profile";
  public buttonText: any = "Add";
  suctask_check: any[] | undefined;
  selected_activity = 'none';
  parent_activity: any;
  activity_id: string = "1";
  create: boolean = false;
  read: boolean = false;
  update: boolean = false;
  delete: boolean = false;
  loading: boolean;
  activity_name: any;
  profileName: any;
  profileDescription: any;
  dataSource: any;
  parentActivityID: boolean = false;
  isActivityStringValid: boolean = false;
  displayedColumns: string[] =
    ['activityName', 'create', 'read', 'update', 'delete', 'export'];

  clickedRows = new Set<ActivityResponse>();
  activityListModel: any[] = [
  ];
  addProfileForm!: FormGroup
  task: Task = {
    name: 'All',
    completed: false,
    subtasks: [
      { name: 'C', completed: false },
      { name: 'R', completed: false },
      { name: 'U', completed: false },
      { name: 'D', completed: false },
    ],
  };
  subtask: any;
  sort: any;
  gridHeight: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private service: ProfileService,
    private dialogRef: MatDialogRef<AddProfileComponent>
  ) { }

  ngOnInit(): void {

    this.addProfileForm = this.formBuilder.group({
      profile_name: ['', [Validators.required, Validators.maxLength(60)]],
      profile_description: ['', [Validators.required, Validators.maxLength(200)]],
      select_all: [''],
      create: [''],
      read: [''],
      update: [''],
      delete: [''],
      export: [''],
      //activities_list: ['']
    });
    if (this.editData) {
      debugger;
      this.headerText = this.editData.header_text,
        this.buttonText = "Update"
      this.addProfileForm.controls['profile_name'].setValue(this.editData.activityDetails.activityName);
      this.addProfileForm.controls['profile_description'].setValue(this.editData.activityDetails.parentActivityName);
      this.addProfileForm.controls['activities_list'].setValue(this.editData.activityDetails.activityURL);
    }
    this.getActivities(1)
  }

  ngAfterViewInit() {
    this.gridHeight = window.innerHeight - 390 + 'px';
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.addProfileForm.controls[controlName].hasError(errorName);
  }

  changeActivityItemCheckbox(activityId: number) {
    debugger
    // this.isActivityStringValid = true;
    // var parent = this.activities.filter(x => x.activityID == activityId)[0];

    // this.activities.forEach((o, i) => {
    //   if (o.activityID == activityId) {
    //     if (o.c == true || o.r == true || o.u == true || o.d == true || o.e == true || o.ex == true) {
    //       o.isActivityChecked = true;
    //       parent.isActivityChecked = true;
    //     }
    //     else {
    //       o.isActivityChecked = false;
    //     }
    //   }
    // });
    // this.checkParentActivityCheckbox(activityId);
  }

  changeActivityCheckbox(activityId: number, value: boolean) {

    // console.log("Hamza Parus ")
    // debugger;
    // this.isActivityStringValid = true;
    // var activity = this.activities.filter(x => x.activityID == activityId)[0];
    // if (activity.parentActivityID == 0) {
    //   var childActivities = this.activities.filter(x => x.parentActivityID == activityId);
    //   childActivities.forEach((o, i) => {
    //     console.log('Hi');
    //     this.activities.forEach((oo, i) => {
    //       if (oo.activityID == o.activityID) {
    //         oo.c = value;
    //         oo.r = value;
    //         oo.u = value;
    //         oo.d = value;
    //         oo.e = value;
    //         oo.ex = value;
    //         oo.isActivityChecked = value;
    //       }
    //     })
    //   });
    // }
    // else {
    //   this.activities.forEach((o, i) => {
    //     if (o.activityID == activityId) {
    //       o.c = value;
    //       o.r = value;
    //       o.u = value;
    //       o.d = value;
    //       o.e = value;
    //       o.ex = value;
    //     }
    //   });
    //   this.checkParentActivityCheckbox(activityId);
    // }

  }
  getActivities(ID: any) {
    debugger;

    this.activityService.getActivities(ID)
      .subscribe({
        next: (resp) => {
          if (resp.isSuccessful) {
            debugger;
            this.dataSource = new MatTableDataSource(resp.data);
            this.dataSource.sort = this.sort;
          }
          else {
            debugger;
          }
          console.error();

        }
      });
  }
  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {

    this.suctask_check = this.task.subtasks;

    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    debugger
    this.allComplete = completed;

    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }


  onSubmit() {
    debugger;
    if (this.addProfileForm.valid) {
      if (!this.editData) {

        this.profileName = this.addProfileForm.value.profile_name;
        this.profileDescription = this.addProfileForm.value.profile_description
        this.addProfile(this.profileName, this.profileDescription);
      }
      else {
        //this.updateUniversity();
      }
    }
  }

  addProfile(profileName: any, profileDescription: any) {
    debugger
    if (this.allComplete) {
      this.create = true;
      this.read = true;
      this.update = true;
      this.delete = true;
    }
    else {
      for (var item in this.suctask_check) {
        this.create = this.suctask_check[0].completed;
        this.read = this.suctask_check[1].completed;
        this.update = this.suctask_check[2].completed;
        this.delete = this.suctask_check[3].completed;
      }
    }

    this.parent_activity = this.addProfileForm.value.parent_activity;
    if (this.parent_activity === "") {
      this.parent_activity = 0
    }

    var formData = {
      profileName: profileName,
      profileDescription: profileDescription,
      activitiesList: "",
    }

    this.service.addProfile(formData).subscribe((resp) => {
      if (resp.isSuccessful) {
        //this.countryListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addProfileForm.reset();
        this.dialogRef.close('add');
      }
      else {
        debugger;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Error message' + resp.message
        })
      }
    });
  }

}
