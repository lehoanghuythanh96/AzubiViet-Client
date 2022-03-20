import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { Repository } from "typeorm";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserPrivateMessageEntity } from "./userprivatemessage.entity";
export declare class UserPrivateMessageResolver {
    private readonly _userauthService;
    private readonly _userprivatemessageRepository;
    constructor(_userauthService: UserAuthenticationService, _userprivatemessageRepository: Repository<UserPrivateMessageEntity>);
    user_private_messages(user: userJWTpayload): Promise<UserPrivateMessageEntity[]>;
}
