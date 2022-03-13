import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { map, switchMap } from "rxjs/operators"
import { MainLandingPageAPIService } from "src/app/controllers/main-landing-page/APIService/main-landing-page-api.service"
import { MainLandingPageAction, MainLandingPageSuccessful } from "./mainlanding.action"

@Injectable()
export class MainLandingPageInfoEffects {

    constructor(
        private action$: Actions,
        private landingPageAPI: MainLandingPageAPIService
    ) { }

    landingpageinfo$ = createEffect(
        () => {
            return this.action$.pipe(
                ofType(MainLandingPageAction),
                switchMap(
                    () =>  this.landingPageAPI.mainlandingpageapi.pipe(
                        map((result: any) => MainLandingPageSuccessful({ mainlandingpageInfo: result.data.mainlandingpageInfo }))
                    )
                )
            )
        }
    )
}