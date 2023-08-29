import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { ForgotPasswordComponent } from './views/pages/auth/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './views/header/header.component';
import { SidenavComponent } from './views/sidenav/sidenav.component';
import { HomeComponent } from './views/pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { LoginLayoutComponent } from './views/layouts/login-layout.component';
import { HomeLayoutComponent } from './views/layouts/home-layout.component';
import { InquiryManagemntComponent } from './views/pages/inquiry-managemnt/inquiry-managemnt.component';
import { UniversityManagementComponent } from './views/pages/university-management/university-management.component';
import { StaffComponent } from './views/pages/staff/staff.component';
import { StudentsComponent } from './views/pages/students/students.component';
import { UserManagementComponent } from './views/pages/user-management/user-management.component';
import { ActivityComponent } from './views/pages/activity/activity.component';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    InquiryManagemntComponent,
    UniversityManagementComponent,
    StaffComponent,
    StudentsComponent,
    UserManagementComponent,
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
