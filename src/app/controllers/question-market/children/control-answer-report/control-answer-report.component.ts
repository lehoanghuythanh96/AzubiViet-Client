import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/app/models/questionmarketuseranswer/questionmarketuseranswer.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';
import { Apollo, gql } from 'apollo-angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';
import { Socket } from 'ngx-socket-io';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAnswerReviewEntity } from 'src/app/models/userAnswerReview/useranswerreview.entity';
import { QuestionMarketAnswerEntity } from 'src/app/models/QuestionMarketAnswerEntity/QuestionMarketAnswer.entity';

@Component({
  selector: 'app-control-answer-report',
  templateUrl: './control-answer-report.component.html',
  styleUrls: ['./control-answer-report.component.scss']
})
export class ControlAnswerReportComponent implements OnInit {

  question!: PostEntity;
  is_reported = false;

  user_answer!: QuestionMarket_UserAnswerEntity
  user_answer_review!: UserAnswerReviewEntity
  original_answer!: QuestionMarketAnswerEntity

  question_imgnames: string[] = [];
  user_answer_imgnames: string[] = [];
  original_answer_imgnames: string[] = [];

  notification_ID!: number;

  report_notes!: string;

  constructor(
    private _localService: QuestionMarketLocalService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private apollo: Apollo,
    private _snackbar: MatSnackBar,
    private socket: Socket,
    private _fetchAPI: FetchApiMethodsService,
  ) { }

  ngOnInit(): void {

    combineLatest([
      this.route.queryParams.pipe(
        skipWhile(
          x => !x.question_ID
        )
      ),
      this._localService.allquestions$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x
        )
      ),
      this._localService.questionmarketinfo$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x || !x.questionmarketinfo.answer_reviews
        )
      )
    ]).subscribe(
      vals => {

        let params = vals[0]
        let questions = vals[1]
        let allAnswerReviews = vals[2]!.questionmarketinfo.answer_reviews
        if (params.notification_ID) {
          this.notification_ID = parseInt(params.notification_ID)
        }

        this.question = questions.find(
          y => y.ID == params.question_ID
        )!

        if (!this.question || !this.question.questionmarket_user_answer) {
          return
        }

        if (this.question.is_reported) {
          this.is_reported = this.question.is_reported
        }

        this.question_imgnames = this.question.question_imgs.map(
          y => y.media_name
        )

        if (params.user_answer_ID) {
          this.user_answer = this.question.questionmarket_user_answer.find(
            y => y.ID == params.user_answer_ID
          )!

          if (!this.user_answer) {
            return
          }

          this.user_answer_imgnames = this.user_answer.answer_imgs.map(
            y => y.media_name
          )

          if (this.user_answer.report_notes) {
            this.report_notes = this.user_answer.report_notes
          }
        }

        if (params.user_answer_review_ID) {
          this.user_answer_review = allAnswerReviews!.find(
            y => y.ID == params.user_answer_review_ID
          )!

          if (this.user_answer_review) {
            this.original_answer = this.user_answer_review.original_answer_info;
            this.original_answer_imgnames = this.original_answer.answer_imgs.map(
              y => y.media_name
            )
            this.report_notes = this.user_answer_review.report_notes
          }
        }

      }
    )

  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  get cdnfolder() {
    return this._localService.addquestionproduct.cdnfolder
  }

  confirmReport(
    _result: boolean
  ) {
    if (confirm("Are you sure?")) {

      if (!this.is_reported) {
        if (!this.user_answer_review) {
          let _body = {
            report_result: _result,
            user_answer_ID: this.user_answer.ID,
            notification_ID: this.notification_ID
          }

          let _payload: postAPI = {
            urlsuffix: 'confirm_report_invalid_answer',
            body: _body
          }

          this._fetchAPI.postAPI(_payload).then(
            res => {
              if (res.selectedUsers) {
                this.socket.emit(emitNames.requireUserReloadNotis.name, {
                  userIDarr: res.selectedUsers
                })
              }
              this.store.dispatch(UserNotificationAction());
              this._snackbar.open("Report confirmed successfully", "Close")
              this.router.navigate(['/questionmarket'])
            }
          ).catch(
            (error: HttpErrorResponse) => {
              console.log(error.message)
              this._snackbar.open(error.error.message, "Close")
            }
          )
        } else {

          let _body = {
            report_result: _result,
            user_answer_review_ID: this.user_answer_review.ID,
            notification_ID: this.notification_ID
          }

          let _payload: postAPI = {
            urlsuffix: 'confirm_report_invalid_answer_review',
            body: _body
          }

          this._fetchAPI.postAPI(_payload).then(
            res => {
              if (res.selectedUsers) {
                this.socket.emit(emitNames.requireUserReloadNotis.name, {
                  userIDarr: res.selectedUsers
                })
              }
              this.store.dispatch(UserNotificationAction());
              this._snackbar.open("Report confirmed successfully", "Close")
              this.router.navigate(['/questionmarket'])
            }
          ).catch(
            (error: HttpErrorResponse) => {
              console.log(error.message)
              this._snackbar.open(error.error.message, "Close")
            }
          )

        }
      } else {

        let _body = {
          report_result: _result,
          question_ID: this.question.ID,
          notification_ID: this.notification_ID
        }

        let _payload: postAPI = {
          urlsuffix: 'confirm_report_invalid_question',
          body: _body
        }

        this._fetchAPI.postAPI(_payload).then(
          res => {
            if (res.selectedUsers) {
              this.socket.emit(emitNames.requireUserReloadNotis.name, {
                userIDarr: res.selectedUsers
              })
            }
            this.store.dispatch(UserNotificationAction());
            this._snackbar.open("Report confirmed successfully", "Close")
            this.router.navigate(['/questionmarket'])
          }
        ).catch(
          (error: HttpErrorResponse) => {
            console.log(error.message)
            this._snackbar.open(error.error.message, "Close")
          }
        )

      }

    }

  }

}
