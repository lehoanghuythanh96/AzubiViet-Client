import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, map, switchMap } from "rxjs/operators"
import { QuestionMarketAPIService } from "src/app/controllers/question-market/APIService/question-market-api.service"
import { QuestionmarketInfoAction, QuestionmarketInfoFailed, QuestionmarketInfoSuccesful } from "./questionmarketinfo.action"

@Injectable()
export class QuestionMarketInfoEffects {

    constructor(
        private action$: Actions,
        private _questionmarketapi: QuestionMarketAPIService
    ) { }

    getquestionmarketinfo$ = createEffect(
        () => {
            return this.action$.pipe(
                ofType(QuestionmarketInfoAction),
                switchMap(
                    () =>  this._questionmarketapi.getquestionmarketinfoapi.pipe(
                        map((result: any) => QuestionmarketInfoSuccesful({ questionmarketinfo: result.data.questionmarketinfo })),
                        catchError((error: any) => of(QuestionmarketInfoFailed({errors: error})))
                    )
                )
            )
        }
    )
}