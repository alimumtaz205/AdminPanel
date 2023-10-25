import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { ForgotPasswordComponent } from './views/pages/auth/forgot-password/forgot-password.component';
import { HomeComponent } from './views/pages/home/home.component';
import { LoginLayoutComponent } from './views/layouts/login-layout.component';
import { HomeLayoutComponent } from './views/layouts/home-layout.component';
import { InquiryManagemntComponent } from './views/pages/inquiry-managemnt/inquiry-managemnt.component';
import { InqueryService } from './_services/inquery.service';
import { UniversityManagementComponent } from './views/pages/university-management/university-management.component';
import { CountryManagementComponent } from './views/pages/country-management/country-management.component';
import { CourseManagementComponent } from './views/pages/course-management/course-management.component';
import { SubjectManagementComponent } from './views/pages/subject-management/subject-management.component';
import { UserManagementComponent } from './views/pages/user-management/user-management.component';
import { ActivityComponent } from './views/pages/user-management/activity/activity.component';
import { ProfileComponent } from './views/pages/user-management/profile/profile.component';
import { BranchManagmentComponent } from './views/pages/branch-managment/branch-managment.component';
import { CityManagmentComponent } from './views/pages/city-managment/city-managment.component';
import { ReferralManagmentComponent } from './views/pages/referral-managment/referral-managment.component';
import { AppUsersComponent } from './views/pages/app-users/app-users.component';
import { AuthGuard } from './views/pages/auth/guards/auth.guard';


const routes: Routes = [
  {
    path: '', component: LoginLayoutComponent,
    children: [{
      path: '',
      component: LoginComponent
    }]
  },
  {
    path: '', component: HomeLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'inquiry-managemnt', component: InquiryManagemntComponent, canActivate: [AuthGuard] },
      { path: 'app-activity', component: ActivityComponent, canActivate: [AuthGuard] },
      {
        path: 'university-management',
        component: UniversityManagementComponent, canActivate: [AuthGuard]
      },
      {
        path: 'country-management',
        component: CountryManagementComponent, canActivate: [AuthGuard]
      },
      {
        path: 'course-management',
        component: CourseManagementComponent, canActivate: [AuthGuard]
      },
      {
        path: 'subject-management',
        component: SubjectManagementComponent, canActivate: [AuthGuard]
      },
      {
        path: 'user-management', canActivate: [AuthGuard],
        component: UserManagementComponent,
      },
      {
        path: 'app-profile',
        component: ProfileComponent, canActivate: [AuthGuard]
      },
      {
        path: 'inquiry-managemnt',
        component: InquiryManagemntComponent, canActivate:[AuthGuard]
      },
      {
        path: 'referral-managment',
        component: ReferralManagmentComponent , canActivate:[AuthGuard]
      },
      {
        path: 'city-managment',
        component: CityManagmentComponent, canActivate:[AuthGuard]
      },
      {
        path: 'branch-managment',
        component: BranchManagmentComponent, canActivate:[AuthGuard]
      },
      {
        path: 'app-users',
        component: AppUsersComponent, canActivate:[AuthGuard]
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [InqueryService]
})
export class AppRoutingModule { }
