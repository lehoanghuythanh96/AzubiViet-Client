import { createReducer, on } from "@ngrx/store";
import { QuestionMarketInfo } from "src/app/models/questionmarketinfo/questionmarketinfo.entity";
import { UserEntity } from "src/app/models/userentity/userinfo.entity";
import { removelocaldata } from "src/app/shared/localFns/local-functions.service";
import { QuestionmarketInfoFailed, QuestionmarketInfoSuccesful } from "./questionmarketinfo.action";

export interface QuestionMarketInfoState {
    questionmarketinfo: QuestionMarketInfo
    errors: any
}

const initialState: QuestionMarketInfoState = {
    questionmarketinfo: {
        product_tree: null,
        userinfo: null,
        defaultconfig: null,
        answer_reviews: null,
        shop_items: null
    },
    errors: undefined
}

export const QuestionMarketInfoReducer = createReducer(
    initialState,
    on(QuestionmarketInfoSuccesful,
        (state, action) => {
            return {
                ...state,
                questionmarketinfo: action.questionmarketinfo,
                errors: undefined
            }
        }
    ),
    on(QuestionmarketInfoFailed,
        (state, action) => {
            alert(`[Question Market Info Failed] ${action.errors}`)
            removelocaldata()
            window.location.href = "/auth/login"
            return {
                ...state,
                errors: action.errors
            }
        }
    )
)