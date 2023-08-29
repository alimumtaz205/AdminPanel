import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { ForgotPasswordComponent } from './views/pages/auth/forgot-password/forgot-password.component';
import { HomeComponent } from './views/pages/home/home.component';
import { LoginLayoutComponent } from './views/layouts/login-layout.component';
import { HomeLayoutComponent } from './views/layouts/home-layout.component';
import { InquiryManagemntComponent } from './views/pages/inquiry-managemnt/inquiry-managemnt.component';
import { InqueryService } from './_services/inquery.service';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path:'inquiry-managemnt',
        component: InquiryManagemntComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[InqueryService]
})
export class AppRoutingModule { }
