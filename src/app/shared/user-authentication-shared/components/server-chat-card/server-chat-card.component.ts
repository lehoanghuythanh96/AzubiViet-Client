import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';
import { Socket } from 'ngx-socket-io';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { ServerChatEntity } from 'src/app/models/serverchatitem/serverchatitem.entity';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { BlockChatUserDialogComponent } from './children/block-chat-user-dialog/block-chat-user-dialog.component';
import { ControlKickUserRequirementComponent } from './children/control-kick-user-requirement/control-kick-user-requirement.component';

@Component({
  selector: 'app-server-chat-card',
  templateUrl: './server-chat-card.component.html',
  styleUrls: ['./server-chat-card.component.scss']
})
export class ServerChatCardComponent implements OnInit {

  chatAutoScroll = new FormControl(true)

  msg_content = new FormControl('', Validators.required);

  server_name?: string;
  chatOn = false;

  chat_items: ServerChatEntity[] = [];

  constructor(
    private socket: Socket,
    private apollo: Apollo,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  @ViewChild('chatRoom') chatRoom?: ElementRef<HTMLElement>;

  ngOnInit(): void {

    this.socket.on(emitNames.clientConfirmChatServer, (data: string) => {
      sessionStorage.setItem('chat_server', data)
      this.server_name = data
      this.chatOn = true
      this.loadChatcontent(data)
    })

    if (sessionStorage.getItem('chat_server')) {
      this.socket.emit(emitNames.userChooseChatServer.name, {
        server_name: sessionStorage.getItem('chat_server')
      })
    }

    this.socket.on(emitNames.confirmUserLeavechatroom, () => {
      sessionStorage.removeItem('chat_server')
      this.server_name = undefined
      this.chatOn = false
    })

    this.socket.on(emitNames.acceptReloadServerChatMessages, () => {
      this.loadChatcontent(this.server_name)
    })

    this.socket.on(emitNames.pleaseCheckUserMessagetoKick,
      (
        data: {
          server_name: string,
          user_ID: number,
          user_name: number,
          message_content: string
        }
      ) => {
        this.dialog.open(
          ControlKickUserRequirementComponent,
          {
            width: "400px",
            data: {
              server_name: data.server_name,
              user_ID: data.user_ID,
              user_name: data.user_name,
              message_content: data.message_content
            }
          }
        )
      }
    )

    this.socket.on(emitNames.youWereBlockedFromChatServer,
      (data: {
        blocked_date: Date
      }) => {
        sessionStorage.removeItem('chat_server')
        this.socket.emit(emitNames.userLeavechatroom.name, {
          server_name: this.server_name
        })
        this.chatOn = false
        this._fetchAPI.postAPI({
          urlsuffix: 'remove_all_user_serverchat_content',
          body: {}
        }).then(
          res => {}
        ).catch(
          (error: HttpErrorResponse) => {
            console.log(error.error)
          }
        )
        let _dt = new Date(data.blocked_date)
        this._snackbar.open(`You are blocked from chat server by voting at ${_dt.toLocaleString()}. Please wait 3 days before you can start chat again`, "Close")
      }
    )

  }

  openUserDialog(
    user_ID: number,
    user_name: string,
    message_content: string
  ) {
    const dialogRef = this.dialog.open(
      BlockChatUserDialogComponent,
      {
        width: '400px',
        data: {
          user_ID: user_ID,
          user_name: user_name,
          message_content: message_content,
          server_name: this.server_name
        }
      }
    )
  }

  scrollToBottom(el?: ElementRef): void {
    if (!el || !this.chatAutoScroll.value) {
      return
    }
    try {
      el.nativeElement.scrollTop = el.nativeElement.scrollHeight;
    } catch (error) {
      console.log(error)
    }
  }

  loadChatcontent(svName?: string) {
    if (!svName) {
      return
    }
    this.apollo.watchQuery({
      query: gql`
        query server_chat_items($serverName: String!) {
          server_chat_items(server_name: $serverName) {
            ID,
            message_content,
            message_date,
            server_name,
            user_ID,
            user_email,
            user_name
          }
        }
      `,
      variables: {
        serverName: svName
      }
    }).valueChanges.subscribe(
      (x: any) => {
        this.chat_items = x.data.server_chat_items
        setTimeout(() => this.scrollToBottom(this.chatRoom), 500)
      },
      error => {
        console.log(error)
        this._snackbar.open(error.message, "Close")
      }
    )
  }

  leaveRoom() {
    this.socket.emit(emitNames.userLeavechatroom.name, {
      server_name: this.server_name
    })
  }

  sendMsg() {
    if (this.msg_content.valid) {

      let msg = this.msg_content.value

      let _body = {
        server_name: this.server_name,
        message_content: msg
      }

      let _payload: postAPI = {
        urlsuffix: 'user_send_serverchat_msg',
        body: _body
      }

      this._fetchAPI.postAPI(_payload).then(
        res => {
          this.socket.emit(emitNames.requireUsersReloadServerChatMessages)
          this.msg_content.reset()
          return
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
