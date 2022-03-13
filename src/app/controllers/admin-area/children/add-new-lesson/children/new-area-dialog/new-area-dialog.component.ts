import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { AdminInfoAction } from 'src/app/state/admininfo/admininfo.action';

@Component({
  selector: 'app-new-area-dialog',
  templateUrl: './new-area-dialog.component.html',
  styleUrls: ['./new-area-dialog.component.scss']
})
export class NewAreaDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewAreaDialogComponent>,
    private _api: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  onclose(): void {
    this.dialogRef.close();
  }

  confirmarea(name: string): void {
    
    let _body = {
      area_name: name
    }

    let _payload: postAPI = {
      urlsuffix: 'addsinglearea',
      body: _body
    }

    this._api.postAPI(_payload).then(
      response => {
        this.store.dispatch(AdminInfoAction())
        this.dialogRef.close();
      }
    ).catch(
      (error: HttpErrorResponse) => {
      this._snackbar.open(error.error.message, "Close");
    });
    
  }

}
