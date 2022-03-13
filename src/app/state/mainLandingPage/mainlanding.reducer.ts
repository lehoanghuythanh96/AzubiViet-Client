import { createReducer, on } from "@ngrx/store";
import { MainLandingPageInfo } from "src/app/models/mainLandingPage/mainlandingpage.entity";
import { MainLandingPageSuccessful } from "./mainlanding.action";

export interface MainLandingPageInfoState {
    mainlandingpageInfo: MainLandingPageInfo
    error: any
}

const initialState: MainLandingPageInfoState = {
    mainlandingpageInfo: {
        all_comments: null,
        all_QandA: null,
        defaultconfig: null,
        all_lessons: null,
        all_questionproducts: null
    },
    error: undefined
}

export const MainLandingPageInfoReducer = createReducer(
    initialState,
    on(MainLandingPageSuccessful,
        (state, action) => {
            return {
                ...state,
                mainlandingpageInfo: action.mainlandingpageInfo,
                error: null
            }
        }
    )
)