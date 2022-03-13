import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { userJWTpayload } from 'src/app/models/userauth/userauth.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { LoginSuccesful } from 'src/app/state/userauthentication/userlogin.action';

@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.scss']
})
export class UserLoginPageComponent implements OnInit {

  constructor(
    private authService: SocialAuthService,
    private apimediator: FetchApiMethodsService,
    private store: Store,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: SocialUser) => {
      let _body: GGLoginauthBody = {
        idToken: user.idToken
      }
      let _payload: postAPI = {
        urlsuffix: 'userGGlogin',
        body: _body
      }
      this.apimediator.postAPI(_payload).then(
        (response: userJWTpayload) => {
          this.store.dispatch(LoginSuccesful({ userinfo: response }))
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.message)
          this._snackbar.open(error.error.message, "Close")
        }
      )
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}

interface GGLoginauthBody {
  idToken: string
}
