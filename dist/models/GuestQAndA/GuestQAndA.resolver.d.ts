import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { MediaListEntity } from "../media/media.entity";
import { GuestQAndAEntity } from "./GuestQAndA.entity";
export declare class GuestQAndAResolver {
    private _fetchdataService;
    constructor(_fetchdataService: FetchDataService);
    guest_QAs(): Promise<GuestQAndAEntity[]>;
    like_arr(QAItem: GuestQAndAEntity): Promise<number[]>;
    QA_imgs(GuestQA: GuestQAndAEntity): Promise<MediaListEntity[]>;
}
