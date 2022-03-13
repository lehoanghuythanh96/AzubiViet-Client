import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { UserNotificationSharedModule } from '../user-notification-shared/user-notification-shared.module';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { UserAuthenticationSharedModule } from '../user-authentication-shared/user-authentication-shared.module';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ],
  imports: [
    CommonModule,
    UserAuthenticationSharedModule,
    UserNotificationSharedModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ]
})
export class QuestionMarketSharedModule { }
