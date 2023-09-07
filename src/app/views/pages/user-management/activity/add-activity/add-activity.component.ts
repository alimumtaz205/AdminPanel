import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityService } from 'src/app/_services/activityService/activity.service';
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
  public headerText: any = "Add Activity";
  public buttonText: any = "Add";
  c_checked = false;
  selected_activity = 'none';
  parent_activity: any;
  activity_id: string = "1";
  create: boolean = false;
  read: boolean = false;
  update: boolean = false;
  delete: boolean = false;
  activity_name: any;
  activityListModel: any[] = [
  ];
  addActivityForm!: FormGroup
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


  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private dialogRef: MatDialogRef<AddActivityComponent>
  ) { }

  ngOnInit(): void {

    this.addActivityForm = this.formBuilder.group({
      activity_name: ['', Validators.required],
      parent_activity: [''],
      activity_url: ['', Validators.required],
      list_all: [''],
      list: ['', Validators.required],

    });
    this.getParentActivities(this.activity_id);
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {

    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {

    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  getParentActivities(lovType: any) {
    this.activityService.getParentActivities(lovType).subscribe((resp) => {
      if (resp.isSuccessful) {
        debugger;
        this.activityListModel = resp.data;
      }
      else {
        debugger;
      }
    });
  }


  onSubmit() {
    debugger;
    if (this.addActivityForm.valid) {
      if (!this.editData) {
        this.addActivity();
      }
      else {
        //this.updateUniversity();
      }
    }
  }

  addActivity() {
    debugger;

    if (this.allComplete) {
      this.create = true;
      this.read = true;
      this.update = true;
      this.delete = true;
    }

    this.parent_activity = this.addActivityForm.value.parent_activity;
    if (this.parent_activity === "") {
      this.parent_activity = 0
    }

    var formData = {
      activityID: 0,
      activityName: this.addActivityForm.value.activity_name + "",
      parentActivityID: this.parent_activity,
      activityURL: this.addActivityForm.value.activity_url,
      c: this.create,
      r: this.read,
      u: this.update,
      d: this.delete,
    }

    this.activityService.addActivity(formData).subscribe((resp) => {
      if (resp.isSuccessful) {
        //this.countryListModel = resp.data;
        Swal.fire(
          'Great!',
          resp.message,
          'success'
        )
        this.addActivityForm.reset();
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
