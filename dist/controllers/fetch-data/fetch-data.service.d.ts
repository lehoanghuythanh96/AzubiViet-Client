import { AreaListEntity } from 'src/models/arealist/arealist.entity';
import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
import { GuestQAndAEntity } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostCommentEntity } from 'src/models/postComment/postComment.entity';
import { PostLikeEntity } from 'src/models/postLikes/postlike.entity';
import { ReportLoggerEntity } from 'src/models/reportLogger/reportlogger.entity';
import { ChatServerNames, ServerChatEntity } from 'src/models/serverChat/serverchat.entity';
import { ShopItemEntity } from 'src/models/ShopItem/shopitem.entity';
import { UserEntity } from 'src/models/userauthentication/userauth.entity';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { UserNotificationEntity } from 'src/models/usernotifications/usernotifications.entity';
import { UserPrivateMessageEntity } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
export declare class FetchDataService {
    private basictools;
    private userAuthService;
    private readonly mediarepository;
    private cacheManager;
    private readonly arealistrepository;
    private readonly userNotificationRepository;
    private readonly userRepository;
    private readonly postCommentsRepository;
    private readonly guestQandARepository;
    private readonly postLikesRepository;
    private readonly userPrivateMessageRepository;
    private readonly reportLoggerRepository;
    private readonly serverChatRepository;
    private readonly shopItemRepository;
    private readonly userInventoryRepository;
    constructor(basictools: BasicToolsService, userAuthService: UserAuthenticationService, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache, arealistrepository: Repository<AreaListEntity>, userNotificationRepository: Repository<UserNotificationEntity>, userRepository: Repository<UserEntity>, postCommentsRepository: Repository<PostCommentEntity>, guestQandARepository: Repository<GuestQAndAEntity>, postLikesRepository: Repository<PostLikeEntity>, userPrivateMessageRepository: Repository<UserPrivateMessageEntity>, reportLoggerRepository: Repository<ReportLoggerEntity>, serverChatRepository: Repository<ServerChatEntity>, shopItemRepository: Repository<ShopItemEntity>, userInventoryRepository: Repository<UserInventoryEntity>);
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
