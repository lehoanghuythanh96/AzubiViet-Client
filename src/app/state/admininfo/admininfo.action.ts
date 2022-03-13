import { createAction, props } from "@ngrx/store";
import { AdminInfo } from "src/app/models/admininfo/admininfo.interface";

export const AdminInfoAction = createAction(
    '[Admin Dashboard] Get Admin Info'
)

export const AdminInfoSuccessful = createAction(
    '[Admin Dashboard] Get Admin Info Successfully',
    props<{admininfo: AdminInfo}>()
)