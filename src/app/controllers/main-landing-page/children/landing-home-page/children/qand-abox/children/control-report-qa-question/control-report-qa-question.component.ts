import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { GuestQandAEntity } from 'src/app/models/guestQandA/guestQandA.entity';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';

@Component({
  selector: 'app-control-report-qa-question',
  templateUrl: './control-report-qa-question.component.html',
  styleUrls: ['./control-report-qa-question.component.scss']
})
export class ControlReportQAQuestionComponent implements OnInit {

  question_item!: GuestQandAEntity

  answer_item!: GuestQandAEntity

  constructor(
    public dialogRef: MatDialogRef<ControlReportQAQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      QA_Item: GuestQandAEntity,
      noti_type: string,
      noti_ID: number,
      QA_Question_Item: GuestQandAEntity
    },
    private _fetchAPI: FetchApiMethodsService,
    private socket: Socket,
    private store: Store,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (!this.data.QA_Question_Item) {
      this.question_item = this.data.QA_Item
    } else {
      this.question_item = this.data.QA_Question_Item
      this.answer_item = this.data.QA_Item
    }
  }

  confirmReport(
    _result: boolean
  ) {

    if (this.data.noti_type == 'question_reported') {

      let _body = {
        report_result: _result,
        QA_ID: this.question_item.ID,
        notification_ID: this.data.noti_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'confirm_report_invalid_qa_question',
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
          this.dialogRef.close();
          this._snackbar.open("Report confirmed successfully", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }

    if (this.data.noti_type == 'answer_reported') {

      let _body = {
        report_result: _result,
        QA_ID: this.answer_item.ID,
        notification_ID: this.data.noti_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'confirm_report_invalid_qa_answer',
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
          this.dialogRef.close();
          this._snackbar.open("Report confirmed successfully", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }

  }

}
