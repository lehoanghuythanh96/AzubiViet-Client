import { createReducer, on } from "@ngrx/store";
import { AdminInfo } from "src/app/models/admininfo/admininfo.interface";
import { AdminInfoSuccessful } from "./admininfo.action";

export interface AdminInfoState {
    admininfo: AdminInfo;
    error: any
}

const admininfo_null: AdminInfo = {
    lessons: [],
    lessoncatlist: [],
    ID: 0,
    user_name: "",
    user_password: "",
    user_secretcode: "",
    user_email: "",
    user_role: "",
    user_level: 0,
    levelup_points: 0,
    user_experience: 0,
    user_stat: "",
    user_avatar: null,
    gender: "Male",
    arealist: [],
    defaultconfig: null,
    user_private_answers: [],
    user_abicoin: 0,
    is_blocked: false,
    punish_point: 0,
    user_inventory: [],
    report_loggers: null
}

const initialState: AdminInfoState = {
    admininfo: admininfo_null,
    error: undefined
}

export const AdminInfoReducer = createReducer(
    initialState,
    on(AdminInfoSuccessful,
        (state, action) => {
            return {
                ...state,
                admininfo: action.admininfo,
                error: null
            }
        }
    )
)