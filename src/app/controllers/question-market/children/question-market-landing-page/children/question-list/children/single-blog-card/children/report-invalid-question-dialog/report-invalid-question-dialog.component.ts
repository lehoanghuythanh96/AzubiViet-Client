import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { ReportAnswerReviewDialogComponent } from 'src/app/controllers/question-market/children/check-review-page/children/report-answer-review-dialog/report-answer-review-dialog.component';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';

@Component({
  selector: 'app-report-invalid-question-dialog',
  templateUrl: './report-invalid-question-dialog.component.html',
  styleUrls: ['./report-invalid-question-dialog.component.scss']
})
export class ReportInvalidQuestionDialogComponent implements OnInit {

  reportNotes = new FormControl('', Validators.required)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      question_ID: number
    },
    public dialogRef: MatDialogRef<ReportAnswerReviewDialogComponent>,
    private socket: Socket,
    private _snackbar: MatSnackBar,
    private router: Router,
    private store: Store,
    private _fetchAPI: FetchApiMethodsService,
  ) { }

  ngOnInit(): void {
  }

  confirmReport() {
    if (this.reportNotes.valid && confirm("Are you sure you want to submit this report?")) {

      let _body = {
        question_ID: this.data.question_ID,
        report_notes: this.reportNotes.value
      }

      let _payload: postAPI = {
        urlsuffix: 'report_invalid_question',
        body: _body
      }

      this._fetchAPI.postAPI(_payload).then(
        res => {
          if (res.selectedUsers && res.selectedUsers.length) {
            this.socket.emit(emitNames.requireUserReloadNotis.name, {
              userIDarr: res.selectedUsers
            })
          }
          this.dialogRef.close()
          this._snackbar.open("Report is submitted successfully", "Close")
          this.router.navigate(['/questionmarket'])
          this.store.dispatch(UserNotificationAction())
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }
  }

}
