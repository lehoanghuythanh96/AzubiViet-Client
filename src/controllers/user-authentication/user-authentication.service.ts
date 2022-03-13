import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlackListEntity, BlackListTypes } from 'src/models/blacklist/blacklist.entity';
import { AppCache, _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';
import { SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { GuestQAndAEntity } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { LevelTableEntity } from 'src/models/leveltable/leveltable.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { ReportLoggerEntity, ReportLoggerTypes } from 'src/models/reportLogger/reportlogger.entity';
import { ShopItemCodes } from 'src/models/ShopItem/shopitem.entity';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserEntity, _UserRegisterDataInput } from 'src/models/userauthentication/userauth.entity';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { UserNotificationEntity, UserNotificationInput, UserNotification_Types } from 'src/models/usernotifications/usernotifications.entity';
import { UserPrivateMessageEntity, UserPrivateMessageInput } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { Repository } from 'typeorm';
import { QuestionMarketService } from '../question-market/question-market.service';

let config = SystemDefaultConfig;

@Injectable()
export class UserAuthenticationService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userrepository: Repository<UserEntity>,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        @InjectRepository(UserNotificationEntity)
        private readonly usernotificationrepository: Repository<UserNotificationEntity>,
        @InjectRepository(LevelTableEntity)
        private readonly leveltableRepository: Repository<LevelTableEntity>,
        @InjectRepository(PostEntity)
        private readonly postEntityRepository: Repository<PostEntity>,
        @InjectRepository(ReportLoggerEntity)
        private readonly reportLoggerRepository: Repository<ReportLoggerEntity>,
        @InjectRepository(UserPrivateMessageEntity)
        private readonly userPrivatemessageRepository: Repository<UserPrivateMessageEntity>,
        @InjectRepository(QuestionMarket_UserAnswerEntity)
        private readonly questionMarketUseranswerRepository: Repository<QuestionMarket_UserAnswerEntity>,
        @InjectRepository(UserAnswerReviewEntity)
        private readonly userAnswerReviewRepository: Repository<UserAnswerReviewEntity>,
        @InjectRepository(GuestQAndAEntity)
        private readonly guestQandARepository: Repository<GuestQAndAEntity>,
        @InjectRepository(BlackListEntity)
        private readonly blackListRepository: Repository<BlackListEntity>,
        @InjectRepository(UserInventoryEntity)
        private readonly userInventoryRepository: Repository<UserInventoryEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache,
    ) { }

    async getallusers() {

        let _cache: UserEntity[] = await this.cacheManager.store.get(_cacheKey.all_users);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.userrepository.find();
        await this.cacheManager.store.set(_cacheKey.all_users, _data)
        return [..._data];

    }

    async finduserbyEmail(email: string | undefined) {

        let _cache = await this.getallusers();

        let _user = _cache.find(
            y => y.user_email == email
        )

        return _user

    }

    async getalluseravatar() {

        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_useravatars);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find({
            media_category: config.USER_AVT_CAT,
            media_status: "publish"
        });
        await this.cacheManager.store.set(_cacheKey.all_useravatars, _data)
        return [..._data];

    }

    async getallusernotifications() {

        let _cache: UserNotificationEntity[] = await this.cacheManager.store.get(_cacheKey.all_usernotifications);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.usernotificationrepository.find();
        await this.cacheManager.store.set(_cacheKey.all_usernotifications, _data)
        return [..._data];

    }

    async getallReportLogger() {

        let _cache: ReportLoggerEntity[] = await this.cacheManager.store.get(_cacheKey.all_ReportLogger);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.reportLoggerRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_ReportLogger, _data)
        return [..._data];

    }

    async getAllLevelPoints() {
        let _cache: LevelTableEntity[] = await this.cacheManager.store.get(_cacheKey.all_levelPoints);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.leveltableRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_levelPoints, _data)
        return [..._data];
    }

    async getAllUserPrivateMessages() {

        let _cache: UserPrivateMessageEntity[] = await this.cacheManager.store.get(_cacheKey.all_userPrivateMessage);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.userPrivatemessageRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_userPrivateMessage, _data)
        return [..._data];

    }

    async deleteSingleNotiByID(noti_ID: number, user_id: number) {
        let allNotis = await this.getallusernotifications();
        let _foundNotis = allNotis.find(
            y => y.ID == noti_ID && y.user_IDs.includes(user_id) && y.deletion_allowed.includes(user_id)
        )
        if (!_foundNotis) {
            throw new BadRequestException({ message: "[User Authentication Service] Notification not found or you are not allowed to delete this notification" })
        }
        await this.usernotificationrepository.delete({
            ID: _foundNotis.ID
        })
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        return 1
    }

    async createSingleNoti(
        input: UserNotificationInput
    ) {
        await this.usernotificationrepository.save(input)
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        return
    }

    async punishUserByPoint(
        point_numbers: number,
        user_id: number
    ) {
        let allUsers = await this.getallusers();
        let foundUser = allUsers.find(
            y => y.ID == user_id
        )
        let PunishPoint = foundUser.punish_point + point_numbers;
        if (PunishPoint <= 3) {
            await this.userrepository.update(
                {
                    ID: foundUser.ID
                },
                {
                    punish_point: PunishPoint
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_users)
            return
        } else {
            await this.userrepository.update(
                {
                    ID: foundUser.ID
                },
                {
                    punish_point: PunishPoint,
                    is_blocked: true
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_users)

            await this.blockAllUserPost(user_id)

            return
        }
    }

    async finishReportLogger(
        item_ID: number,
        item_type: ReportLoggerTypes
    ) {
        let _allReportLoggers = await this.getallReportLogger();
        let _foundReport = _allReportLoggers.find(
            y => y.report_type == item_type && y.parent_ID == item_ID
        )
        if (_foundReport) {
            await this.reportLoggerRepository.update(
                {
                    ID: _foundReport.ID
                },
                {
                    finished: true
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_ReportLogger)
            return
        }
        return
    }

    async blockAllUserPost(
        user_ID: number
    ) {

        await this.postEntityRepository.update(
            {
                post_author: user_ID
            },
            {
                author_isBlocked: true
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_question_products)

        await this.questionMarketUseranswerRepository.update(
            {
                user_ID: user_ID
            },
            {
                author_isBlocked: true
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerinMarket)

        await this.userAnswerReviewRepository.update(
            {
                review_author: user_ID
            },
            {
                author_isBlocked: true
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

        await this.guestQandARepository.update(
            {
                user_ID: user_ID
            },
            {
                author_isBlocked: true
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        return

    }

    async unblockAllUserPost(
        user_ID: number
    ) {

        await this.postEntityRepository.update(
            {
                post_author: user_ID
            },
            {
                author_isBlocked: false
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_question_products)

        await this.questionMarketUseranswerRepository.update(
            {
                user_ID: user_ID
            },
            {
                author_isBlocked: false
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerinMarket)

        await this.userAnswerReviewRepository.update(
            {
                review_author: user_ID
            },
            {
                author_isBlocked: false
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

        await this.guestQandARepository.update(
            {
                user_ID: user_ID
            },
            {
                author_isBlocked: false
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        return

    }

    async getAllblackListItems() {

        let _cache : BlackListEntity[] = await this.cacheManager.store.get(_cacheKey.all_blackListItems);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.blackListRepository.find();
        
        await this.cacheManager.store.set(_cacheKey.all_blackListItems, _data)

        return [..._data];

    }

    async getAll_UserInventories() {

        let _cache : UserInventoryEntity[] = await this.cacheManager.store.get(_cacheKey.all_userInventories);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.userInventoryRepository.find();
        
        await this.cacheManager.store.set(_cacheKey.all_userInventories, _data)

        return [..._data];

    }

    async sendprivateMsgtoUser(
        target_ID: number,
        sender_ID: number,
        msgItem: UserPrivateMessageInput
    ) {
        let allBlacklist = await this.getAllblackListItems();
        let foundBlacklist = allBlacklist.find(
            y => y.type == BlackListTypes.userPrivateMessage && y.user_ID == target_ID
        )

        if (foundBlacklist && foundBlacklist.black_list.includes(sender_ID)) {
            throw new BadRequestException({ message: "The author of this question has blocked all messages from you"})
        }

        await this.userPrivatemessageRepository.save(msgItem)
        await this.cacheManager.store.del(_cacheKey.all_userPrivateMessage)
        return
    }

}
