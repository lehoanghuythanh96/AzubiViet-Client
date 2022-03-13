import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { UpdateReviewQuestionAndAnswerContentDialogComponent } from '../update-review-question-and-answer-content-dialog/update-review-question-and-answer-content-dialog.component';

@Component({
  selector: 'app-answer-reviews-table',
  templateUrl: './answer-reviews-table.component.html',
  styleUrls: ['./answer-reviews-table.component.scss']
})
export class AnswerReviewsTableComponent implements OnInit {

  displayedColumns: string[] = ['#', 'Question', 'Action'];

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private _localService: QuestionMarketLocalService
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this._localService.questionmarketinfo$.pipe(
      takeUntil(
        this.destroy$
      ),
      skipWhile(
        y => !y || !y.questionmarketinfo.answer_reviews
      )
    ).subscribe(
      x => {
        this.dataSource.data = x!.questionmarketinfo.answer_reviews!
        this.dataSource.paginator = this.paginator
      }
    )
  }

  openUpdateReviewDialog(
    question_ID: number,
    user_answer_ID: number
  ) {
    this.dialog.open(
      UpdateReviewQuestionAndAnswerContentDialogComponent,
      {
        data: {
          question_ID: question_ID,
          user_answer_ID: user_answer_ID
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
