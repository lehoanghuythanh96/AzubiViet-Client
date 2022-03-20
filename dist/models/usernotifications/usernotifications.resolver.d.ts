import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { Repository } from "typeorm";
import { AppCache } from "../cacheKeys/cacheKeys.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserNotificationEntity } from "./usernotifications.entity";
export declare class UserNotificationResolver {
    private readonly _userauthService;
    private readonly _userNotificationRepository;
    private cacheManager;
    constructor(_userauthService: UserAuthenticationService, _userNotificationRepository: Repository<UserNotificationEntity>, cacheManager: AppCache);
    user_notifications(user: userJWTpayload): Promise<UserNotificationEntity[]>;
    delete_single_notification(user: userJWTpayload, notification_ID: number): Promise<number>;
}
