import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';

@Component({
  selector: 'app-false-original-answer-message',
  templateUrl: './false-original-answer-message.component.html',
  styleUrls: ['./false-original-answer-message.component.scss']
})
export class FalseOriginalAnswerMessageComponent implements OnInit {

  messageContent = new FormControl('', Validators.required)

  constructor(
    private fetchDataService: FetchApiMethodsService,
    public dialogRef: MatDialogRef<FalseOriginalAnswerMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      question_ID: number
    },
    private socket: Socket,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  confirmMessage() {

    if (this.messageContent.valid) {

      let _body = {
        question_ID: this.data.question_ID,
        message_content: this.messageContent.value
      }

      let _payload: postAPI = {
        urlsuffix: 'sendprivatemessagetoquestionauthor',
        body: _body
      }

      this.fetchDataService.postAPI(_payload).then(
        res => {
          if (res.selectedUsers && res.selectedUsers.length) {
            this.socket.emit(emitNames.requireUsersReloadPrivateMessages.name, {
              userIDarr: res.selectedUsers
            })
          }
          this.dialogRef.close();
          this._snackbar.open("Message sent successfully", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.error(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    }

  }

}
