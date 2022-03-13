import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserAuthenticationSharedModule } from '../user-authentication-shared/user-authentication-shared.module';
import { UserNotificationSharedModule } from '../user-notification-shared/user-notification-shared.module';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';


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
    MatSidenavModule,
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent
  ]
})
export class LessonPageSharedModule { }
