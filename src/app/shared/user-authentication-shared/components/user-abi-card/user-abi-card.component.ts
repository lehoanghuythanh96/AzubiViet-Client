import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil, skipWhile } from 'rxjs/operators';
import { UserEntity } from 'src/app/models/userentity/userinfo.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { environment } from 'src/environments/environment';
import { UserInventoryCardComponent } from '../user-inventory-card/user-inventory-card.component';
import { UserPrivateMessagesCardComponent } from '../user-private-messages-card/user-private-messages-card.component';

@Component({
  selector: 'app-user-abi-card',
  templateUrl: './user-abi-card.component.html',
  styleUrls: ['./user-abi-card.component.scss']
})
export class UserAbiCardComponent implements OnInit {

  userinfo!: UserEntity;
  cdnfolder: any;

  lvprogress: any;

  constructor(
    private store: Store,
    private apollo: Apollo,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {

    this.apollo.watchQuery({
      query: gql`
        query user_info {
          user_info {
            user_name,
            user_role,
            user_level,
            levelup_points,
            user_abicoin,
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
    }).valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (x:any) => {
        this.cdnfolder = environment.BASE_CDN_URL + '/' + x.data.user_info.defaultconfig?.userimg_path;
        this.userinfo = x.data.user_info;
        this.lvprogress = (this.userinfo.user_experience / this.userinfo.levelup_points) * 100
      },
      error => {
        return
      }
    )
  }

  openInventory() {
    this.bottomSheet.open(
      UserInventoryCardComponent
    )
  }

  openMesssageDialog() {
    const dialogRef = this.dialog.open(
      UserPrivateMessagesCardComponent,
      {
        width: "400px",
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
