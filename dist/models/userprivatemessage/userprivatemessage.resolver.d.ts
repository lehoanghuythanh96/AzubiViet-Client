import { FetchDataService } from 'src/controllers/fetch-data/fetch-data.service';
import { userJWTpayload } from '../userJWTpayload/userJWTpayload.interface';
import { UserPrivateMessageEntity } from './userprivatemessage.entity';
export declare class UserPrivateMessageResolver {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    user_private_messages(user: userJWTpayload): Promise<UserPrivateMessageEntity[]>;
}
