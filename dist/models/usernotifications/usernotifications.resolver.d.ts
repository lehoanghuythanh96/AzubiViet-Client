import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserNotificationEntity } from "./usernotifications.entity";
export declare class UserNotificationResolver {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    user_notifications(user: userJWTpayload): Promise<UserNotificationEntity[]>;
    delete_single_notification(user: userJWTpayload, notification_ID: number): Promise<number>;
}
