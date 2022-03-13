import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { ShopItemEntity } from 'src/app/models/shopitem/shopitem.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';

@Component({
  selector: 'app-shop-item-single-card',
  templateUrl: './shop-item-single-card.component.html',
  styleUrls: ['./shop-item-single-card.component.scss']
})
export class ShopItemSingleCardComponent implements OnInit {

  amount = new FormControl(1, [Validators.required, Validators.min(1)]);

  @Input()
  item!: ShopItemEntity;

  @Input()
  cdnpath!: string;

  constructor(
    private fetchApi: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  buy() {
    if (this.amount.valid && confirm(`Are you sure you want to buy ${this.amount.value} "${this.item.item_name}"?`)) {

      let _body = {
        item_code: this.item.item_code,
        quantity: this.amount.value
      }

      let _payload: postAPI = {
        urlsuffix: 'userbuyashopitem',
        body: _body
      }

      this.fetchApi.postAPI(_payload).then(
        res => {
          this._snackbar.open("Bought successfully", "Close")
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

  changeAmount(num: number) {
    let curr = this.amount.value + num;
    if (curr >= 1) {
      this.amount.setValue(curr)
    }
    return
  }

}
