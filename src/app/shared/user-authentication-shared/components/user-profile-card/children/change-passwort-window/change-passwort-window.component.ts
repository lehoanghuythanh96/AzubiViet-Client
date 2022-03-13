import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';

@Component({
  selector: 'app-change-passwort-window',
  templateUrl: './change-passwort-window.component.html',
  styleUrls: ['./change-passwort-window.component.scss']
})
export class ChangePasswortWindowComponent implements OnInit {

  password = new FormControl('', Validators.required);
  confirm_password = new FormControl('', Validators.required);

  error_msg?: string;

  constructor(
    private fetchApiMethodsService: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePasswortWindowComponent>
  ) { }

  ngOnInit(): void {
  }

  confirm() {
    if (
      this.password.valid &&
      this.confirm_password.valid
    ) {

      if (this.password.value != this.confirm_password.value) {
        this.error_msg = `Passwort confirm doesn't match`
        return
      } else {
        this.error_msg = undefined;
      }

      let _body = {
        user_password: this.password.value
      }

      let _payload: postAPI = {
        urlsuffix: 'userchangepassword',
        body: _body
      }

      this.fetchApiMethodsService.postAPI(_payload).then(
        res => {
          this._snackbar.open("Change password successfully, please check your email to confirm your new password.", "Close")
          this.dialogRef.close()
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
