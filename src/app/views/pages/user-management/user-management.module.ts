import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddActivityComponent } from './activity/add-activity/add-activity.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProfileComponent } from './profile/add-profile/add-profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ActivityComponent } from './activity/activity.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  declarations: [
  
    AddUserComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class UserManagementModule { }
