import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { AddCategoryBody } from 'src/app/models/lessoncategoryentity/lessoncategory.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class QuestionMarketAddCategoryDialogComponent implements OnInit {

  cat_name = new FormControl('', Validators.required)

  constructor(
    public dialogRef: MatDialogRef<QuestionMarketAddCategoryDialogComponent>,
    private _api: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private store: Store,
    private _localService: QuestionMarketLocalService
  ) { }

  ngOnInit(): void {}

  onclose(): void {
    this.dialogRef.close();
  }

  confirm(): void {

    let _parent_ID = this._localService.addquestionproduct.area_ID;
    if (_parent_ID &&  this.cat_name.valid) {

      let _body : AddCategoryBody = {
        category_name: this.cat_name.value,
        area_ID: _parent_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'addquestionproductcategory',
        body: _body
      }

      this._api.postAPI(_payload).then(
        response => {
          this.store.dispatch(QuestionmarketInfoAction())
          this._snackbar.open("Category added successfully", "Close")
          console.log(response)
          this.dialogRef.close();
        }
      ).catch(
        (error: HttpErrorResponse) => {
          this._snackbar.open(error.error.message, "Close");
        });

    } else { 
      this._snackbar.open("Please choose an area first...", "Close");
      this.dialogRef.close();
    }
  }

}
