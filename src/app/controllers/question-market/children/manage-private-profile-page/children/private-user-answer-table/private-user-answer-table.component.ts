import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { GraphQLError } from 'graphql';
import { Socket } from 'ngx-socket-io';
import { combineLatest, Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/app/models/questionmarketuseranswer/questionmarketuseranswer.entity';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';
import { MatDialog } from '@angular/material/dialog'
import { ClearReportBoxComponent } from './children/clear-report-box/clear-report-box.component';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-private-user-answer-table',
  templateUrl: './private-user-answer-table.component.html',
  styleUrls: ['./private-user-answer-table.component.scss']
})
export class PrivateUserAnswerTableComponent implements OnInit {

  allquestion!: PostEntity[];

  dataSource = new MatTableDataSource<QuestionMarket_UserAnswerEntity>();
  displayedColumns: string[] = ['#', 'question_name', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store,
    private _localService: QuestionMarketLocalService,
    private apollo: Apollo,
    private _snackbar: MatSnackBar,
    private socket: Socket,
    private dialog: MatDialog,
    private fetchapimethods: FetchApiMethodsService
  ) { }



  ngOnInit(): void {
    combineLatest([
      this._localService.questionmarketinfo$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x || !x.questionmarketinfo.userinfo?.user_private_answers
        )
      ),
      this._localService.allquestions$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x
        )
      )
    ]).subscribe(
      _x => {

        let allprivateAnswer = _x[0]!.questionmarketinfo.userinfo?.user_private_answers!
        this.allquestion = _x[1]

        this.dataSource.data = allprivateAnswer
        this.dataSource.paginator = this.paginator

      }
    )
  }

  reportExpiredAnswer(user_answer_ID: number) {

    let _payload: postAPI = {
      urlsuffix: 'userreportexpiredanswer',
      body: {
        user_answer_ID
      }
    }

    this.fetchapimethods.postAPI(_payload).then(
      res => {
        if (res.selectedUsers && res.selectedUsers.length) {
          this.socket.emit(emitNames.requireUserReloadNotis.name, {
            userIDarr: res.selectedUsers
          })
        }
        this._snackbar.open("Reported successfully, your answer is now being reviewed again by other users, you got 1 Abicoin for this action", "Close")
        this.store.dispatch(QuestionmarketInfoAction())
      }
    ).catch(
      (error: HttpErrorResponse) => {
        console.log(error.error)
        this._snackbar.open(error.error.message, "Close")
      }
    )

  }

  questionName(ID: number) {
    return this.allquestion.find(
      y => y.ID == ID
    )?.post_title
  }

  clearReport(user_answer_ID: number) { 
    const dialogRef = this.dialog.open(
      ClearReportBoxComponent,
      {
        width: '400px',
        data: {
          user_answer_ID
        }
      }
    )
  }

  deleteAnswerItem(answer_ID: number) {

    this.apollo.mutate({
      mutation: gql`
        mutation delete_single_user_answer($answer_ID: Float!) {
          delete_single_user_answer(answer_ID: $answer_ID)
        }
      `,
      variables: {
        answer_ID
      }
    }).subscribe(
      (res: any) => {
        if (res.data.delete_single_user_answer.selectedUsers) {
          this.socket.emit(emitNames.requireUserReloadNotis.name, {
            userIDarr: res.data.delete_single_user_answer.selectedUsers
          })
        }
        this.store.dispatch(QuestionmarketInfoAction())
        this.store.dispatch(UserNotificationAction())
        this._snackbar.open("Answer deleted successfully", "Close")
      },
      (error: GraphQLError) => {
        console.log(error.message)
        this._snackbar.open(error.message, "Close")
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
