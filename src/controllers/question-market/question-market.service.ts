import { BadRequestException, CACHE_MANAGER, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AppCache, _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';
import { SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { MediaListEntity, UpdateFormUploadMediaInput } from 'src/models/media/media.entity';
import { PostEntity, postTypes } from 'src/models/post/post.entity';
import { QuestionMarketAnswerEntity } from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import { QuestionMarket_UserAnswerEntity, QuestionMarket_UserAnswerInput } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { QuestionProductCategoryEntity } from 'src/models/questionproductcategory/questionproductcategory.entity';
import { ReportLoggerTypes } from 'src/models/reportLogger/reportlogger.entity';
import { ShopItemCodes } from 'src/models/ShopItem/shopitem.entity';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { UserNotificationEntity, UserNotificationInput, UserNotification_Types } from 'src/models/usernotifications/usernotifications.entity';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';

let config = SystemDefaultConfig;

@Injectable()
export class QuestionMarketService {

    constructor(
        private basictools: BasicToolsService,
        private userAuthService: UserAuthenticationService,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache,
        @InjectRepository(QuestionMarketAnswerEntity)
        private readonly questionanswerrepository: Repository<QuestionMarketAnswerEntity>,
        @InjectRepository(QuestionProductCategoryEntity)
        private readonly questionproductcategoryRepository: Repository<QuestionProductCategoryEntity>,
        @InjectRepository(PostEntity)
        private postrepository: Repository<PostEntity>,
        @InjectRepository(QuestionMarket_UserAnswerEntity)
        private readonly questionmarketuseranswerRepository: Repository<QuestionMarket_UserAnswerEntity>,
        @InjectRepository(UserAnswerReviewEntity)
        private readonly userAnswerReviewRepository: Repository<UserAnswerReviewEntity>,
        @InjectRepository(UserNotificationEntity)
        private readonly userNotificationRepository: Repository<UserNotificationEntity>,
        @InjectRepository(UserInventoryEntity)
        private readonly userInventoryRepository: Repository<UserInventoryEntity>,
        private fetchDataService: FetchDataService,
        private jwt: JwtService,
    ) { }

    async getallquestionanswer() {
        let _cache: QuestionMarketAnswerEntity[] = await this.cacheManager.store.get(_cacheKey.all_questionanswer)

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.questionanswerrepository.find();

        await this.cacheManager.store.set(_cacheKey.all_questionanswer, _data)

        return [..._data]

    }

    async getallquestionanswerIMG() {
        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_questionanswer_IMG)

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find({
            media_category: config.QUESTION_PRODUCT_ANSWER_IMG_CAT
        });

        await this.cacheManager.store.set(_cacheKey.all_questionanswer_IMG, _data)

        return [..._data]

    }

    async getallquestionIMG() {

        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_questionIMG)

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find({
            media_category: config.QUESTION_PRODUCT_IMG_CAT
        });

        await this.cacheManager.store.set(_cacheKey.all_questionIMG, _data)

        return [..._data]

    }

    async getalluseranswerIMG() {

        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_useranswerIMG)

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find({
            media_category: config.QUESTION_USER_ANSWER_IMG_CAT
        });

        await this.cacheManager.store.set(_cacheKey.all_useranswerIMG, _data)

        return [..._data]

    }

    getusertempmediafiles = (user: userJWTpayload) => new Promise(
        async (resolve, reject) => {
            let _num = await this.mediarepository.find({
                user_ID: user.user_id,
                media_status: "trash"
            })
            if (_num.length <= 20) {
                resolve(true);
            } else {
                reject(new BadRequestException({ message: "[Question Market Service] Number of temporary image files exceeded, please refresh page or delete some temporary images..." }))
            }
        }
    )

    async getall_questionproduct() {

        let _cache: PostEntity[] = await this.cacheManager.store.get(_cacheKey.all_question_products);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.postrepository.find({
            post_type: postTypes.question_product
        });
        await this.cacheManager.store.set(_cacheKey.all_question_products, _data)
        return [..._data];

    }

    async getallquestionproductavatar() {

        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_questionproduct_avatar);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find({
            media_category: config.QUESTION_PRODUCT_AVATAR_CAT
        });
        await this.cacheManager.store.set(_cacheKey.all_questionproduct_avatar, _data)
        return [..._data];

    }

    async getalluseranswerinmarket() {

        let _cache: QuestionMarket_UserAnswerEntity[] = await this.cacheManager.store.get(_cacheKey.all_userAnswerinMarket);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.questionmarketuseranswerRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_userAnswerinMarket, _data)
        return [..._data];

    }

    async getall_questionproductcategory() {
        let _cache: QuestionProductCategoryEntity[] = await this.cacheManager.store.get(_cacheKey.all_questionproduct_category);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.questionproductcategoryRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_questionproduct_category, _data)
        return [..._data];
    }

    async getAllUserAnswerReviews() {
        let _cache: UserAnswerReviewEntity[] = await this.cacheManager.store.get(_cacheKey.all_userAnswerReview);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.userAnswerReviewRepository.find();
        await this.cacheManager.store.set(_cacheKey.all_userAnswerReview, _data)
        return [..._data];
    }

    async resetReporteduserAnswer(
        user_answer_ID: number
    ) {

        await this.questionmarketuseranswerRepository.update(
            {
                ID: user_answer_ID
            },
            {
                answer_date: new Date(),
                is_reported: false,
                report_counter: 0,
                report_controllers: [],
                reported_date: new Date(),
                report_notes: "",
                report_sender: 0,
                waiting_reviewers: []
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

        return

    }

    async updateAllPrivateReviewsInfo(
        user: userJWTpayload,
        question_ID: number,
        new_question_input: Partial<PostEntity>,
        new_answer_input: Partial<QuestionMarketAnswerEntity>,
        question_avatar: MediaListEntity,
        question_imgs: MediaListEntity[],
        answer_imgs: MediaListEntity[]
    ) {

        let _allanswerReviews = await this.getAllUserAnswerReviews();
        let _foundReview = _allanswerReviews.find(
            y => y.question_ID == question_ID
        )

        if (!_foundReview) {
            return
        }

        let questionInfo = _foundReview.question_info;
        let _newQuestionInfo = Object.assign(questionInfo, new_question_input)
        _newQuestionInfo.question_imgs = question_imgs;
        _newQuestionInfo.question_avatar = question_avatar;

        let answerInfo = _foundReview.original_answer_info;
        let _newOriginalAnswerInfo = Object.assign(answerInfo, new_answer_input)
        _newOriginalAnswerInfo.answer_imgs = answer_imgs;

        let _result = await this.userAnswerReviewRepository.update(
            {
                answerer_ID: user.user_id,
                question_ID: question_ID
            },
            {
                question_info: _newQuestionInfo,
                original_answer_info: _newOriginalAnswerInfo,
                review_updated: true
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

        return _result
    }

    async makeReviewFixed(
        question_ID: number,
        user: userJWTpayload
    ) {

        let _result = await this.userAnswerReviewRepository.update(
            {
                answerer_ID: user.user_id,
                question_ID: question_ID
            },
            {
                review_updated: true,
                review_fixed: true
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

        return _result

    }

    async makeReviewSkippingUpdate(
        question_ID: number,
        user: userJWTpayload
    ) {
        let _result = await this.userAnswerReviewRepository.update(
            {
                answerer_ID: user.user_id,
                question_ID: question_ID
            },
            {
                review_updated: true
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

        return _result
    }

    async deleteSingleUserAnswerByID(
        answer_ID: number,
        user_id: number
    ) {

        let reverseRollNumber = await this.fetchDataService.getShopItemAmountfromCode(
            ShopItemCodes.reverseClock,
            user_id
        )

        if (reverseRollNumber <= 0) {
            throw new BadRequestException({ message: "You need 1 reverse clock to delete this answer, please go to Item Shop to buy more"})
        }

        let allUserAnswer = await this.getalluseranswerinmarket();

        let foundAnswer = allUserAnswer.find(
            y => y.ID == answer_ID && y.user_ID == user_id
        )

        if (!foundAnswer) {
            throw new BadRequestException({ message: "[Question Market Service] This answer is not found anymore, it is deleted" })
        }

        if (foundAnswer.is_reported == true) {
            throw new BadRequestException({ message: `[Question Market Service] This answer is reported. Please use the "Report Fighter" item to clear the report state first.` })
        }

        let allMedias = await this.getalluseranswerIMG();
        let foundMedias = allMedias.filter(
            y => y.parent_ID == answer_ID
        )

        if (foundMedias.length > 0) {
            foundMedias.forEach(
                async (item) => {
                    await this.mediarepository.update(
                        {
                            ID: item.ID
                        },
                        {
                            media_status: "draft"
                        }
                    )
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_useranswerIMG)
        }

        await this.questionmarketuseranswerRepository.update(
            {
                ID: answer_ID
            },
            {
                answer_status: "trash"
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userAnswerinMarket);

        let newReverseClockAmount = reverseRollNumber - 1
        await this.userInventoryRepository.update(
            {
                item_code: ShopItemCodes.reverseClock,
                user_ID: user_id
            },
            {
                item_quantity: newReverseClockAmount
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userInventories)

        await this.userAnswerReviewRepository.update(
            {
                user_answer_ID: answer_ID
            },
            {
                review_status: "trash"
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

        let allNotis = await this.userAuthService.getallusernotifications();
        let _selectedUsers: number[] = []
        let foundAnswerReviewedNoti = allNotis.find(
            y => y.type == UserNotification_Types.answer_isReviewed && y.user_IDs.includes(user_id)
        )

        if (foundAnswerReviewedNoti) {
            _selectedUsers = _selectedUsers.concat(foundAnswerReviewedNoti.user_IDs)
            await this.userNotificationRepository.delete({
                ID: foundAnswerReviewedNoti.ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        }

        let foundAnswerReportedNoti = allNotis.find(
            y => y.type == UserNotification_Types.answer_isReported && y.data.user_answer_ID == answer_ID
        )

        if (foundAnswerReportedNoti) {
            _selectedUsers = _selectedUsers.concat(foundAnswerReportedNoti.user_IDs)
            await this.userNotificationRepository.delete({
                ID: foundAnswerReportedNoti.ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        }

        let foundUserAnsweredNoti = allNotis.find(
            y => y.type == UserNotification_Types.user_answer && y.data.user_answer_ID == answer_ID
        )

        if (foundUserAnsweredNoti) {
            _selectedUsers = _selectedUsers.concat(foundUserAnsweredNoti.user_IDs)
            await this.userNotificationRepository.delete({
                ID: foundUserAnsweredNoti.ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        }

        let foundAnswererPunishedNoti = allNotis.find(
            y => y.type == UserNotification_Types.answerer_isPunished && y.data.user_answer_ID == foundAnswer.ID && y.user_IDs.includes(user_id)
        )
        if (foundAnswererPunishedNoti) {
            await this.userNotificationRepository.delete({
                ID: foundAnswererPunishedNoti.ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        }

        return {
            selectedUsers: _selectedUsers
        }
    }

    async countAnswerPunishPoint(
        user_answer_ID: number,
        controller_ID: number,
        noti_ID: number
    ) {

        let allAnswers = await this.getalluseranswerinmarket();
        let foundAnswer = allAnswers.find(
            y => y.ID == user_answer_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundAnswer) {
            throw new BadRequestException({ message: "[Question Market Service] Can't report answer, answer not found or you are not allowed to access it" })
        }

        let _reportCounter = foundAnswer.report_counter + 1;

        let _controllerList = foundAnswer.report_controllers;
        let _newControllerList = _controllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.userAuthService.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti) {
            throw new BadRequestException({ message: "[Question Market Service] Notification not found anymore" })
        }

        await this.questionmarketuseranswerRepository.update(
            {
                ID: user_answer_ID
            },
            {
                report_counter: _reportCounter,
                report_controllers: _newControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userAnswerinMarket)

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
            await this.userAuthService.punishUserByPoint(1, foundAnswer.user_ID)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.answerer_isPunished,
                data: {
                    question_ID: foundAnswer.parent_ID,
                    user_answer_ID: foundAnswer.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundAnswer.user_ID],
                deletion_allowed: [foundAnswer.user_ID]
            }
            await this.userAuthService.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            await this.resetReporteduserAnswer(foundAnswer.ID)

            await this.userAuthService.finishReportLogger(
                foundAnswer.ID,
                ReportLoggerTypes.questionMarketUserAnswer
            )

            return {
                selectedUsers: [foundAnswer.user_ID]
            }
        }

        return {}

    }

    async countUserAnswer_ReporterPunishPoints(
        user_answer_ID: number,
        controller_ID: number,
        noti_ID: number,
    ) {

        let allAnswers = await this.getalluseranswerinmarket();
        let foundAnswer = allAnswers.find(
            y => y.ID == user_answer_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundAnswer) {
            throw new BadRequestException({ message: "[Question Market Service] Can't report answer, answer not found or you are not allowed to access it" })
        }

        let _answerControllerList = foundAnswer.report_controllers;
        let _newAnswerControllerList = _answerControllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.userAuthService.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti || typeof foundNoti.data.reporter_punish_count != 'number') {
            throw new BadRequestException({ message: "[Question Market Service] Notification not found anymore" })
        }

        await this.questionmarketuseranswerRepository.update(
            {
                ID: user_answer_ID
            },
            {
                report_controllers: _newAnswerControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userAnswerinMarket)

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

            await this.userAuthService.punishUserByPoint(1, foundAnswer.report_sender)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.user_answer_reporter_isPunished,
                data: {
                    question_ID: foundAnswer.parent_ID,
                    user_answer_ID: foundAnswer.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundAnswer.report_sender],
                deletion_allowed: [foundAnswer.report_sender]
            }
            await this.userAuthService.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            _selectedUsers.push(foundAnswer.report_sender)

            await this.resetReporteduserAnswer(foundAnswer.ID)

            let _repeatAnswer = await this.userSubmitNewQuestionAnswer(
                "",
                [],
                foundAnswer.parent_ID,
                foundAnswer.user_ID,
                false,
                foundAnswer.ID
            )

            _selectedUsers = _selectedUsers.concat(_repeatAnswer)

            await this.userAuthService.finishReportLogger(
                foundAnswer.ID,
                ReportLoggerTypes.questionMarketUserAnswer
            )

            return {
                selectedUsers: _selectedUsers
            }
        }

        return {}
    }

    async userSubmitNewQuestionAnswer(
        answer_content: string,
        answer_imgs: string[],
        question_ID: number,
        user_id: number,
        neworreapeat: boolean,
        user_answer_ID?: number
    ) {
        let _user_answer_ID = undefined;
        if (user_answer_ID) {
            _user_answer_ID = user_answer_ID
        }

        if (neworreapeat) {
            let allAnswer = await this.getalluseranswerinmarket();
            let _userAnswered = allAnswer.find(
                y => y.user_ID == user_id && y.parent_ID == question_ID && y.answer_status == "publish"
            )

            if (_userAnswered) {
                throw new ForbiddenException({ message: "[Question Market Service] You've already answered this question" })
            }

            let allQuestion = await this.getall_questionproduct();
            let _isOwner = allQuestion.find(
                y => y.post_author == user_id && y.ID == question_ID
            )

            if (_isOwner) {
                throw new ForbiddenException({ message: "[Question Market Service] You can't answer this question because you're its owner" })
            }

            let _item: QuestionMarket_UserAnswerInput = {
                answer_content: answer_content,
                parent_ID: question_ID,
                user_ID: user_id
            }

            let _result = await this.questionmarketuseranswerRepository.save(_item)
            await this.cacheManager.store.del(_cacheKey.all_userAnswerinMarket)

            if (!_result) {
                throw new ForbiddenException({ message: "[Question Market Service] Save reply failed, can't query database" })
            }

            _user_answer_ID = _result.ID;

            for (let i = 0; i < answer_imgs.length; i++) {
                var _updateinfo: UpdateFormUploadMediaInput = {
                    parent_ID: _result.ID,
                    media_status: "publish"
                }
                await this.mediarepository.update(
                    {
                        media_name: answer_imgs[i]
                    },
                    _updateinfo
                )
            }

            await this.cacheManager.store.del(_cacheKey.all_useranswerIMG)
            await this.cacheManager.store.del(_cacheKey.all_trash_medias)
        }

        /* -------------------------------------------------------------------------- */
        /*                              Send notification                             */
        /* -------------------------------------------------------------------------- */

        let _allusers = [...await this.userAuthService.getallusers()];

        let _selectedUser: number[] = [];

        let filteredUsers = _allusers.filter(
            y => y.ID != user_id && y.is_blocked == false
        )

        for (let i = 0; i < 5; i++) {
            if (_allusers.length > 0) {

                if (filteredUsers.length > 0) {
                    let random = Math.floor(Math.random() * filteredUsers.length);
                    let _tempID = filteredUsers[random].ID;
                    if (!_selectedUser.includes(_tempID)) {
                        _selectedUser.push(_tempID)
                    }
                    filteredUsers.splice(random, 1)
                }
            }
        }

        let _notification: UserNotificationInput = {
            type: UserNotification_Types.user_answer,
            data: {
                question_ID: question_ID,
                user_answer_ID: _user_answer_ID
            },
            secret: "",
            user_IDs: _selectedUser,
            deletion_allowed: []
        }

        let _savedNoti = await this.userNotificationRepository.save(_notification);

        let _secretToken = this.jwt.sign({
            question_ID: question_ID,
            notification_ID: _savedNoti.ID,
            user_answer_ID: _user_answer_ID
        })

        await this.userNotificationRepository.update(
            {
                ID: _savedNoti.ID
            },
            {
                secret: _secretToken
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_usernotifications)

        await this.questionmarketuseranswerRepository.update(
            {
                ID: _user_answer_ID
            },
            {
                waiting_reviewers: _selectedUser
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userAnswerinMarket)

        return _selectedUser;
    }

    async countAnswerReviewPunishPoint(
        user_answer_review_ID: number,
        controller_ID: number,
        noti_ID: number
    ) {

        let allAnswerReviews = await this.getAllUserAnswerReviews();
        let foundAnswerReview = allAnswerReviews.find(
            y => y.ID == user_answer_review_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundAnswerReview) {
            throw new BadRequestException({ message: "[Question Market Service] Can't report answer, answer not found or you are not allowed to access it" })
        }

        let _reportCounter = foundAnswerReview.report_counter + 1;

        let _controllerList = foundAnswerReview.report_controllers;
        let _newControllerList = _controllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.userAuthService.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti) {
            throw new BadRequestException({ message: "[Question Market Service] Notification not found anymore" })
        }

        await this.userAnswerReviewRepository.update(
            {
                ID: user_answer_review_ID
            },
            {
                report_counter: _reportCounter,
                report_controllers: _newControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

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
            await this.userAuthService.punishUserByPoint(1, foundAnswerReview.review_author)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.useranswer_reviewer_isPunished,
                data: {
                    question_ID: foundAnswerReview.question_ID,
                    user_answer_ID: foundAnswerReview.user_answer_ID,
                    user_answer_review_ID: foundAnswerReview.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundAnswerReview.review_author],
                deletion_allowed: [foundAnswerReview.review_author]
            }
            await this.userAuthService.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            await this.userAnswerReviewRepository.update(
                {
                    ID: foundAnswerReview.ID
                },
                {
                    review_status: "trash",
                    is_reported: false,
                    report_counter: 0,
                    report_controllers: []
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

            await this.userAuthService.finishReportLogger(
                foundAnswerReview.ID,
                ReportLoggerTypes.questionMarket_UserAnswerReview
            )

            return {
                selectedUsers: [foundAnswerReview.review_author]
            }
        }

        return {}

    }

    async countUserAnswerReview_ReporterPunishPoints(
        user_answer_review_ID: number,
        controller_ID: number,
        noti_ID: number,
    ) {

        let allAnswerReviews = await this.getAllUserAnswerReviews();
        let foundAnswerReview = allAnswerReviews.find(
            y => y.ID == user_answer_review_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundAnswerReview) {
            throw new BadRequestException({ message: "[Question Market Service] Can't report review, review not found or you are not allowed to access it" })
        }

        let _reviewControllerList = foundAnswerReview.report_controllers;
        let _newReviewControllerList = _reviewControllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.userAuthService.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti || typeof foundNoti.data.reporter_punish_count != 'number') {
            throw new BadRequestException({ message: "[Question Market Service] Notification not found anymore" })
        }

        await this.userAnswerReviewRepository.update(
            {
                ID: user_answer_review_ID
            },
            {
                report_controllers: _newReviewControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

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

            await this.userAuthService.punishUserByPoint(1, foundAnswerReview.report_sender)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.useranswer_review_Reporter_isPunished,
                data: {
                    question_ID: foundAnswerReview.question_ID,
                    user_answer_ID: foundAnswerReview.user_answer_ID,
                    user_answer_review_ID: foundAnswerReview.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundAnswerReview.report_sender],
                deletion_allowed: [foundAnswerReview.report_sender]
            }
            await this.userAuthService.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            _selectedUsers.push(foundAnswerReview.report_sender)

            await this.userAnswerReviewRepository.update(
                {
                    ID: foundAnswerReview.ID
                },
                {
                    is_reported: false,
                    report_counter: 0,
                    report_controllers: []
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

            await this.userAuthService.finishReportLogger(
                foundAnswerReview.ID,
                ReportLoggerTypes.questionMarket_UserAnswerReview
            )

            return {
                selectedUsers: _selectedUsers
            }
        }

        return {}
    }

    async countQuestionPunishPoint(
        question_ID: number,
        controller_ID: number,
        noti_ID: number
    ) {

        let allQuestions = await this.getall_questionproduct();
        let foundQuestion = allQuestions.find(
            y => y.ID == question_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundQuestion) {
            throw new BadRequestException({ message: "[Question Market Service] Can't report question, question not found or you are not allowed to access it" })
        }

        let _reportCounter = foundQuestion.report_counter + 1;

        let _controllerList = foundQuestion.report_controllers;
        let _newControllerList = _controllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.userAuthService.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti) {
            throw new BadRequestException({ message: "[Question Market Service] Notification not found anymore" })
        }

        await this.postrepository.update(
            {
                ID: question_ID
            },
            {
                report_counter: _reportCounter,
                report_controllers: _newControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_question_products)

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
            await this.userAuthService.punishUserByPoint(1, foundQuestion.post_author)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.questionAuthor_isPunished,
                data: {
                    question_ID: foundQuestion.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQuestion.post_author],
                deletion_allowed: [foundQuestion.post_author]
            }
            await this.userAuthService.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            await this.postrepository.update(
                {
                    ID: foundQuestion.ID
                },
                {
                    post_status: "trash"
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_question_products)

            let questionAvatar = [...await this.getallquestionproductavatar()].filter(
                y => y.parent_ID == foundQuestion.ID
            )

            let questionImgs = [...await this.getallquestionIMG()].filter(
                y => y.parent_ID == foundQuestion.ID
            )

            let questionMedias = [...questionImgs.concat(questionAvatar)].map(
                y => y.ID
            )

            questionMedias.forEach(
                async (item) => {
                    await this.mediarepository.update(
                        {
                            ID: item
                        },
                        {
                            media_status: "draft"
                        }
                    )
                }
            )

            await this.cacheManager.store.del(_cacheKey.all_questionIMG)
            await this.cacheManager.store.del(_cacheKey.all_questionproduct_avatar)

            await this.userAuthService.finishReportLogger(
                foundQuestion.ID,
                ReportLoggerTypes.questionProduct_Invalid
            )

            return {
                selectedUsers: [foundQuestion.post_author]
            }
        }

        return {}

    }

    async countQuestion_ReporterPunishPoints(
        question_ID: number,
        controller_ID: number,
        noti_ID: number,
    ) {

        let allQuestions = await this.getall_questionproduct();
        let foundQuestion = allQuestions.find(
            y => y.ID == question_ID && y.report_controllers.includes(controller_ID)
        )

        if (!foundQuestion) {
            throw new BadRequestException({ message: "[Question Market Service] Can't report answer, answer not found or you are not allowed to access it" })
        }

        let _questionControllerList = foundQuestion.report_controllers;
        let _newQuestionControllerList = _questionControllerList.filter(
            y => y != controller_ID
        )

        let allNotis = await this.userAuthService.getallusernotifications();
        let foundNoti = allNotis.find(
            y => y.ID == noti_ID
        )

        if (!foundNoti || typeof foundNoti.data.reporter_punish_count != 'number') {
            throw new BadRequestException({ message: "[Question Market Service] Notification not found anymore" })
        }

        await this.postrepository.update(
            {
                ID: question_ID
            },
            {
                report_controllers: _newQuestionControllerList
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_question_products)

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

            await this.userAuthService.punishUserByPoint(1, foundQuestion.report_sender)
            let _newNoti: UserNotificationInput = {
                type: UserNotification_Types.questionProduct_Reporter_isPunished,
                data: {
                    question_ID: foundQuestion.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQuestion.report_sender],
                deletion_allowed: [foundQuestion.report_sender]
            }
            await this.userAuthService.createSingleNoti(_newNoti)
            await this.userNotificationRepository.delete({
                ID: noti_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)

            _selectedUsers.push(foundQuestion.report_sender)

            await this.postrepository.update(
                {
                    ID: foundQuestion.ID
                },
                {
                    post_status: "trash",
                    is_reported: false,
                    report_counter: 0,
                    report_controllers: []
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_question_products)

            await this.userAuthService.finishReportLogger(
                foundQuestion.ID,
                ReportLoggerTypes.questionProduct_Invalid
            )

            return {
                selectedUsers: _selectedUsers
            }
        }

        return {}
    }

    async userconfirmClearAnswerReport(
        user: userJWTpayload,
        user_answer_ID: number,
    ) {

        let allUserAnswers = await this.getalluseranswerinmarket();
        let foundAnswer = allUserAnswers.find(
            y => y.ID == user_answer_ID && y.user_ID == user.user_id
        )

        if (!foundAnswer) {
            throw new BadRequestException({ message: "[Question Market Service] Reported answer not found."})
        }

        let allInventories = await this.userAuthService.getAll_UserInventories()
        let foundFighter = allInventories.find(
            y => y.user_ID == user.user_id && y.item_code == ShopItemCodes.reportFighter
        )

        if (
            !foundFighter ||
            foundFighter.item_quantity <= 0
        ) {
            throw new BadRequestException({ message: `You don't have any "Report Fighter" item.`})
        }

        let allNotis = await this.userAuthService.getallusernotifications();

        let foundAnswerReportedNoti = allNotis.find(
            y => y.type == UserNotification_Types.answer_isReported && y.data.user_answer_ID == user_answer_ID
        )

        if (foundAnswerReportedNoti) {
            await this.userNotificationRepository.delete({
                ID: foundAnswerReportedNoti.ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        }

        await this.userInventoryRepository.update(
            {
                user_ID: user.user_id,
                item_code: ShopItemCodes.reportFighter
            },
            {
                item_quantity: foundFighter.item_quantity - 1
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userInventories)

        await this.resetReporteduserAnswer(user_answer_ID)

        let _repeatAnswer = await this.userSubmitNewQuestionAnswer(
            "",
            [],
            foundAnswer.parent_ID,
            foundAnswer.user_ID,
            false,
            foundAnswer.ID
        )

        await this.userAuthService.finishReportLogger(
            foundAnswer.ID,
            ReportLoggerTypes.questionMarketUserAnswer
        )

        return {
            selectedUsers: _repeatAnswer
        }

    }

}
