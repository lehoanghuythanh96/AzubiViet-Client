import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { ShopItemEntity } from "./shopitem.entity";
export declare class ShopItemResolver {
    private readonly fetchDataService;
    constructor(fetchDataService: FetchDataService);
    shop_items(user: userJWTpayload): Promise<ShopItemEntity[]>;
}
