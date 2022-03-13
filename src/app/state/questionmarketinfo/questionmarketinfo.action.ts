import { createAction, props } from "@ngrx/store";
import { QuestionMarketInfo } from "src/app/models/questionmarketinfo/questionmarketinfo.entity";

export const QuestionmarketInfoAction = createAction(
    '[Question Market] Get Question Market Information'
)

export const QuestionmarketInfoSuccesful = createAction(
    '[Question Market] Get Question Market Information Succesfully',
    props<{questionmarketinfo: QuestionMarketInfo}>()
)

export const QuestionmarketInfoFailed = createAction(
    '[Question Market] Get Question Market Information Failed',
    props<{errors: any}>()
)