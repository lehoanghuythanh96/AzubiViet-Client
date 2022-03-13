import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';

@Component({
  selector: 'app-control-kick-user-requirement',
  templateUrl: './control-kick-user-requirement.component.html',
  styleUrls: ['./control-kick-user-requirement.component.scss']
})
export class ControlKickUserRequirementComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ControlKickUserRequirementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      user_ID: number,
      user_name: string,
      message_content: string,
      server_name: string
    },
    private socket: Socket
  ) { }

  ngOnInit(): void {
  }

  submitResult(result: boolean) {
    this.socket.emit(emitNames.confirmKickUserRequest, {
      result,
      user_ID: this.data.user_ID
    })
    this.dialogRef.close()
  }

}
