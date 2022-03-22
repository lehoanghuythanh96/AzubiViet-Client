import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaListEntity } from 'src/models/arealist/arealist.entity';
import { BlackListEntity, BlackListTypes } from 'src/models/blacklist/blacklist.entity';
import { AppCache, _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';
import { SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { GuestQAndAEntity } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { LevelTableEntity } from 'src/models/leveltable/leveltable.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { PostCommentEntity } from 'src/models/postComment/postComment.entity';
import { PostLikeEntity, PostLikeInput, PostLikeTypes } from 'src/models/postLikes/postlike.entity';
import { QuestionMarketAnswerEntity } from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import { QuestionMarketInfoEntity } from 'src/models/questionmarketinfo/questionmarketinfo.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { QuestionProductCategoryEntity } from 'src/models/questionproductcategory/questionproductcategory.entity';
import { ReportLoggerEntity, ReportLoggerTypes } from 'src/models/reportLogger/reportlogger.entity';
import { ChatServerNames, ServerChatEntity } from 'src/models/serverChat/serverchat.entity';
import { ShopItemCodes, ShopItemEntity } from 'src/models/ShopItem/shopitem.entity';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserEntity } from 'src/models/userauthentication/userauth.entity';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { UserNotificationEntity, UserNotificationInput, UserNotification_Types } from 'src/models/usernotifications/usernotifications.entity';
import { UserPrivateMessageEntity, UserPrivateMessageInput } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';

let config = SystemDefaultConfig;

@Injectable()
export class FetchDataService {

    constructor(
        public basictools: BasicToolsService,
        @InjectRepository(MediaListEntity)
        public readonly mediarepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) public cacheManager: AppCache,
        @InjectRepository(AreaListEntity)
        public readonly arealistrepository: Repository<AreaListEntity>,
        @InjectRepository(UserNotificationEntity)
        public readonly userNotificationRepository: Repository<UserNotificationEntity>,
        @InjectRepository(UserEntity)
        public readonly userRepository: Repository<UserEntity>,
        @InjectRepository(PostCommentEntity)
        public readonly postCommentsRepository: Repository<PostCommentEntity>,
        @InjectRepository(GuestQAndAEntity)
        public readonly guestQandARepository: Repository<GuestQAndAEntity>,
        @InjectRepository(PostLikeEntity)
        public readonly postLikesRepository: Repository<PostLikeEntity>,
        @InjectRepository(UserPrivateMessageEntity)
        public readonly userPrivateMessageRepository: Repository<UserPrivateMessageEntity>,
        @InjectRepository(ReportLoggerEntity)
        public readonly reportLoggerRepository: Repository<ReportLoggerEntity>,
        @InjectRepository(ServerChatEntity)
        public readonly serverChatRepository: Repository<ServerChatEntity>,
        @InjectRepository(ShopItemEntity)
        public readonly shopItemRepository: Repository<ShopItemEntity>,
        @InjectRepository(QuestionMarketAnswerEntity)
        public readonly questionmarketanswerrepository: Repository<QuestionMarketAnswerEntity>,
        @InjectRepository(QuestionProductCategoryEntity)
        public readonly questionproductcategoryRepository: Repository<QuestionProductCategoryEntity>,
        @InjectRepository(PostEntity)
        public postrepository: Repository<PostEntity>,
        @InjectRepository(QuestionMarket_UserAnswerEntity)
        public readonly questionmarketuseranswerRepository: Repository<QuestionMarket_UserAnswerEntity>,
        @InjectRepository(UserAnswerReviewEntity)
        public readonly userAnswerReviewRepository: Repository<UserAnswerReviewEntity>,
        @InjectRepository(UserInventoryEntity)
        public readonly userInventoryRepository: Repository<UserInventoryEntity>,
        @InjectRepository(LessonCategoryEntity)
        public readonly lessoncategoryRepository: Repository<LessonCategoryEntity>,
        @InjectRepository(LevelTableEntity)
        public readonly levelTableRepository: Repository<LevelTableEntity>,
        @InjectRepository(BlackListEntity)
        public readonly blackListRepository: Repository<BlackListEntity>,
        @InjectRepository(QuestionMarketInfoEntity)
        public readonly questionMarketInfoRepository: Repository<QuestionMarketInfoEntity>
    ) { }

    async getallusers() {

        let _cache: UserEntity[] = await this.cacheManager.store.get(_cacheKey.all_users);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.userRepository.find();
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

        let _data = await this.userNotificationRepository.find();
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

        let _data = await this.levelTableRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_levelPoints, _data)
        return [..._data];
    }

    async getAllUserPrivateMessages() {

        let _cache: UserPrivateMessageEntity[] = await this.cacheManager.store.get(_cacheKey.all_userPrivateMessage);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.userPrivateMessageRepository.find();
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
        await this.userNotificationRepository.delete({
            ID: _foundNotis.ID
        })
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        return 1
    }

    async createSingleNoti(
        input: UserNotificationInput
    ) {
        await this.userNotificationRepository.save(input)
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
            await this.userRepository.update(
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
            await this.userRepository.update(
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

        await this.postrepository.update(
            {
                post_author: user_ID
            },
            {
                author_isBlocked: true
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_question_products)

        await this.questionmarketuseranswerRepository.update(
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

        await this.postrepository.update(
            {
                post_author: user_ID
            },
            {
                author_isBlocked: false
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_question_products)

        await this.questionmarketuseranswerRepository.update(
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

        await this.userPrivateMessageRepository.save(msgItem)
        await this.cacheManager.store.del(_cacheKey.all_userPrivateMessage)
        return
    }

    async getallarea() {
        let _cache: AreaListEntity[] = await this.cacheManager.store.get(_cacheKey.area_list);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.arealistrepository.find();
        await this.cacheManager.store.set(_cacheKey.area_list, _data)
        return [..._data]
    }

    async getAllPostComments() {
        let _cache: PostCommentEntity[] = await this.cacheManager.store.get(_cacheKey.all_postComments);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.postCommentsRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_postComments, _data)
        return [..._data]
    }

    async getAllguestQandA_items() {
        let _cache: GuestQAndAEntity[] = await this.cacheManager.store.get(_cacheKey.all_guestQandAItems);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.guestQandARepository.find();
        await this.cacheManager.store.set(_cacheKey.all_guestQandAItems, _data)
        return [..._data]
    }

    async getAllpostLikes() {
        let _cache: PostLikeEntity[] = await this.cacheManager.store.get(_cacheKey.all_postLikes);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.postLikesRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_postLikes, _data)
        return [..._data]
    }

    async getAll_ShopItems() {
        let _cache: ShopItemEntity[] = await this.cacheManager.store.get(_cacheKey.all_ShopItems);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.shopItemRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_ShopItems, _data)
        return [..._data]
    }

    async getall_qanda_IMG() {

        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_QA_images)

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find({
            media_category: config.QA_IMG_CAT
        });

        await this.cacheManager.store.set(_cacheKey.all_QA_images, _data)

        return [..._data]

    }

    async getall_Medias() {

        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_medias)

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find();

        await this.cacheManager.store.set(_cacheKey.all_medias, _data)

        return [..._data]

    }

    async getalltrashMedias() {

        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_trash_medias);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find(
            {
                media_status: 'trash'
            }
        );

        await this.cacheManager.store.set(_cacheKey.all_trash_medias, _data)

        return [..._data];

    }

    async getallServerChatItems() {

        let _cache: ServerChatEntity[] = await this.cacheManager.store.get(_cacheKey.all_serverChatItems);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.serverChatRepository.find();

        await this.cacheManager.store.set(_cacheKey.all_serverChatItems, _data)

        return [..._data];

    }

    async deleteall_unused_cdnfiles(user: userJWTpayload) {

        let allUsers = await this.getallusers();
        let foundUser = allUsers.find(
            y => y.ID == user.user_id
        )

        if (!foundUser) {
            throw new BadRequestException({ message: `[FetchDataService] User information not found` })
        }

        if (foundUser.is_blocked == true) {

            let rollPrice = await this.getShopItemPricefromCode(ShopItemCodes.revivalRoll)

            let revivalRoll = await this.getShopItemAmountfromCode(ShopItemCodes.revivalRoll, user.user_id)

            if (revivalRoll <= 0 || revivalRoll == undefined) {

                if (foundUser.user_abicoin <= rollPrice) {
                    throw new BadRequestException({ message: `Your account is blocked, please ask someone else to use "Revival Roll" item to help you` })
                }

                let newMoney = foundUser.user_abicoin - rollPrice

                await this.userRepository.update(
                    {
                        ID: user.user_id
                    },
                    {
                        user_abicoin: newMoney,
                        is_blocked: false,
                        punish_point: 0
                    }
                )
                await this.cacheManager.store.del(_cacheKey.all_users)

                let _newMsg: UserPrivateMessageInput = {
                    message_content: 'You were blocked and then automatically unblock by system, you lost 50 Abicoin for this unblock action',
                    sender_email: 'admin@azubiviet.com',
                    sender_ID: 0,
                    user_ID: user.user_id
                }

                await this.userPrivateMessageRepository.save(_newMsg)
                await this.cacheManager.store.del(_cacheKey.all_userPrivateMessage)

                await this.unblockAllUserPost(user.user_id)

            } else {

                await this.userInventoryRepository.update(
                    {
                        item_code: ShopItemCodes.revivalRoll,
                        user_ID: user.user_id
                    },
                    {
                        item_quantity: revivalRoll - 1
                    }
                )
                await this.cacheManager.store.del(_cacheKey.all_userInventories)

                await this.userRepository.update(
                    {
                        ID: user.user_id
                    },
                    {
                        is_blocked: false,
                        punish_point: 0
                    }
                )
                await this.cacheManager.store.del(_cacheKey.all_users)

                await this.unblockAllUserPost(user.user_id)

                let _newMsg: UserPrivateMessageInput = {
                    message_content: 'You were blocked and then automatically unblock by system, you lost 1 "Revival Roll" for this unblock action',
                    sender_email: 'admin@azubiviet.com',
                    sender_ID: 0,
                    user_ID: user.user_id
                }

                await this.userPrivateMessageRepository.save(_newMsg)
                await this.cacheManager.store.del(_cacheKey.all_userPrivateMessage)

            }

        }

        let _cache = await this.getalltrashMedias();

        let _trasharr = [..._cache.filter(
            y => y.user_ID == user.user_id
        )]

        let cdnlist = _trasharr.map(x => { return x.media_path })
        await this.basictools.deleteunusedcdn(cdnlist, user);
        let _result = await this.mediarepository.delete({ media_status: 'trash', user_ID: user.user_id });
        await this.cacheManager.store.del(_cacheKey.all_trash_medias)

        return _result;
    }

    async countQAQuestionPunishPoint(
        QA_ID: number,
        controller_ID: number,
        noti_ID: number
    ) {

        let allQAs = await this.getAllguestQandA_items();
        let foundQA = allQAs.find(
            y => y.ID == QA_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundQA) {
            throw new BadRequestException({ message: "[Fetch Data Service] Can't report question, question not found or you are not allowed to access it" })
        }

        let _reportCounter = foundQA.report_counter + 1;

        let _controllerList = foundQA.report_controllers;
        let _newControllerList = _controllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti) {
            throw new BadRequestException({ message: "[Fetch Data Service] Notification not found anymore" })
        }

        await this.guestQandARepository.update(
            {
                ID: QA_ID
            },
            {
                report_counter: _reportCounter,
                report_controllers: _newControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        let _notiUserList = foundNoti.user_IDs;
        let _newNotiUserList = _notiUserList.filter(
            y => y != controller_ID
        )
        await this.userNotificationRepository.update(
            {
                ID: noti_ID
            },
            {
                user_IDs: _newNotiUserList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)

        if (_reportCounter >= 2) {

            await this.punishUserByPoint(1, foundQA.user_ID)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.QA_QuestionAuthor_isPunished,
                data: {
                    QA_ID: foundQA.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQA.user_ID],
                deletion_allowed: [foundQA.user_ID]
            }
            await this.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            await this.guestQandARepository.update(
                {
                    ID: foundQA.ID
                },
                {
                    item_status: "trash",
                    is_reported: false,
                    report_counter: 0,
                    report_controllers: []
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_question_products)

            await this.finishReportLogger(
                foundQA.ID,
                ReportLoggerTypes.QA_Question_ItemInvalid
            )

            return {
                selectedUsers: [foundQA.user_ID]
            }
        }

        return {}

    }

    async countQA_Question_ReporterPunishPoints(
        QA_ID: number,
        controller_ID: number,
        noti_ID: number,
    ) {

        let allQAs = await this.getAllguestQandA_items();
        let foundQA = allQAs.find(
            y => y.ID == QA_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundQA) {
            throw new BadRequestException({ message: "[Fetch Data Service] Can't report answer, answer not found or you are not allowed to access it" })
        }

        let _qaControllerList = foundQA.report_controllers;
        let _newQAControllerList = _qaControllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti || typeof foundNoti.data.reporter_punish_count != 'number') {
            throw new BadRequestException({ message: "[Fetch Data Service] Notification not found anymore" })
        }

        await this.guestQandARepository.update(
            {
                ID: QA_ID
            },
            {
                report_controllers: _newQAControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        let _reportCounter = foundNoti.data.reporter_punish_count + 1;
        let notiData = { ...foundNoti.data };
        notiData.reporter_punish_count = _reportCounter

        let notiUsers = foundNoti.user_IDs
        let _notiUsers = notiUsers.filter(
            y => y != controller_ID
        )

        await this.userNotificationRepository.update(
            {
                ID: noti_ID
            },
            {
                data: notiData,
                user_IDs: _notiUsers
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        if (_reportCounter >= 2) {

            let _selectedUsers: number[] = []

            await this.punishUserByPoint(1, foundQA.report_sender)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.QA_QuestionItem_Reporter_isPunished,
                data: {
                    QA_ID: foundQA.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQA.report_sender],
                deletion_allowed: [foundQA.report_sender]
            }
            await this.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            _selectedUsers.push(foundQA.report_sender)

            await this.guestQandARepository.update(
                {
                    ID: foundQA.ID
                },
                {
                    is_reported: false,
                    report_counter: 0,
                    report_controllers: []
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_guestQandAItems)

            await this.finishReportLogger(
                foundQA.ID,
                ReportLoggerTypes.QA_Question_ItemInvalid
            )

            return {
                selectedUsers: _selectedUsers
            }
        }

        return {}
    }

    async countQAAnswerPunishPoint(
        QA_ID: number,
        controller_ID: number,
        noti_ID: number
    ) {

        let allQAs = await this.getAllguestQandA_items();
        let foundQA = allQAs.find(
            y => y.ID == QA_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundQA) {
            throw new BadRequestException({ message: "[Fetch Data Service] Can't report question, question not found or you are not allowed to access it" })
        }

        let foundQAQuestion = allQAs.find(
            y => y.ID == foundQA.parent_ID && y.item_status == "publish"
        )

        if (
            !foundQAQuestion
        ) {
            throw new BadRequestException({ message: "[Fetch Data Service] This Q&A item is not available anymore" })
        }

        let _reportCounter = foundQA.report_counter + 1;

        let _controllerList = foundQA.report_controllers;
        let _newControllerList = _controllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti) {
            throw new BadRequestException({ message: "[Fetch Data Service] Notification not found anymore" })
        }

        await this.guestQandARepository.update(
            {
                ID: QA_ID
            },
            {
                report_counter: _reportCounter,
                report_controllers: _newControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        let _notiUserList = foundNoti.user_IDs;
        let _newNotiUserList = _notiUserList.filter(
            y => y != controller_ID
        )
        await this.userNotificationRepository.update(
            {
                ID: noti_ID
            },
            {
                user_IDs: _newNotiUserList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)

        if (_reportCounter >= 2) {

            await this.punishUserByPoint(1, foundQA.user_ID)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.QA_AnswerAuthor_isPunished,
                data: {
                    QA_Question_ID: foundQAQuestion.ID,
                    QA_ID: foundQA.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQA.user_ID],
                deletion_allowed: [foundQA.user_ID]
            }
            await this.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            await this.guestQandARepository.update(
                {
                    ID: foundQA.ID
                },
                {
                    item_status: "trash",
                    is_reported: false,
                    report_counter: 0,
                    report_controllers: []
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_question_products)

            await this.finishReportLogger(
                foundQA.ID,
                ReportLoggerTypes.QA_Answer_ItemInvalid
            )

            return {
                selectedUsers: [foundQA.user_ID]
            }
        }

        return {}

    }

    async countQA_Answer_ReporterPunishPoints(
        QA_ID: number,
        controller_ID: number,
        noti_ID: number,
    ) {

        let allQAs = await this.getAllguestQandA_items();
        let foundQA = allQAs.find(
            y => y.ID == QA_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundQA) {
            throw new BadRequestException({ message: "[Fetch Data Service] Can't report answer, answer not found or you are not allowed to access it" })
        }

        let foundQAQuestion = allQAs.find(
            y => y.ID == foundQA.parent_ID && y.item_status == "publish"
        )

        if (
            !foundQAQuestion
        ) {
            throw new BadRequestException({ message: "[Fetch Data Service] This Q&A item is not available anymore" })
        }

        let _qaControllerList = foundQA.report_controllers;
        let _newQAControllerList = _qaControllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti || typeof foundNoti.data.reporter_punish_count != 'number') {
            throw new BadRequestException({ message: "[Fetch Data Service] Notification not found anymore" })
        }

        await this.guestQandARepository.update(
            {
                ID: QA_ID
            },
            {
                report_controllers: _newQAControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        let _reportCounter = foundNoti.data.reporter_punish_count + 1;
        let notiData = { ...foundNoti.data };
        notiData.reporter_punish_count = _reportCounter

        let notiUsers = foundNoti.user_IDs
        let _notiUsers = notiUsers.filter(
            y => y != controller_ID
        )

        await this.userNotificationRepository.update(
            {
                ID: noti_ID
            },
            {
                data: notiData,
                user_IDs: _notiUsers
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        if (_reportCounter >= 2) {

            let _selectedUsers: number[] = []

            await this.punishUserByPoint(1, foundQA.report_sender)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.QA_AnswerItem_Reporter_isPunished,
                data: {
                    QA_Question_ID: foundQAQuestion.ID,
                    QA_ID: foundQA.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQA.report_sender],
                deletion_allowed: [foundQA.report_sender]
            }
            await this.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            _selectedUsers.push(foundQA.report_sender)

            await this.guestQandARepository.update(
                {
                    ID: foundQA.ID
                },
                {
                    is_reported: false,
                    report_counter: 0,
                    report_controllers: []
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_guestQandAItems)

            await this.finishReportLogger(
                foundQA.ID,
                ReportLoggerTypes.QA_Answer_ItemInvalid
            )

            return {
                selectedUsers: _selectedUsers
            }
        }

        return {}
    }

    async likeQAAnswer(
        user_id: number,
        QA_ID: number,
        forceLike: boolean
    ) {

        let allQAs = await this.getAllguestQandA_items();
        let foundItem = allQAs.find(
            y => y.ID == QA_ID && y.item_status == "publish" && y.item_type == "answer"
        )

        if (!foundItem) {
            throw new BadRequestException({ message: "This Q&A Item is not valid anymore" })
        }

        let allPostLikes = await this.getAllpostLikes();
        let foundAnswerLikes = allPostLikes.find(
            y => y.type == PostLikeTypes.QA_Answer && y.parent_ID == QA_ID
        )

        if (!foundAnswerLikes) {
            let _newPostLikeitem: PostLikeInput = {
                type: PostLikeTypes.QA_Answer,
                parent_ID: QA_ID,
                user_array: []
            }
            let _newItem = await this.postLikesRepository.save(_newPostLikeitem)
            await this.cacheManager.store.del(_cacheKey.all_postLikes)
            allPostLikes = await this.getAllpostLikes();
            foundAnswerLikes = _newItem
        }

        const userarr = [...foundAnswerLikes.user_array];
        if (userarr.includes(user_id) && forceLike == false) {
            userarr.splice(
                userarr.indexOf(user_id), 1
            )
            await this.postLikesRepository.update(
                {
                    ID: foundAnswerLikes.ID
                },
                {
                    user_array: userarr
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_postLikes)
            return
        } else if (!userarr.includes(user_id)) {
            userarr.push(user_id)
            await this.postLikesRepository.update(
                {
                    ID: foundAnswerLikes.ID
                },
                {
                    user_array: userarr
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_postLikes)
            return
        }

        return

    }

    async checkStrContent(str: string, sv_name: ChatServerNames, user_ID: number) {

        function isValidURL(str: string) {
            var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return (res !== null)
        };

        if (isValidURL(str) == true) {
            throw new BadRequestException({ message: "Please don't embed any URL in your message" })
        }

        let allMsgs = await this.getallServerChatItems();
        let foundDuplicates = allMsgs.filter(
            y => y.message_content == str && y.server_name == sv_name && y.user_ID == user_ID
        )
        foundDuplicates.forEach(
            item => { }
        )

        return true

    }

    async getShopItemNamefromCode(code: string) {

        let allItems = await this.getAll_ShopItems();
        let foundItem = allItems.find(
            y => y.item_code == code
        )
        if (!foundItem) {
            throw new BadRequestException({ message: "Item not found" })
        }
        return foundItem.item_name

    }

    async getShopItemAmountfromCode(code: string, user_ID: number) {

        let allInventoryItems = await this.getAll_UserInventories();
        let foundItem = allInventoryItems.find(
            y => y.item_code == code && y.user_ID == user_ID
        )

        if (!foundItem) {
            return undefined;
        }

        return foundItem.item_quantity

    }

    async getShopItemPricefromCode(code: string) {
        let allItems = await this.getAll_ShopItems();
        let foundItem = allItems.find(
            y => y.item_code == code
        )
        if (!foundItem) {
            throw new BadRequestException({ message: "Item not found" })
        }
        return foundItem.item_price
    }

}
