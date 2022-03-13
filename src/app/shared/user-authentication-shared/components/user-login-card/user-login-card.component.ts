import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { userJWTpayload } from 'src/app/models/userauth/userauth.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { LoginSuccesful } from 'src/app/state/userauthentication/userlogin.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-login-card',
  templateUrl: './user-login-card.component.html',
  styleUrls: ['./user-login-card.component.scss']
})
export class UserLoginCardComponent implements OnInit {

  showorhide = true;

  loginorsignup = true;

  loginForm = new FormGroup({
    user_email: new FormControl('', [Validators.required, Validators.email]),
    user_password: new FormControl('', [Validators.required]),
    captcha: new FormControl('', [Validators.required])
  })

  signupForm = new FormGroup({
    user_email: new FormControl('', [Validators.required, Validators.email]),
    user_password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required])
  })

  captchaSitekey = environment.RECAPTCHA_SITE_KEY;

  resolvedCaptcha(event: any) {
    this.loginForm.controls.captcha.setValue(event)
  }

  constructor(
    private authService: SocialAuthService,
    private apimediator: FetchApiMethodsService,
    private store: Store,
    private _snackbar: MatSnackBar,
    private router: Router
  ) { }

  redirectRoute() {
    if (this.router.url == '/auth/login') {
      window.location.href = "/"
    } else {
      window.location.href = this.router.url
    }
  }

  ngOnInit(): void {

    if (localStorage.getItem('access_token') || localStorage.getItem('Authorization')) {
      this.showorhide = false;
      this.router.navigate(["/"])
    }

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
          this.redirectRoute()
          this._snackbar.open("Login successfully, please reload page to update your login status", "Close")
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

  form_error = false;
  error_details: any;

  removeError() {
    this.form_error = false;
    this.error_details = undefined;
  }

  onLogin() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.user_email;
      let pw = this.loginForm.value.user_password;

      this.removeError();

      let _body = {
        user_email: email,
        user_password: pw
      }

      let _payload: postAPI = {
        urlsuffix: 'userlogin',
        body: _body
      }

      this.apimediator.postAPI(_payload).then(
        res => {
          this.store.dispatch(LoginSuccesful({ userinfo: res }))
          this._snackbar.open("Login successfully, please reload page to update your login status", "Close")
          this.redirectRoute()
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )
    } else {
      this.form_error = true;
      this.error_details = "Please fill out all required fields..."
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      let _email = this.signupForm.value.user_email;
      let _pw = this.signupForm.value.user_password;
      let _cfpw = this.signupForm.value.confirm_password;
      if (_pw == _cfpw) {
        this.removeError();

        let _body = {
          user_email: _email,
          user_password: _pw
        }

        let _payload: postAPI = {
          urlsuffix: 'newuserregister',
          body: _body
        }

        this.apimediator.postAPI(_payload).then(
          res => {
            this._snackbar.open("Registered successfully, check your email for further information", "Close")
            this.router.navigate(["/"])
          }
        ).catch(
          (error: HttpErrorResponse) => {
            console.log(error.error)
            this._snackbar.open(error.error.message, "Close")
          }
        )

      } else {
        this.form_error = true;
        this.error_details = "Password confirmation doesn't matched, please check it again..."
      }
    } else {
      this._snackbar.open("Please fill out all the required fields", "Close")
    }
  }

}

interface GGLoginauthBody {
  idToken: string
}
