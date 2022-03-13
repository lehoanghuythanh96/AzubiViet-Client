import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { Socket } from 'ngx-socket-io';
import { combineLatest, Subject } from 'rxjs';
import { skip, skipWhile, takeUntil } from 'rxjs/operators';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarketAnswerEntity } from 'src/app/models/QuestionMarketAnswerEntity/QuestionMarketAnswer.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/app/models/questionmarketuseranswer/questionmarketuseranswer.entity';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { UserAnswerReviewEntity } from 'src/app/models/userAnswerReview/useranswerreview.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';
import { ReportAnswerReviewDialogComponent } from './children/report-answer-review-dialog/report-answer-review-dialog.component';

@Component({
  selector: 'app-check-review-page',
  templateUrl: './check-review-page.component.html',
  styleUrls: ['./check-review-page.component.scss']
})
export class CheckReviewPageComponent implements OnInit {

  review_ID!: number;
  question!: PostEntity;
  answer!: QuestionMarketAnswerEntity;
  user_answer!: QuestionMarket_UserAnswerEntity;
  foundReview!: UserAnswerReviewEntity;

  notification_ID!: number;

  question_imgnames: string[] = [];
  answer_imgnames: string[] = [];
  user_answer_imgnames: string[] = [];

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
    private socket: Socket,
    private router: Router
  ) { }

  openReportDialog() {
    const dialogRef = this.dialog.open(ReportAnswerReviewDialogComponent, {
      width: '400px',
      data: {
        user_answer_review_ID: this.foundReview.ID,
        notification_ID: this.notification_ID
      },
    });
  }

  ngOnInit(): void {
    combineLatest([
      this.route.queryParams.pipe(
        skipWhile(
          x => !x.review_ID
        )
      ),
      this._localService.questionmarketinfo$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x || !x.questionmarketinfo.answer_reviews
        )
      ),
      this._localService.allquestions$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x
        )
      )
    ]).subscribe(
      (values) => {

        let allReviews = values[1]!.questionmarketinfo.answer_reviews!
        this.review_ID = values[0].review_ID

        this.foundReview = allReviews.find(
          y => y.ID == this.review_ID
        )!

        if (!this.foundReview) {
          return
        }

        this.question = this.foundReview.question_info

        if (!this.question) {
          return
        }

        this.notification_ID = values[0].notification_ID

        this.question_imgnames = this.question.question_imgs.map(
          y => y.media_name
        )

        this.answer = this.foundReview.original_answer_info

        this.answer_imgnames = [...this.answer.answer_imgs.map(
          y => y.media_name
        )]

        let storageQuestion = values[2].find(
          y => y.ID == this.foundReview.question_ID
        )

        console.log(storageQuestion)

        if (storageQuestion && storageQuestion.questionmarket_user_answer) {

          this.user_answer = storageQuestion.questionmarket_user_answer!.find(
            y => y.ID == this.foundReview.user_answer_ID
          )!

          if (!this.user_answer) {
            return
          }

          this.user_answer_imgnames = this.user_answer.answer_imgs.map(
            y => y.media_name
          )
        }

      })
  }

  async userConfirmReview(
    isLiked: boolean
  ) {
    if (confirm('Are you sure?')) {

      let _body = {
        review_ID: this.review_ID,
        isLiked: isLiked,
        notification_ID: this.notification_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'userconfirmreview',
        body: _body
      }

      await this._fetchAPI.postAPI(_payload).then(
        res => {
          if (res && typeof res == 'number') {

            let emitData = {
              userIDarr: [res]
            }
            this.socket.emit(emitNames.requireUserReloadNotis.name, emitData)

          }

          this.router.navigate(['/questionmarket'])
          this.store.dispatch(UserNotificationAction())
          this.store.dispatch(QuestionmarketInfoAction())
          this._snackbar.open("Confirmed successfully!", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this.router.navigate(['/questionmarket'])
          this.store.dispatch(UserNotificationAction())
          this.store.dispatch(QuestionmarketInfoAction())
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

}
