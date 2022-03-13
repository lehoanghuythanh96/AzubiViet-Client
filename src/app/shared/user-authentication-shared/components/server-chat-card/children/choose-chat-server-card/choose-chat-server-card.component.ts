import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { ChatServerNames, emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { UserLoginCardComponent } from '../../../user-login-card/user-login-card.component';

@Component({
  selector: 'app-choose-chat-server-card',
  templateUrl: './choose-chat-server-card.component.html',
  styleUrls: ['./choose-chat-server-card.component.scss']
})
export class ChooseChatServerCardComponent implements OnInit {

  names : any = ChatServerNames

  nameList: {
    name: string,
    size: number
  }[] = [];

  constructor(
    private socket: Socket,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    Object.keys(this.names).forEach(
      (item) => {
        this.nameList.push(
          {
            name: this.names[item],
            size: 0
          }
        );
      }
    )

    this.socket.emit(emitNames.userRequireServerSize)
    this.socket.on(emitNames.clientGetServerSize, (data: number[]) => {
      for (let i = 0; i < data.length; i++) {
        this.nameList[i].size = data[i]
      }
    })
  }

  chooseServer(sv_name: string) {

    if (!localStorage.getItem('user_id')) {
      this.bottomSheet.open(
        UserLoginCardComponent
      )
      return
    }

    this.socket.emit(emitNames.userChooseChatServer.name, {
      server_name: sv_name
    })
  }

}
