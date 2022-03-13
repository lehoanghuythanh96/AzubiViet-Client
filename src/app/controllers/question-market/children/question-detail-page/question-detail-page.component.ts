import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, skipWhile, take, takeLast, takeUntil } from 'rxjs/operators';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarketAnswerEntity } from 'src/app/models/QuestionMarketAnswerEntity/QuestionMarketAnswer.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/app/models/questionmarketuseranswer/questionmarketuseranswer.entity';
import { UserAnswerReviewEntity } from 'src/app/models/userAnswerReview/useranswerreview.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';

@Component({
  selector: 'app-question-detail-page',
  templateUrl: './question-detail-page.component.html',
  styleUrls: ['./question-detail-page.component.scss']
})
export class QuestionDetailPageComponent implements OnInit {

  question!: PostEntity;
  question_imgnames: string[] = [];

  AnswerorReview = true;

  answerorReport = true;

  user_answer!: QuestionMarket_UserAnswerEntity;
  user_answer_imgnames: string[] = [];
  original_answer_imgnames: string[] = [];

  foundReview!: UserAnswerReviewEntity;
  revieworReport = true;
  original_answer!: QuestionMarketAnswerEntity

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
    private router: Router
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
          x => !x || !x.questionmarketinfo
        )
      )
    ]).subscribe(
      (values) => {
        this.question = values[1].find(
          y => y.ID == values[0].question_ID
        )!

        if (!this.question) {
          return
        }

        this.question_imgnames = this.question.question_imgs.map(
          y => y.media_name
        )

        if (values[0].user_answer_review_ID) {
          this.AnswerorReview = false;
        } else {
          this.AnswerorReview = true;
        }

        if (values[0].isReport) {
          this.answerorReport = false;
          this.revieworReport = false;
        } else {
          this.answerorReport = true;
          this.revieworReport = true;
        }

        if (!values[0].isReport) {
          if (!values[0].user_answer_review_ID) {
            if (this.question.questionmarket_user_answer && localStorage.getItem('user_id')) {
              let _foundUserAnswer = this.question.questionmarket_user_answer.find(
                y => y.user_ID == parseInt(localStorage.getItem('user_id')!)
              )
              if (!_foundUserAnswer) {
                return
              }
              this.user_answer = _foundUserAnswer
              this.user_answer_imgnames = _foundUserAnswer.answer_imgs.map(
                y => y.media_name
              )
            }
          } else {
            if (this.question.questionmarket_user_answer) {
              let _foundUserAnswer = this.question.questionmarket_user_answer.find(
                y => y.ID == values[0].user_answer_ID
              )
              if (!_foundUserAnswer) {
                return
              }
              this.user_answer = _foundUserAnswer
              this.user_answer_imgnames = _foundUserAnswer.answer_imgs.map(
                y => y.media_name
              )

              this.foundReview = values[2]!.questionmarketinfo.answer_reviews?.find(
                y => y.ID == values[0].user_answer_review_ID
              )!

              if (this.foundReview) {
                this.original_answer = this.foundReview.original_answer_info
              }
            }
          }
        } else {

          if (!values[0].user_answer_review_ID) {

            if (!this.question.questionmarket_user_answer) {
              return
            }
            let _foundUserAnswer = this.question.questionmarket_user_answer.find(
              y => y.ID == values[0].user_answer_ID
            )
            if (!_foundUserAnswer) {
              return
            }
            this.user_answer = _foundUserAnswer
            this.user_answer_imgnames = _foundUserAnswer.answer_imgs.map(
              y => y.media_name
            )

            let _body = {
              user_answer_ID: values[0].user_answer_ID
            }

            let _payload: postAPI = {
              urlsuffix: 'useranswer_reportedReviewerRequireOriginalAnswer',
              body: _body
            }

            this._fetchAPI.postAPI(_payload).then(
              res => {
                this.original_answer = res
                this.original_answer_imgnames = this.original_answer.answer_imgs.map(
                  y => y.media_name
                )
              }
            ).catch(
              (error: HttpErrorResponse) => {
                console.error(error.error)
                this._snackbar.open(error.error.message, "Close")
              }
            )

          } else {
            
            if (!this.question.questionmarket_user_answer || !localStorage.getItem('user_id')) {
              return
            }
            let _foundUserAnswer = this.question.questionmarket_user_answer.find(
              y => y.parent_ID == this.question.ID && y.user_ID == parseInt(localStorage.getItem('user_id')!)
            )
            if (!_foundUserAnswer) {
              return
            }
            this.user_answer = _foundUserAnswer
            this.user_answer_imgnames = _foundUserAnswer.answer_imgs.map(
              y => y.media_name
            )

            this.foundReview = values[2]!.questionmarketinfo.answer_reviews?.find(
              y => y.user_answer_ID == _foundUserAnswer!.ID
            )!

            if (!this.foundReview) {
              return
            }

            this.original_answer = this.foundReview.original_answer_info

          }

        }
      });
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
