import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';

@Component({
  selector: 'app-control-question-report',
  templateUrl: './control-question-report.component.html',
  styleUrls: ['./control-question-report.component.scss']
})
export class ControlQuestionReportComponent implements OnInit {

  question!: PostEntity;
  question_imgnames: string[] = [];

  isReport = false;
  report_notes!: string;

  get cdnfolder() {
    return this._localService.addquestionproduct.cdnfolder
  }

  constructor(
    private route: ActivatedRoute,
    private _localService: QuestionMarketLocalService,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
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
        takeUntil(
          this.destroy$
        )
      )
    ]).subscribe(
      val => {

        if (!val[0].isReport) {

          this.isReport = false;

          let _body = {
            question_ID: val[0].question_ID
          }

          let _payload: postAPI = {
            urlsuffix: 'reportedquestion_authorrequiredata',
            body: _body
          }

          this._fetchAPI.postAPI(_payload).then(
            res => {
              this.question = res
              this.question_imgnames = this.question.question_imgs.map(
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

          this.isReport = true;
          this.question = val[1].find(
            y => y.ID == val[0].question_ID && y.report_sender == parseInt(localStorage.getItem('user_id')!)
          )!

          if (!this.question) {
            return
          }

          this.report_notes = this.question.report_notes

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
