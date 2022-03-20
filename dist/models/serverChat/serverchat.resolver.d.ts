import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { ServerChatEntity } from "./serverchat.entity";
export declare class ServerChatResolver {
    private readonly fetchDataService;
    constructor(fetchDataService: FetchDataService);
    server_chat_items(server_name: string, user: userJWTpayload): Promise<ServerChatEntity[]>;
}
