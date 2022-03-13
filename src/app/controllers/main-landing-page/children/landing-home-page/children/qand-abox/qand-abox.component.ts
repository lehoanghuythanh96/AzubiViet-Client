import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { MainLandingPageLocalService } from 'src/app/controllers/main-landing-page/LocalService/main-landing-page-local.service';
import { UserEntity } from 'src/app/models/userentity/userinfo.entity';
import { UserLoginCardComponent } from 'src/app/shared/user-authentication-shared/components/user-login-card/user-login-card.component';
import { environment } from 'src/environments/environment';
import { QADialogComponent } from './children/qadialog/qadialog.component';

@Component({
  selector: 'app-qand-abox',
  templateUrl: './qand-abox.component.html',
  styleUrls: ['./qand-abox.component.scss']
})
export class QAndABoxComponent implements OnInit {

  userinfo!: UserEntity;

  constructor(
    private dialog: MatDialog,
    private localService: MainLandingPageLocalService,
    private _snackbar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {

    this.localService.userinfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        x => !x
      )
    ).subscribe(
      y => {
        this.userinfo = y!
      }
    )

  }

  openDialog() {
    if (this.userinfo) {
      const dialogRef = this.dialog.open(
        QADialogComponent,
        {
          width: '400px',
          data: {
            cdnfolder: environment.BASE_CDN_URL + '/' + this.userinfo.defaultconfig?.QA_img_path
          }
        }
      )
    } else {
      this._snackbar.open("Please login to send Q&A","Close")
      this.bottomSheet.open(
        UserLoginCardComponent
      )
    }
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

}
