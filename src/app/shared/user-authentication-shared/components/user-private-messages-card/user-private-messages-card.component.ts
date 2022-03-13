import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { UserPrivateMessageEntity } from 'src/app/models/userprivatemessage/userprivatemessage.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';

@Component({
  selector: 'app-user-private-messages-card',
  templateUrl: './user-private-messages-card.component.html',
  styleUrls: ['./user-private-messages-card.component.scss']
})
export class UserPrivateMessagesCardComponent implements OnInit {

  allMsgs: UserPrivateMessageEntity[] = []

  openOptions: boolean[] = []

  constructor(
    private apollo: Apollo,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private socket: Socket
  ) { }

  ngOnInit(): void {

    this.socket.on(emitNames.reloadPrivateMessages, () => {
      this.loadMsgs()
    })

    this.loadMsgs()

  }

  loadMsgs() {

    this.apollo.watchQuery({
      query: gql`
        query user_private_messages {
          user_private_messages {
            ID,
            message_content,
            message_date,
            sender_email,
            sender_ID,
            user_ID,
          }
        }
      `
    }).valueChanges.subscribe(
      (res: any) => {
        this.allMsgs = [...res.data.user_private_messages]
        this.allMsgs.sort((a,b) => {return b.ID - a.ID})
        this.allMsgs.forEach(
          y => {
            this.openOptions.push(false)
          }
        )
      }
    )

  }

  userBlockEmail(msg_ID: number) {

    if (confirm("Are you sure you want to block this email? You will not receive any message from this email anymore, and all the messages from this email will be deteled from your list.")) {

      let _body = {
        msg_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'userblockemailfromprivatemessage',
        body: _body
      }

      this._fetchAPI.postAPI(_payload).then(
        res => { 
          this.loadMsgs()
          this._snackbar.open("Blocked successfully", "Close")
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          console.log(error.error.message,"Close")
        }
      )

    }

  }

}
