import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthLayoutComponent } from './user-auth-layout/user-auth-layout.component';
import { UserAuthRouterModule } from './user-auth-router/user-auth-router.module';
import { UserLoginPageComponent } from './children/user-login-page/user-login-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserAuthenticationSharedModule } from 'src/app/shared/user-authentication-shared/user-authentication-shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserAuthLayoutComponent,
    UserLoginPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserAuthenticationSharedModule,
    UserAuthRouterModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule
  ]
})
export class UserAuthenticationModule { }
