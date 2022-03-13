import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthLayoutComponent } from '../user-auth-layout/user-auth-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginPageComponent } from '../children/user-login-page/user-login-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserAuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: UserLoginPageComponent
      }
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserAuthRouterModule { }
