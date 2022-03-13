import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';

@Component({
  selector: 'app-report-invalid-qa-question-dialog',
  templateUrl: './report-invalid-qa-question-dialog.component.html',
  styleUrls: ['./report-invalid-qa-question-dialog.component.scss']
})
export class ReportInvalidQAQuestionDialogComponent implements OnInit {

  reportNotes = new FormControl('', Validators.required)

  constructor(
    private socket: Socket,
    @Inject(MAT_DIALOG_DATA) public data: {
      QA_ID: number
    },
    private fetchapimethods: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private store: Store,
    private dialogRef: MatDialogRef<ReportInvalidQAQuestionDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  confirmReport() {

    if (confirm("Are you sure you want to report this question?")) {

      let _body = {
        QA_ID: this.data.QA_ID,
        report_notes: this.reportNotes.value
      }

      let _payload: postAPI = {
        urlsuffix: 'report_invalid_QA_Question',
        body: _body
      }

      this.fetchapimethods.postAPI(_payload).then(
        res => {
          if (res.selectedUsers && res.selectedUsers.length) {
            this.socket.emit(emitNames.requireUserReloadNotis.name, {
              userIDarr: res.selectedUsers
            })
          }
          this._snackbar.open("Report is submitted successfully", "Close")
          this.store.dispatch(UserNotificationAction())
          this.dialogRef.close()
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
