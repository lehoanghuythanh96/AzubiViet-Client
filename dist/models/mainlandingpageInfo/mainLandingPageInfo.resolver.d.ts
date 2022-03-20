import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { Repository } from "typeorm";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { GuestQAndAEntity } from "../GuestQAndA/GuestQAndA.entity";
import { PostEntity } from "../post/post.entity";
import { MainLandingPageEntity } from "./mainLandingPageInfo.entity";
export declare class MainLandingPageInfoResolver {
    private readonly mainlandingpagerepository;
    private _fetchdataService;
    private lessonhandlerService;
    private questionmarketService;
    private _userauthService;
    constructor(mainlandingpagerepository: Repository<MainLandingPageEntity>, _fetchdataService: FetchDataService, lessonhandlerService: LessonHandlerService, questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService);
    mainlandingpageInfo(): Promise<MainLandingPageEntity[]>;
    all_comments(): Promise<GuestQAndAEntity[]>;
    all_QandA(): Promise<GuestQAndAEntity[]>;
    all_lessons(): Promise<PostEntity[]>;
    all_questionproducts(): Promise<PostEntity[]>;
    defaultconfig(): DefaultConfigEntity;
}
