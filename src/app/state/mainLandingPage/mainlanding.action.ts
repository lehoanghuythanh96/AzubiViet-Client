import { createAction, props } from "@ngrx/store";
import { MainLandingPageInfo } from "src/app/models/mainLandingPage/mainlandingpage.entity";

export const MainLandingPageAction = createAction(
    '[Main Landing Page] Get Main Landing Page Info'
)

export const MainLandingPageSuccessful = createAction(
    '[Main Landing Page] Get Main Landing Page Info Successfully',
    props<{mainlandingpageInfo: MainLandingPageInfo}>()
)