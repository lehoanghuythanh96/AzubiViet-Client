import { createAction, props } from "@ngrx/store";
import { UserNotification } from "src/app/models/userNotification/user_notification.entity";

export const UserNotificationAction = createAction(
    '[User Notification] Get User Notifications'
)

export const UserNotificationSuccesful = createAction(
    '[User Notification] Get User Notifications Succesfully',
    props<{user_notifications: [UserNotification]}>()
)

export const UserNotificationFailed = createAction(
    '[User Notification] Get User Notifications Failed',
    props<{errors: any}>()
)