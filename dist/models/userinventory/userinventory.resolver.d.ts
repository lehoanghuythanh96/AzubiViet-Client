import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserInventoryEntity } from "./userinventory.entity";
export declare class UserInventoryResolver {
    private readonly fetchDataService;
    private readonly userService;
    constructor(fetchDataService: FetchDataService, userService: UserAuthenticationService);
    user_inventory(user: userJWTpayload): Promise<UserInventoryEntity[]>;
    item_name(UserInventoryEntity: UserInventoryEntity): Promise<string>;
    item_avatar(UserInventoryEntity: UserInventoryEntity): Promise<string>;
    item_description(UserInventoryEntity: UserInventoryEntity): Promise<string>;
}
