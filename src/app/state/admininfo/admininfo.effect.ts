import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import { AdminAreaAPIService } from "src/app/controllers/admin-area/APIservice/admin-area-api.service"
import { AdminInfoAction, AdminInfoSuccessful } from "./admininfo.action"

@Injectable()
export class AdminInfoEffects {

    constructor(
        private action$: Actions,
        private _adminapi: AdminAreaAPIService
    ) { }

    getadmininfo$ = createEffect(
        () => {
            return this.action$.pipe(
                ofType(AdminInfoAction),
                switchMap(
                    () =>  this._adminapi.getadmininfoapi.pipe(
                        map((result: any) => AdminInfoSuccessful({ admininfo: result.data.admininfo }))
                    )
                )
            )
        }
    )
}