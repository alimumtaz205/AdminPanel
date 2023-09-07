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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { LoginLayoutComponent } from './views/layouts/login-layout.component';
import { HomeLayoutComponent } from './views/layouts/home-layout.component';
import { InquiryManagemntComponent } from './views/pages/inquiry-managemnt/inquiry-managemnt.component';
import { UniversityManagementComponent } from './views/pages/university-management/university-management.component';
import { StaffComponent } from './views/pages/staff/staff.component';
import { StudentsComponent } from './views/pages/students/students.component';
import { UserManagementComponent } from './views/pages/user-management/user-management.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthService } from './_services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUniversityComponent } from './views/pages/university-management/dialog/add-university.component';
import { AlertDialogDeleteComponent } from './views/pages/alert-dialogs/alert-dialog-delete.component';
import { CountryManagementComponent } from './views/pages/country-management/country-management.component';
import { AddCountryComponent } from './views/pages/country-management/add-country/add-country.component';
import { CourseManagementComponent } from './views/pages/course-management/course-management.component';
import { SubjectManagementComponent } from './views/pages/subject-management/subject-management.component';
import { AddCourseComponent } from './views/pages/course-management/add-course/add-course.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivityComponent } from './views/pages/user-management/activity/activity.component';
import { UserManagementModule } from './views/pages/user-management/user-management.module';
import { AddActivityComponent } from './views/pages/user-management/activity/add-activity/add-activity.component';

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
    AddUniversityComponent,
    AlertDialogDeleteComponent,
    CountryManagementComponent,
    AddCountryComponent,
    CourseManagementComponent,
    SubjectManagementComponent,
    AddCourseComponent,
    ActivityComponent,
    AddActivityComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
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
    MatTableModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
