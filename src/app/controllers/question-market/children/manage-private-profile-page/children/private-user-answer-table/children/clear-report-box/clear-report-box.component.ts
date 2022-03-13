import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { Socket } from 'ngx-socket-io';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { ShopItemEntity } from 'src/app/models/shopitem/shopitem.entity';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clear-report-box',
  templateUrl: './clear-report-box.component.html',
  styleUrls: ['./clear-report-box.component.scss']
})
export class ClearReportBoxComponent implements OnInit {

  heroItem?: ShopItemEntity
  hero_avatar?: string

  constructor(
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: {
      user_answer_ID: number
    },
    private fetchApi: FetchApiMethodsService,
    private store: Store,
    private dialogRef: MatDialogRef<ClearReportBoxComponent>,
    private _snackbar: MatSnackBar,
    private socket: Socket
  ) { }

  ngOnInit(): void {

    this.apollo.watchQuery({
      query: gql`
        query shop_items {
          shop_items {
            ID,
            item_code,
            item_price,
            item_name,
            item_avatar,
            avatar_path,
            item_description
          }
        }
      `
    }).valueChanges.subscribe(
      (res: any) => {

        let allItems: ShopItemEntity[] = res.data.shop_items

        this.heroItem = allItems.find(
          y => y.item_code == 'RPFT'
        )
        if (!this.heroItem) {
          return
        }

        this.hero_avatar = environment.BASE_CDN_URL + '/' + this.heroItem.avatar_path + this.heroItem.item_avatar

      }
    )

  }

  confirmClear() {

    let _payload: postAPI = {
      urlsuffix: 'userconfirmclearanswerreport',
      body: {
        user_answer_ID: this.data.user_answer_ID
      }
    }

    this.fetchApi.postAPI(_payload).then(
      res => {
        if (res.selectedUsers && res.selectedUsers.length) {
          this.socket.emit(emitNames.requireUserReloadNotis.name, {
            userIDarr: res.selectedUsers
          })
        }
        this.dialogRef.close()
        this._snackbar.open("Cleared successfully", "Close")
        this.store.dispatch(QuestionmarketInfoAction())
      }
    ).catch(
      (error: HttpErrorResponse) => {
        console.log(error.error)
        this._snackbar.open(error.error.message, "Close")
      }
    )

  }

}
