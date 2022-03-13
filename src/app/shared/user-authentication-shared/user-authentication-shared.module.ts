import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginCardComponent } from './components/user-login-card/user-login-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecaptchaModule } from 'ng-recaptcha';
import { UserAbiCardComponent } from './components/user-abi-card/user-abi-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserPrivateMessagesCardComponent } from './components/user-private-messages-card/user-private-messages-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ServerChatCardComponent } from './components/server-chat-card/server-chat-card.component';
import { ChooseChatServerCardComponent } from './components/server-chat-card/children/choose-chat-server-card/choose-chat-server-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BlockChatUserDialogComponent } from './components/server-chat-card/children/block-chat-user-dialog/block-chat-user-dialog.component';
import { ControlKickUserRequirementComponent } from './components/server-chat-card/children/control-kick-user-requirement/control-kick-user-requirement.component';
import { UserProfileCardComponent } from './components/user-profile-card/user-profile-card.component';
import { MatRadioModule } from '@angular/material/radio';
import { UserInventoryCardComponent } from './components/user-inventory-card/user-inventory-card.component';
import { SingleInventoryItemComponent } from './components/user-inventory-card/children/single-inventory-item/single-inventory-item.component';
import { InventoryItemInfoCardComponent } from './components/user-inventory-card/children/inventory-item-info-card/inventory-item-info-card.component';
import { ChangePasswortWindowComponent } from './components/user-profile-card/children/change-passwort-window/change-passwort-window.component';
import { ChangeUserAvatarDialogComponent } from './components/user-profile-card/children/change-user-avatar-dialog/change-user-avatar-dialog.component';


@NgModule({
  declarations: [
    UserLoginCardComponent,
    UserAbiCardComponent,
    UserPrivateMessagesCardComponent,
    ServerChatCardComponent,
    ChooseChatServerCardComponent,
    BlockChatUserDialogComponent,
    ControlKickUserRequirementComponent,
    UserProfileCardComponent,
    UserInventoryCardComponent,
    SingleInventoryItemComponent,
    InventoryItemInfoCardComponent,
    ChangePasswortWindowComponent,
    ChangeUserAvatarDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RecaptchaModule,
    MatProgressBarModule,
    MatChipsModule,
    MatDividerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  exports: [
    UserLoginCardComponent,
    UserAbiCardComponent,
    ServerChatCardComponent,
    UserProfileCardComponent
  ]
})
export class UserAuthenticationSharedModule { }
