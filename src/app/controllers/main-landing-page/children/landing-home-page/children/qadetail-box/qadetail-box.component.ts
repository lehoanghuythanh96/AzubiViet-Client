import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { MainLandingPageLocalService } from 'src/app/controllers/main-landing-page/LocalService/main-landing-page-local.service';
import { GuestQandAEntity } from 'src/app/models/guestQandA/guestQandA.entity';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { UserLoginCardComponent } from 'src/app/shared/user-authentication-shared/components/user-login-card/user-login-card.component';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { MainLandingPageAction } from 'src/app/state/mainLandingPage/mainlanding.action';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';
import { environment } from 'src/environments/environment';
import { ReportInvalidQAAnswerDialogComponent } from './children/report-invalid-qa-answer-dialog/report-invalid-qa-answer-dialog.component';
import { ReportInvalidQAQuestionDialogComponent } from './children/report-invalid-qa-question-dialog/report-invalid-qa-question-dialog.component';

@Component({
  selector: 'app-qadetail-box',
  templateUrl: './qadetail-box.component.html',
  styleUrls: ['./qadetail-box.component.scss']
})
export class QADetailBoxComponent implements OnInit {

  user_answer!: GuestQandAEntity;
  all_answer: GuestQandAEntity[] = [];

  cdnfolder?: string;

  image_names: string[] = []

  question!: GuestQandAEntity

  item_content = new FormControl('', Validators.required)

  get userinfo() {
    return this._localService.userinfo
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      QA_ID: number
    },
    private fetchapimethods: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private store: Store,
    private _localService: MainLandingPageLocalService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this._localService.mainlandingpageInfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        x => !x || !x.mainlandingpageInfo
      )
    ).subscribe(
      x => {
        console.log(x?.mainlandingpageInfo)
        if (x && x.mainlandingpageInfo && x.mainlandingpageInfo.all_QandA) {
          let allItems = x.mainlandingpageInfo.all_QandA!
          this.user_answer = allItems.find(
            y => y.item_type == "answer" && y.user_email == localStorage.getItem('user_email') && y.parent_ID == this.data.QA_ID
          )!
          this.all_answer = allItems.filter(
            y => y.item_type == "answer" && y.user_email != localStorage.getItem('user_email') && y.parent_ID == this.data.QA_ID
          )!
          this.question = allItems.find(
            y => y.item_type == "question" && y.ID == this.data.QA_ID
          )!

          this.image_names = this.question.QA_imgs.map(
            y => y.media_name
          )

          this.cdnfolder = environment.BASE_CDN_URL + '/' + this.question.QA_img_path
        }
      }
    )

  }

  loginBox() {
    this.bottomSheet.open(
      UserLoginCardComponent
    )
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  submitAnswer() {
    if (this.item_content.valid) {

      let _body = {
        item_content: this.item_content.value,
        QA_ID: this.data.QA_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'user_submit_QA_answer',
        body: _body
      }

      this.fetchapimethods.postAPI(_payload).then(
        res => {
          this._snackbar.open("Your answer has been submitted successfully", "Close")
          this.store.dispatch(MainLandingPageAction())
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }
  }

  isLiked(user_arr: number[]) {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      if (user_arr.includes(parseInt(user_id))) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  deleteAnswer(
    answer_ID: number
  ) {
    if (confirm('Are you sure you want to delete this answer?')) {

      let _body = {
        answer_ID: answer_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'userdeleteqa_answer',
        body: _body
      }

      this.fetchapimethods.postAPI(_payload).then(
        res => {
          this.store.dispatch(MainLandingPageAction())
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.error(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )
    }
  }

  likeAnswer(
    answer_ID: number
  ) {

    let _body = {
      answer_ID: answer_ID
    }

    let _payload: postAPI = {
      urlsuffix: 'userlike_qaanswer',
      body: _body
    }

    this.fetchapimethods.postAPI(_payload).then(
      res => {
        this.store.dispatch(MainLandingPageAction())
        return
      }
    ).catch(
      (error: HttpErrorResponse) => {
        console.error(error.error)
        this._snackbar.open(error.error.message, "Close")
      }
    )

  }

  openReportQuestionDialog() {
    if (this.data.QA_ID) {

      if (!this.userinfo) {
        this.loginBox();
        return
      }

      const dialogRef = this.dialog.open(
        ReportInvalidQAQuestionDialogComponent,
        {
          width: '400px',
          data: {
            QA_ID: this.data.QA_ID
          }
        }
      )
    }
  }

  openReportAnswerDialog(answer_ID: number) {
    if (this.data.QA_ID) {
      const dialogRef = this.dialog.open(
        ReportInvalidQAAnswerDialogComponent,
        {
          width: '400px',
          data: {
            QA_ID: answer_ID
          }
        }
      )
    }
  }

}
