import { createReducer, on } from "@ngrx/store";
import { QuestionMarketInfo } from "src/app/models/questionmarketinfo/questionmarketinfo.entity";
import { UserEntity } from "src/app/models/userentity/userinfo.entity";
import { UserNotification } from "src/app/models/userNotification/user_notification.entity";
import { removelocaldata } from "src/app/shared/localFns/local-functions.service";
import { UserNotificationFailed, UserNotificationSuccesful } from "./usernotification.action";

export interface UserNotificationState {
    usernotifications: [UserNotification] | null
    errors: any
}

const initialState: UserNotificationState = {
    usernotifications: null,
    errors: undefined
}

export const UserNotificationReducer = createReducer(
    initialState,
    on(UserNotificationSuccesful,
        (state, action) => {
            return {
                ...state,
                usernotifications: action.user_notifications,
                errors: undefined
            }
        }
    ),
    on(UserNotificationFailed,
        (state, action) => {
            alert("[User Notification Failed] " + action.errors)
            removelocaldata()
            window.location.href = "/auth/login"
            return {
                ...state,
                errors: action.errors
            }
        }
    )
)