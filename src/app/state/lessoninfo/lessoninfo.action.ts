import { createAction, props } from "@ngrx/store";
import { AreaListEntity, LessonInfo } from "src/app/models/lessoninfo/lessoninfo.interface";

export const LessonInfoAction = createAction(
    '[Lesson Page] Get Lesson Info'
)

export const LessonInfoSuccessful = createAction(
    '[Lesson Page] Get Lesson Info Successfully',
    props<{lessoninfo: LessonInfo}>()
)

export const LessonInfoChooseArea = createAction(
    '[Lesson Page] User choose an area',
    props<{area_ID: number}>()
)