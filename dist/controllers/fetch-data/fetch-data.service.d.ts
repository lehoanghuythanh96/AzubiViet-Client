import { AreaListEntity } from 'src/models/arealist/arealist.entity';
import { BlackListEntity } from 'src/models/blacklist/blacklist.entity';
import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
import { GuestQAndAEntity } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { LevelTableEntity } from 'src/models/leveltable/leveltable.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { PostCommentEntity } from 'src/models/postComment/postComment.entity';
import { PostLikeEntity } from 'src/models/postLikes/postlike.entity';
import { QuestionMarketAnswerEntity } from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import { QuestionMarketInfoEntity } from 'src/models/questionmarketinfo/questionmarketinfo.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { QuestionProductCategoryEntity } from 'src/models/questionproductcategory/questionproductcategory.entity';
import { ReportLoggerEntity, ReportLoggerTypes } from 'src/models/reportLogger/reportlogger.entity';
import { ChatServerNames, ServerChatEntity } from 'src/models/serverChat/serverchat.entity';
import { ShopItemEntity } from 'src/models/ShopItem/shopitem.entity';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserEntity } from 'src/models/userauthentication/userauth.entity';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { UserNotificationEntity, UserNotificationInput } from 'src/models/usernotifications/usernotifications.entity';
import { UserPrivateMessageEntity, UserPrivateMessageInput } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
export declare class FetchDataService {
    basictools: BasicToolsService;
    readonly mediarepository: Repository<MediaListEntity>;
    cacheManager: AppCache;
    readonly arealistrepository: Repository<AreaListEntity>;
    readonly userNotificationRepository: Repository<UserNotificationEntity>;
    readonly userRepository: Repository<UserEntity>;
    readonly postCommentsRepository: Repository<PostCommentEntity>;
    readonly guestQandARepository: Repository<GuestQAndAEntity>;
    readonly postLikesRepository: Repository<PostLikeEntity>;
    readonly userPrivateMessageRepository: Repository<UserPrivateMessageEntity>;
    readonly reportLoggerRepository: Repository<ReportLoggerEntity>;
    readonly serverChatRepository: Repository<ServerChatEntity>;
    readonly shopItemRepository: Repository<ShopItemEntity>;
    readonly questionmarketanswerrepository: Repository<QuestionMarketAnswerEntity>;
    readonly questionproductcategoryRepository: Repository<QuestionProductCategoryEntity>;
    postrepository: Repository<PostEntity>;
    readonly questionmarketuseranswerRepository: Repository<QuestionMarket_UserAnswerEntity>;
    readonly userAnswerReviewRepository: Repository<UserAnswerReviewEntity>;
    readonly userInventoryRepository: Repository<UserInventoryEntity>;
    readonly lessoncategoryRepository: Repository<LessonCategoryEntity>;
    readonly levelTableRepository: Repository<LevelTableEntity>;
    readonly blackListRepository: Repository<BlackListEntity>;
    readonly questionMarketInfoRepository: Repository<QuestionMarketInfoEntity>;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache, arealistrepository: Repository<AreaListEntity>, userNotificationRepository: Repository<UserNotificationEntity>, userRepository: Repository<UserEntity>, postCommentsRepository: Repository<PostCommentEntity>, guestQandARepository: Repository<GuestQAndAEntity>, postLikesRepository: Repository<PostLikeEntity>, userPrivateMessageRepository: Repository<UserPrivateMessageEntity>, reportLoggerRepository: Repository<ReportLoggerEntity>, serverChatRepository: Repository<ServerChatEntity>, shopItemRepository: Repository<ShopItemEntity>, questionmarketanswerrepository: Repository<QuestionMarketAnswerEntity>, questionproductcategoryRepository: Repository<QuestionProductCategoryEntity>, postrepository: Repository<PostEntity>, questionmarketuseranswerRepository: Repository<QuestionMarket_UserAnswerEntity>, userAnswerReviewRepository: Repository<UserAnswerReviewEntity>, userInventoryRepository: Repository<UserInventoryEntity>, lessoncategoryRepository: Repository<LessonCategoryEntity>, levelTableRepository: Repository<LevelTableEntity>, blackListRepository: Repository<BlackListEntity>, questionMarketInfoRepository: Repository<QuestionMarketInfoEntity>);
    getallusers(): Promise<UserEntity[]>;
    finduserbyEmail(email: string | undefined): Promise<UserEntity>;
    getalluseravatar(): Promise<MediaListEntity[]>;
    getallusernotifications(): Promise<UserNotificationEntity[]>;
    getallReportLogger(): Promise<ReportLoggerEntity[]>;
    getAllLevelPoints(): Promise<LevelTableEntity[]>;
    getAllUserPrivateMessages(): Promise<UserPrivateMessageEntity[]>;
    deleteSingleNotiByID(noti_ID: number, user_id: number): Promise<number>;
    createSingleNoti(input: UserNotificationInput): Promise<void>;
    punishUserByPoint(point_numbers: number, user_id: number): Promise<void>;
    finishReportLogger(item_ID: number, item_type: ReportLoggerTypes): Promise<void>;
    blockAllUserPost(user_ID: number): Promise<void>;
    unblockAllUserPost(user_ID: number): Promise<void>;
    getAllblackListItems(): Promise<BlackListEntity[]>;
    getAll_UserInventories(): Promise<UserInventoryEntity[]>;
    sendprivateMsgtoUser(target_ID: number, sender_ID: number, msgItem: UserPrivateMessageInput): Promise<void>;
    getallarea(): Promise<AreaListEntity[]>;
    getAllPostComments(): Promise<PostCommentEntity[]>;
    getAllguestQandA_items(): Promise<GuestQAndAEntity[]>;
    getAllpostLikes(): Promise<PostLikeEntity[]>;
    getAll_ShopItems(): Promise<ShopItemEntity[]>;
    getall_qanda_IMG(): Promise<MediaListEntity[]>;
    getall_Medias(): Promise<MediaListEntity[]>;
    getalltrashMedias(): Promise<MediaListEntity[]>;
    getallServerChatItems(): Promise<ServerChatEntity[]>;
    deleteall_unused_cdnfiles(user: userJWTpayload): Promise<import("typeorm").DeleteResult>;
    countQAQuestionPunishPoint(QA_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    countQA_Question_ReporterPunishPoints(QA_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    countQAAnswerPunishPoint(QA_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    countQA_Answer_ReporterPunishPoints(QA_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    likeQAAnswer(user_id: number, QA_ID: number, forceLike: boolean): Promise<void>;
    checkStrContent(str: string, sv_name: ChatServerNames, user_ID: number): Promise<boolean>;
    getShopItemNamefromCode(code: string): Promise<string>;
    getShopItemAmountfromCode(code: string, user_ID: number): Promise<number>;
    getShopItemPricefromCode(code: string): Promise<number>;
}
