import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, map, switchMap } from "rxjs/operators"
import { UserAuthenticationAPIService } from "src/app/controllers/user-authentication/ApiService/user-authentication-api.service"
import { UserNotificationAction, UserNotificationFailed, UserNotificationSuccesful } from "./usernotification.action"

@Injectable()
export class UserNotificationEffects {

    constructor(
        private action$: Actions,
        private _userauthAPI: UserAuthenticationAPIService
    ) { }

    getusernotifications$ = createEffect(
        () => {
            return this.action$.pipe(
                ofType(UserNotificationAction),
                switchMap(
                    () =>  this._userauthAPI.getusernotificationapi.pipe(
                        map((result: any) => UserNotificationSuccesful({ user_notifications: result.data.user_notifications })),
                        catchError((error: any) => of(UserNotificationFailed({errors: error})))
                    )
                )
            )
        }
    )
}