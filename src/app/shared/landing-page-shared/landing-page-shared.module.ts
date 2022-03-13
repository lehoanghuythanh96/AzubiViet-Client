import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserNotificationSharedModule } from '../user-notification-shared/user-notification-shared.module';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { UserAuthenticationSharedModule } from '../user-authentication-shared/user-authentication-shared.module';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';



@NgModule({
  declarations: [
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
  imports: [
    CommonModule,
    UserNotificationSharedModule,
    UserAuthenticationSharedModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    RecaptchaModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatBottomSheetModule
  ],
  exports: [
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ]
})
export class LandingPageSharedModule { }
