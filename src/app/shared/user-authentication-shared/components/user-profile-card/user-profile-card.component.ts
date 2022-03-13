import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { UserEntity } from 'src/app/models/userentity/userinfo.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { environment } from 'src/environments/environment';
import { UserInventoryCardComponent } from '../user-inventory-card/user-inventory-card.component';
import { ChangePasswortWindowComponent } from './children/change-passwort-window/change-passwort-window.component';
import { ChangeUserAvatarDialogComponent } from './children/change-user-avatar-dialog/change-user-avatar-dialog.component';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit {

  userForm = new FormGroup({
    user_name: new FormControl('', Validators.required),
    user_gender: new FormControl('Male', Validators.required)
  })

  userQuery?: QueryRef<any>;

  userinfo!: UserEntity;
  cdnfolder: any;

  lvprogress: any;

  constructor(
    private store: Store,
    private apollo: Apollo,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private fetchApiMethodsService: FetchApiMethodsService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.userQuery = this.apollo.watchQuery({
      query: gql`
        query user_info {
          user_info {
            user_name,
            user_role,
            user_level,
            levelup_points,
            user_experience,
            user_avatar {
              media_name,
              media_path
            },
            gender,
            defaultconfig {
              userimg_path
            }
          }
        }
      `
    });

    this.userQuery.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (x: any) => {
        this.cdnfolder = environment.BASE_CDN_URL + '/' + x.data.user_info.defaultconfig?.userimg_path;
        this.userinfo = x.data.user_info;
        this.lvprogress = (this.userinfo.user_experience / this.userinfo.levelup_points) * 100

        this.userForm.controls.user_name.setValue(this.userinfo.user_name)
        this.userForm.controls.user_gender.setValue(this.userinfo.gender)
      },
      error => {
        return
      }
    )
  }

  saveInfo() {
    if (
      this.userForm.controls.user_name.valid &&
      this.userForm.controls.user_gender.valid
    ) {

      let password = window.prompt("Enter your password to confirm your changes...")

      let username = this.userForm.controls.user_name.value;
      let usergender = this.userForm.controls.user_gender.value;

      let _payload: postAPI = {
        urlsuffix: 'userupdateprofile',
        body: {
          user_name: username,
          user_password: password,
          gender: usergender
        }
      }

      this.fetchApiMethodsService.postAPI(_payload).then(
        res => {
          this.userQuery?.refetch()
          this._snackbar.open("User profile updated successfully", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }
  }

  openInventory() {
    this.bottomSheet.open(
      UserInventoryCardComponent
    )
  }

  changePassword() {
    const dialogRef = this.dialog.open(
      ChangePasswortWindowComponent,
      {
        width: "400px"
      }
    )
  }

  changeAvatar() {
    const dialogRef = this.dialog.open(
      ChangeUserAvatarDialogComponent,
      {
        data: {
          userinfo: this.userinfo,
          userQuery: this.userQuery
        }
      }
    )
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
