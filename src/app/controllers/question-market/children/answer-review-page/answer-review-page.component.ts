import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { combineLatest, Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarketAnswerEntity } from 'src/app/models/QuestionMarketAnswerEntity/QuestionMarketAnswer.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/app/models/questionmarketuseranswer/questionmarketuseranswer.entity';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';
import { FalseOriginalAnswerMessageComponent } from './children/false-original-answer-message/false-original-answer-message.component';
import { ReportAnswerDialogComponent } from './children/report-answer-dialog/report-answer-dialog.component';

@Component({
  selector: 'app-answer-review-page',
  templateUrl: './answer-review-page.component.html',
  styleUrls: ['./answer-review-page.component.scss']
})
export class AnswerReviewPageComponent implements OnInit {

  question!: PostEntity;
  answer!: QuestionMarket_UserAnswerEntity;
  original_answer: string = "";
  notification_ID!: number;

  question_imgnames: string[] = [];
  useranswer_imgnames: string[] = [];
  original_answer_imgnames: string[] = [];

  get cdnfolder() {
    return this._localService.addquestionproduct.cdnfolder
  }

  constructor(
    private route: ActivatedRoute,
    private _localService: QuestionMarketLocalService,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    public dialog: MatDialog,
    private store: Store,
    private router: Router,
    private socket: Socket
  ) { }

  reviewForm = new FormGroup({
    correct: new FormControl(true, [Validators.required]),
    review_content: new FormControl('')
  })

  openfalseOriginalAnswerDialog(): void {
    const dialogRef = this.dialog.open(FalseOriginalAnswerMessageComponent, {
      width: '400px',
      data: { question_ID: this.question.ID },
    });
  }

  openreportDialog() {
    const dialogRef = this.dialog.open(ReportAnswerDialogComponent, {
      width: '400px',
      data: {
        user_answer_ID: this.answer.ID,
        notification_ID: this.notification_ID
      }
    });
  }

  ngOnInit(): void {

    combineLatest([
      this.route.queryParams.pipe(
        skipWhile(
          x => !x.answer_ID || !x.question_ID || !x.token
        )
      ),
      this._localService.allquestions$.pipe(
        takeUntil(this.destroy$)
      )
    ]).subscribe(
      (values) => {
        this.question = values[1].find(
          y => y.ID == values[0].question_ID
        )!

        if (this.question && this.question.questionmarket_user_answer) {
          this.answer = this.question.questionmarket_user_answer.find(
            y => y.ID == values[0].answer_ID
          )!
          if (this.answer) {
            this.useranswer_imgnames = [...this.answer.answer_imgs.map(
              y => y.media_name
            )]
          }

          this.question_imgnames = this.question.question_imgs.map(
            y => y.media_name
          )

        }

        let _body = {
          token: values[0].token
        }

        let _payload: postAPI = {
          urlsuffix: 'getreviewquestionanswer',
          body: _body
        }

        this._fetchAPI.postAPI(_payload).then(
          (res: [QuestionMarket_UserAnswerEntity, number]) => {
            this.original_answer = res[0].answer_content
            this.original_answer_imgnames = [...res[0].answer_imgs.map(
              y => { return y.media_name }
            )]
            this.notification_ID = res[1]
          }
        ).catch(
          (error: HttpErrorResponse) => {
            console.log(error.error)
            this._snackbar.open(error.error.message, "Close")
            this.router.navigate(['/questionmarket'])
            this.store.dispatch(UserNotificationAction())
          }
        )

      }
    )
  }

  async submitForm() {
    if (this.reviewForm.valid && confirm("Are you sure you want to submit this form?")) {

      let correctness = this.reviewForm.value.correct
      let review_content = this.reviewForm.value.review_content

      let _body = {
        correctness: correctness,
        review_content: review_content,
        notification_ID: this.notification_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'usersubmitanswerreview',
        body: _body
      }

      await this._fetchAPI.postAPI(_payload).then(
        (res: {
          selectedUsers: number[],
          reviewer_increased_money: number
        }) => {
          if (res.selectedUsers) {
            this.socket.emit(emitNames.requireUserReloadNotis.name, {
              userIDarr: res.selectedUsers
            })
          }
          this._snackbar.open(`Review submitted successfully, you get ${res.reviewer_increased_money} coin(s)`,"Close")
          this.router.navigate(['/questionmarket'])
          this.store.dispatch(QuestionmarketInfoAction());
          this.store.dispatch(UserNotificationAction())
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this.router.navigate(['/questionmarket'])
          this.store.dispatch(UserNotificationAction())
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

    ]
  }

}
