import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarketAnswerEntity } from 'src/app/models/QuestionMarketAnswerEntity/QuestionMarketAnswer.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/app/models/questionmarketuseranswer/questionmarketuseranswer.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';

@Component({
  selector: 'app-update-review-question-and-answer-content-dialog',
  templateUrl: './update-review-question-and-answer-content-dialog.component.html',
  styleUrls: ['./update-review-question-and-answer-content-dialog.component.scss']
})
export class UpdateReviewQuestionAndAnswerContentDialogComponent implements OnInit {

  new_question!: PostEntity;
  new_answer!: QuestionMarketAnswerEntity;
  question_imgnames: string[] = [];
  original_answer_imgnames: string[] = [];
  user_answer!: QuestionMarket_UserAnswerEntity;
  user_answer_IMGs: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateReviewQuestionAndAnswerContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: {
      question_ID: number,
      user_answer_ID: number
    },
    private _localService: QuestionMarketLocalService,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {

    this._localService.allquestions$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        x => !x
      )
    ).subscribe(
      x => {

        this.new_question = x.find(
          y => y.ID == this.dialogData.question_ID
        )!

        this.new_answer = this.new_question.question_answer

        this.question_imgnames = this.new_question.question_imgs.map(
          y => y.media_name
        )

        this.original_answer_imgnames = this.new_answer.answer_imgs.map(
          y => y.media_name
        )

        if (this.new_question.questionmarket_user_answer) {

          this.user_answer = this.new_question.questionmarket_user_answer.find(
            y => y.ID == this.dialogData.user_answer_ID
          )!;

          this.user_answer_IMGs = this.user_answer.answer_imgs.map(
            y => y.media_name
          )
        }

      }
    )

  }

  async confirmUpdate() {
    if (confirm('Are you sure you want to update new content for this review?')) {

      let _body = {
        question_ID: this.dialogData.question_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'userrequiredreviewupdate',
        body: _body
      }

      await this._fetchAPI.postAPI(_payload).then(
        res => {
          this.store.dispatch(QuestionmarketInfoAction())
          this.dialogRef.close()
          this._snackbar.open("Updated successfully", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }
  }

  async requireFixReview() {

    if (confirm('Are you sure you want to make this review fixed and skip all updates in the future?')) {

      let _body = {
        question_ID: this.dialogData.question_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'userrequiremakingreviewfixed',
        body: _body
      }

      await this._fetchAPI.postAPI(_payload).then(
        res => {
          this.store.dispatch(QuestionmarketInfoAction())
          this.dialogRef.close()
          this._snackbar.open("Updated successfully", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }

  }

  async userSkipUpdate() {
    if (confirm('Are you sure you want to skip the update of this review?')) {
      
      let _body = {
        question_ID: this.dialogData.question_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'userrequiremakingreviewupdated',
        body: _body
      }

      await this._fetchAPI.postAPI(_payload).then(
        res => {
          this.store.dispatch(QuestionmarketInfoAction())
          this.dialogRef.close()
          this._snackbar.open("Updated successfully", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
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
