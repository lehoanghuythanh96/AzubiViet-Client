import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { map, switchMap } from "rxjs/operators"
import { LessonPageAPIService } from "src/app/controllers/lesson-page/APIservice/lesson-page-api.service"
import { LessonInfoAction, LessonInfoSuccessful } from "./lessoninfo.action"

@Injectable()
export class LessonInfoEffects {

    constructor(
        private action$: Actions,
        private _lessonapi: LessonPageAPIService
    ) { }

    getlessoninfo$ = createEffect(
        () => {
            return this.action$.pipe(
                ofType(LessonInfoAction),
                switchMap(
                    () =>  this._lessonapi.getlessoninfoapi.pipe(
                        map((result: any) => LessonInfoSuccessful({ lessoninfo: result.data.lesson_page }))
                    )
                )
            )
        }
    )
}