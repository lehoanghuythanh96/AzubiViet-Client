import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Socket } from 'ngx-socket-io';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';

@Component({
  selector: 'app-block-chat-user-dialog',
  templateUrl: './block-chat-user-dialog.component.html',
  styleUrls: ['./block-chat-user-dialog.component.scss']
})
export class BlockChatUserDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      server_name: string
      user_ID: number
      user_name: string
      message_content: string
    },
    private socket: Socket,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<BlockChatUserDialogComponent>
  ) { }

  ngOnInit(): void {
    this.socket.on(emitNames.kickRequirementAccepted,
      () => {
        this.dialogRef.close()
        this._snackbar.open("Kick user requirement accepted, please wait for other people to control it", "Close")
      }
    )
  }

  requireKickUser() {
    this.socket.emit(emitNames.userRequireKickUser.name,
      {
        server_name: this.data.server_name,
        user_ID: this.data.user_ID,
        message_content: this.data.message_content,
        user_name: this.data.user_name
      }
    )
  }

}
