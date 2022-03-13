import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { MainLandingPageAction } from 'src/app/state/mainLandingPage/mainlanding.action';
import { environment } from 'src/environments/environment';
import { QandALocalService } from '../../QALocalService/qand-a-local.service';

@Component({
  selector: 'app-qadialog',
  templateUrl: './qadialog.component.html',
  styleUrls: ['./qadialog.component.scss']
})
export class QADialogComponent implements OnInit {

  item_content = new FormControl('', Validators.required)
  captchacheck = new FormControl('',Validators.required)

  constructor(
    private _fetchAPImethod: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<QADialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: {
      cdnfolder: string
    },
    private localService: QandALocalService
  ) { }

  ngOnInit(): void {
  }

  recaptchaKey = environment.RECAPTCHA_SITE_KEY;
  resolvedCaptcha(e: any) {
    this.captchacheck.setValue(e)
  }

  submit() {

    if (
      this.item_content.valid &&
      this.captchacheck.valid
    ) {

      let _body = {
        item_content: this.item_content.value,
        img_arr: this.localService.QA_imgs
      }

      let _payload: postAPI = {
        urlsuffix: 'user_submit_QA',
        body: _body
      }
      
      this._fetchAPImethod.postAPI(_payload).then(
        res => {
          this._snackbar.open(
            "Submitted succesfully, your will get notification by email when there is an answer",
            "Close"
          )
          this.dialogRef.close();
          this.store.dispatch(MainLandingPageAction())
          return
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    } else {
      this._snackbar.open("Please fill out all the required information first", "Close")
    }
  }

}
