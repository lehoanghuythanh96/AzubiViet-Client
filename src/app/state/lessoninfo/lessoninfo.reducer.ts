import { createReducer, on } from "@ngrx/store";
import { AreaListEntity, LessonInfo } from "src/app/models/lessoninfo/lessoninfo.interface";
import { LessonInfoChooseArea, LessonInfoSuccessful } from "./lessoninfo.action";

export interface LessonInfoState {
    lessoninfo: LessonInfo
    choosed_area: number
    error: any
}

const initialState: LessonInfoState = {
    lessoninfo: {
        lesson_tree: null,
        defaultconfig: null,
        all_lessons: null
    },
    choosed_area: 0,
    error: undefined
}

export const LessonInfoReducer = createReducer(
    initialState,
    on(LessonInfoSuccessful,
        (state, action) => {
            return {
                ...state,
                lessoninfo: action.lessoninfo,
                error: null
            }
        }
    ),
    on(LessonInfoChooseArea,
        (state, action) => {
            return {
                ...state,
                choosed_area: action.area_ID,
            }
        }
    )
)