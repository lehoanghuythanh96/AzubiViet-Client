"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchDataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const arealist_entity_1 = require("../../models/arealist/arealist.entity");
const blacklist_entity_1 = require("../../models/blacklist/blacklist.entity");
const cacheKeys_entity_1 = require("../../models/cacheKeys/cacheKeys.entity");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const GuestQAndA_entity_1 = require("../../models/GuestQAndA/GuestQAndA.entity");
const lessoncategory_entity_1 = require("../../models/lessoncategory/lessoncategory.entity");
const leveltable_entity_1 = require("../../models/leveltable/leveltable.entity");
const media_entity_1 = require("../../models/media/media.entity");
const post_entity_1 = require("../../models/post/post.entity");
const postComment_entity_1 = require("../../models/postComment/postComment.entity");
const postlike_entity_1 = require("../../models/postLikes/postlike.entity");
const questionmarketanswer_entity_1 = require("../../models/questionmarketanswer/questionmarketanswer.entity");
const questionmarketinfo_entity_1 = require("../../models/questionmarketinfo/questionmarketinfo.entity");
const questionmarket_useranswer_entity_1 = require("../../models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const questionproductcategory_entity_1 = require("../../models/questionproductcategory/questionproductcategory.entity");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const serverchat_entity_1 = require("../../models/serverChat/serverchat.entity");
const shopitem_entity_1 = require("../../models/ShopItem/shopitem.entity");
const useranswer_review_entity_1 = require("../../models/useranswer_review/useranswer_review.entity");
const userauth_entity_1 = require("../../models/userauthentication/userauth.entity");
const userinventory_entity_1 = require("../../models/userinventory/userinventory.entity");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const userprivatemessage_entity_1 = require("../../models/userprivatemessage/userprivatemessage.entity");
const basic_tools_service_1 = require("../../tools/basic-tools/basic-tools.service");
const typeorm_2 = require("typeorm");
let config = nestconfig_interface_1.SystemDefaultConfig;
let FetchDataService = class FetchDataService {
    constructor(basictools, mediarepository, cacheManager, arealistrepository, userNotificationRepository, userRepository, postCommentsRepository, guestQandARepository, postLikesRepository, userPrivateMessageRepository, reportLoggerRepository, serverChatRepository, shopItemRepository, questionmarketanswerrepository, questionproductcategoryRepository, postrepository, questionmarketuseranswerRepository, userAnswerReviewRepository, userInventoryRepository, lessoncategoryRepository, levelTableRepository, blackListRepository, questionMarketInfoRepository) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.cacheManager = cacheManager;
        this.arealistrepository = arealistrepository;
        this.userNotificationRepository = userNotificationRepository;
        this.userRepository = userRepository;
        this.postCommentsRepository = postCommentsRepository;
        this.guestQandARepository = guestQandARepository;
        this.postLikesRepository = postLikesRepository;
        this.userPrivateMessageRepository = userPrivateMessageRepository;
        this.reportLoggerRepository = reportLoggerRepository;
        this.serverChatRepository = serverChatRepository;
        this.shopItemRepository = shopItemRepository;
        this.questionmarketanswerrepository = questionmarketanswerrepository;
        this.questionproductcategoryRepository = questionproductcategoryRepository;
        this.postrepository = postrepository;
        this.questionmarketuseranswerRepository = questionmarketuseranswerRepository;
        this.userAnswerReviewRepository = userAnswerReviewRepository;
        this.userInventoryRepository = userInventoryRepository;
        this.lessoncategoryRepository = lessoncategoryRepository;
        this.levelTableRepository = levelTableRepository;
        this.blackListRepository = blackListRepository;
        this.questionMarketInfoRepository = questionMarketInfoRepository;
    }
    async getallusers() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_users);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.userRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_users, _data);
        return [..._data];
    }
    async finduserbyEmail(email) {
        let _cache = await this.getallusers();
        let _user = _cache.find(y => y.user_email == email);
        return _user;
    }
    async getalluseravatar() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_useravatars);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.mediarepository.find({
            media_category: config.USER_AVT_CAT,
            media_status: "publish"
        });
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_useravatars, _data);
        return [..._data];
    }
    async getallusernotifications() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_usernotifications);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.userNotificationRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_usernotifications, _data);
        return [..._data];
    }
    async getallReportLogger() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_ReportLogger);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.reportLoggerRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_ReportLogger, _data);
        return [..._data];
    }
    async getAllLevelPoints() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_levelPoints);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.levelTableRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_levelPoints, _data);
        return [..._data];
    }
    async getAllUserPrivateMessages() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_userPrivateMessage);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.userPrivateMessageRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_userPrivateMessage, _data);
        return [..._data];
    }
    async deleteSingleNotiByID(noti_ID, user_id) {
        let allNotis = await this.getallusernotifications();
        let _foundNotis = allNotis.find(y => y.ID == noti_ID && y.user_IDs.includes(user_id) && y.deletion_allowed.includes(user_id));
        if (!_foundNotis) {
            throw new common_1.BadRequestException({ message: "[User Authentication Service] Notification not found or you are not allowed to delete this notification" });
        }
        await this.userNotificationRepository.delete({
            ID: _foundNotis.ID
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        return 1;
    }
    async createSingleNoti(input) {
        await this.userNotificationRepository.save(input);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        return;
    }
    async punishUserByPoint(point_numbers, user_id) {
        let allUsers = await this.getallusers();
        let foundUser = allUsers.find(y => y.ID == user_id);
        let PunishPoint = foundUser.punish_point + point_numbers;
        if (PunishPoint <= 3) {
            await this.userRepository.update({
                ID: foundUser.ID
            }, {
                punish_point: PunishPoint
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
            return;
        }
        else {
            await this.userRepository.update({
                ID: foundUser.ID
            }, {
                punish_point: PunishPoint,
                is_blocked: true
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
            await this.blockAllUserPost(user_id);
            return;
        }
    }
    async finishReportLogger(item_ID, item_type) {
        let _allReportLoggers = await this.getallReportLogger();
        let _foundReport = _allReportLoggers.find(y => y.report_type == item_type && y.parent_ID == item_ID);
        if (_foundReport) {
            await this.reportLoggerRepository.update({
                ID: _foundReport.ID
            }, {
                finished: true
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
            return;
        }
        return;
    }
    async blockAllUserPost(user_ID) {
        await this.postrepository.update({
            post_author: user_ID
        }, {
            author_isBlocked: true
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
        await this.questionmarketuseranswerRepository.update({
            user_ID: user_ID
        }, {
            author_isBlocked: true
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerinMarket);
        await this.userAnswerReviewRepository.update({
            review_author: user_ID
        }, {
            author_isBlocked: true
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
        await this.guestQandARepository.update({
            user_ID: user_ID
        }, {
            author_isBlocked: true
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        return;
    }
    async unblockAllUserPost(user_ID) {
        await this.postrepository.update({
            post_author: user_ID
        }, {
            author_isBlocked: false
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
        await this.questionmarketuseranswerRepository.update({
            user_ID: user_ID
        }, {
            author_isBlocked: false
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerinMarket);
        await this.userAnswerReviewRepository.update({
            review_author: user_ID
        }, {
            author_isBlocked: false
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
        await this.guestQandARepository.update({
            user_ID: user_ID
        }, {
            author_isBlocked: false
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        return;
    }
    async getAllblackListItems() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_blackListItems);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.blackListRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_blackListItems, _data);
        return [..._data];
    }
    async getAll_UserInventories() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_userInventories);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.userInventoryRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_userInventories, _data);
        return [..._data];
    }
    async sendprivateMsgtoUser(target_ID, sender_ID, msgItem) {
        let allBlacklist = await this.getAllblackListItems();
        let foundBlacklist = allBlacklist.find(y => y.type == blacklist_entity_1.BlackListTypes.userPrivateMessage && y.user_ID == target_ID);
        if (foundBlacklist && foundBlacklist.black_list.includes(sender_ID)) {
            throw new common_1.BadRequestException({ message: "The author of this question has blocked all messages from you" });
        }
        await this.userPrivateMessageRepository.save(msgItem);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userPrivateMessage);
        return;
    }
    async getallarea() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.area_list);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.arealistrepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.area_list, _data);
        return [..._data];
    }
    async getAllPostComments() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_postComments);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.postCommentsRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_postComments, _data);
        return [..._data];
    }
    async getAllguestQandA_items() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.guestQandARepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_guestQandAItems, _data);
        return [..._data];
    }
    async getAllpostLikes() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_postLikes);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.postLikesRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_postLikes, _data);
        return [..._data];
    }
    async getAll_ShopItems() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_ShopItems);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.shopItemRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_ShopItems, _data);
        return [..._data];
    }
    async getall_qanda_IMG() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_QA_images);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.mediarepository.find({
            media_category: config.QA_IMG_CAT
        });
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_QA_images, _data);
        return [..._data];
    }
    async getall_Medias() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_medias);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.mediarepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_medias, _data);
        return [..._data];
    }
    async getalltrashMedias() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_trash_medias);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.mediarepository.find({
            media_status: 'trash'
        });
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_trash_medias, _data);
        return [..._data];
    }
    async getallServerChatItems() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_serverChatItems);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.serverChatRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_serverChatItems, _data);
        return [..._data];
    }
    async deleteall_unused_cdnfiles(user) {
        let allUsers = await this.getallusers();
        let foundUser = allUsers.find(y => y.ID == user.user_id);
        if (!foundUser) {
            throw new common_1.BadRequestException({ message: `[FetchDataService] User information not found` });
        }
        if (foundUser.is_blocked == true) {
            let rollPrice = await this.getShopItemPricefromCode(shopitem_entity_1.ShopItemCodes.revivalRoll);
            let revivalRoll = await this.getShopItemAmountfromCode(shopitem_entity_1.ShopItemCodes.revivalRoll, user.user_id);
            if (revivalRoll <= 0 || revivalRoll == undefined) {
                if (foundUser.user_abicoin <= rollPrice) {
                    throw new common_1.BadRequestException({ message: `Your account is blocked, please ask someone else to use "Revival Roll" item to help you` });
                }
                let newMoney = foundUser.user_abicoin - rollPrice;
                await this.userRepository.update({
                    ID: user.user_id
                }, {
                    user_abicoin: newMoney,
                    is_blocked: false,
                    punish_point: 0
                });
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
                let _newMsg = {
                    message_content: 'You were blocked and then automatically unblock by system, you lost 50 Abicoin for this unblock action',
                    sender_email: 'admin@azubiviet.com',
                    sender_ID: 0,
                    user_ID: user.user_id
                };
                await this.userPrivateMessageRepository.save(_newMsg);
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userPrivateMessage);
                await this.unblockAllUserPost(user.user_id);
            }
            else {
                await this.userInventoryRepository.update({
                    item_code: shopitem_entity_1.ShopItemCodes.revivalRoll,
                    user_ID: user.user_id
                }, {
                    item_quantity: revivalRoll - 1
                });
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userInventories);
                await this.userRepository.update({
                    ID: user.user_id
                }, {
                    is_blocked: false,
                    punish_point: 0
                });
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
                await this.unblockAllUserPost(user.user_id);
                let _newMsg = {
                    message_content: 'You were blocked and then automatically unblock by system, you lost 1 "Revival Roll" for this unblock action',
                    sender_email: 'admin@azubiviet.com',
                    sender_ID: 0,
                    user_ID: user.user_id
                };
                await this.userPrivateMessageRepository.save(_newMsg);
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userPrivateMessage);
            }
        }
        let _cache = await this.getalltrashMedias();
        let _trasharr = [..._cache.filter(y => y.user_ID == user.user_id)];
        let cdnlist = _trasharr.map(x => { return x.media_path; });
        await this.basictools.deleteunusedcdn(cdnlist, user);
        let _result = await this.mediarepository.delete({ media_status: 'trash', user_ID: user.user_id });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
        return _result;
    }
    async countQAQuestionPunishPoint(QA_ID, controller_ID, noti_ID) {
        let allQAs = await this.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == QA_ID && y.report_controllers.includes(controller_ID));
        if (!foundQA) {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] Can't report question, question not found or you are not allowed to access it" });
        }
        let _reportCounter = foundQA.report_counter + 1;
        let _controllerList = foundQA.report_controllers;
        let _newControllerList = _controllerList.filter(y => y != controller_ID);
        let allNotis = await this.getallusernotifications();
        let foundNoti = allNotis.find(y => y.ID == noti_ID);
        if (!foundNoti) {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] Notification not found anymore" });
        }
        await this.guestQandARepository.update({
            ID: QA_ID
        }, {
            report_counter: _reportCounter,
            report_controllers: _newControllerList
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _notiUserList = foundNoti.user_IDs;
        let _newNotiUserList = _notiUserList.filter(y => y != controller_ID);
        await this.userNotificationRepository.update({
            ID: noti_ID
        }, {
            user_IDs: _newNotiUserList
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        if (_reportCounter >= 2) {
            await this.punishUserByPoint(1, foundQA.user_ID);
            let _newNoti = {
                type: usernotifications_entity_1.UserNotification_Types.QA_QuestionAuthor_isPunished,
                data: {
                    QA_ID: foundQA.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQA.user_ID],
                deletion_allowed: [foundQA.user_ID]
            };
            await this.createSingleNoti(_newNoti);
            await this.userNotificationRepository.delete({
                ID: noti_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            await this.guestQandARepository.update({
                ID: foundQA.ID
            }, {
                item_status: "trash",
                is_reported: false,
                report_counter: 0,
                report_controllers: []
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
            await this.finishReportLogger(foundQA.ID, reportlogger_entity_1.ReportLoggerTypes.QA_Question_ItemInvalid);
            return {
                selectedUsers: [foundQA.user_ID]
            };
        }
        return {};
    }
    async countQA_Question_ReporterPunishPoints(QA_ID, controller_ID, noti_ID) {
        let allQAs = await this.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == QA_ID && y.report_controllers.includes(controller_ID));
        if (!foundQA) {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] Can't report answer, answer not found or you are not allowed to access it" });
        }
        let _qaControllerList = foundQA.report_controllers;
        let _newQAControllerList = _qaControllerList.filter(y => y != controller_ID);
        let allNotis = await this.getallusernotifications();
        let foundNoti = allNotis.find(y => y.ID == noti_ID);
        if (!foundNoti || typeof foundNoti.data.reporter_punish_count != 'number') {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] Notification not found anymore" });
        }
        await this.guestQandARepository.update({
            ID: QA_ID
        }, {
            report_controllers: _newQAControllerList
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _reportCounter = foundNoti.data.reporter_punish_count + 1;
        let notiData = Object.assign({}, foundNoti.data);
        notiData.reporter_punish_count = _reportCounter;
        let notiUsers = foundNoti.user_IDs;
        let _notiUsers = notiUsers.filter(y => y != controller_ID);
        await this.userNotificationRepository.update({
            ID: noti_ID
        }, {
            data: notiData,
            user_IDs: _notiUsers
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        if (_reportCounter >= 2) {
            let _selectedUsers = [];
            await this.punishUserByPoint(1, foundQA.report_sender);
            let _newNoti = {
                type: usernotifications_entity_1.UserNotification_Types.QA_QuestionItem_Reporter_isPunished,
                data: {
                    QA_ID: foundQA.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQA.report_sender],
                deletion_allowed: [foundQA.report_sender]
            };
            await this.createSingleNoti(_newNoti);
            await this.userNotificationRepository.delete({
                ID: noti_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            _selectedUsers.push(foundQA.report_sender);
            await this.guestQandARepository.update({
                ID: foundQA.ID
            }, {
                is_reported: false,
                report_counter: 0,
                report_controllers: []
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
            await this.finishReportLogger(foundQA.ID, reportlogger_entity_1.ReportLoggerTypes.QA_Question_ItemInvalid);
            return {
                selectedUsers: _selectedUsers
            };
        }
        return {};
    }
    async countQAAnswerPunishPoint(QA_ID, controller_ID, noti_ID) {
        let allQAs = await this.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == QA_ID && y.report_controllers.includes(controller_ID));
        if (!foundQA) {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] Can't report question, question not found or you are not allowed to access it" });
        }
        let foundQAQuestion = allQAs.find(y => y.ID == foundQA.parent_ID && y.item_status == "publish");
        if (!foundQAQuestion) {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] This Q&A item is not available anymore" });
        }
        let _reportCounter = foundQA.report_counter + 1;
        let _controllerList = foundQA.report_controllers;
        let _newControllerList = _controllerList.filter(y => y != controller_ID);
        let allNotis = await this.getallusernotifications();
        let foundNoti = allNotis.find(y => y.ID == noti_ID);
        if (!foundNoti) {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] Notification not found anymore" });
        }
        await this.guestQandARepository.update({
            ID: QA_ID
        }, {
            report_counter: _reportCounter,
            report_controllers: _newControllerList
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _notiUserList = foundNoti.user_IDs;
        let _newNotiUserList = _notiUserList.filter(y => y != controller_ID);
        await this.userNotificationRepository.update({
            ID: noti_ID
        }, {
            user_IDs: _newNotiUserList
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        if (_reportCounter >= 2) {
            await this.punishUserByPoint(1, foundQA.user_ID);
            let _newNoti = {
                type: usernotifications_entity_1.UserNotification_Types.QA_AnswerAuthor_isPunished,
                data: {
                    QA_Question_ID: foundQAQuestion.ID,
                    QA_ID: foundQA.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQA.user_ID],
                deletion_allowed: [foundQA.user_ID]
            };
            await this.createSingleNoti(_newNoti);
            await this.userNotificationRepository.delete({
                ID: noti_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            await this.guestQandARepository.update({
                ID: foundQA.ID
            }, {
                item_status: "trash",
                is_reported: false,
                report_counter: 0,
                report_controllers: []
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
            await this.finishReportLogger(foundQA.ID, reportlogger_entity_1.ReportLoggerTypes.QA_Answer_ItemInvalid);
            return {
                selectedUsers: [foundQA.user_ID]
            };
        }
        return {};
    }
    async countQA_Answer_ReporterPunishPoints(QA_ID, controller_ID, noti_ID) {
        let allQAs = await this.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == QA_ID && y.report_controllers.includes(controller_ID));
        if (!foundQA) {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] Can't report answer, answer not found or you are not allowed to access it" });
        }
        let foundQAQuestion = allQAs.find(y => y.ID == foundQA.parent_ID && y.item_status == "publish");
        if (!foundQAQuestion) {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] This Q&A item is not available anymore" });
        }
        let _qaControllerList = foundQA.report_controllers;
        let _newQAControllerList = _qaControllerList.filter(y => y != controller_ID);
        let allNotis = await this.getallusernotifications();
        let foundNoti = allNotis.find(y => y.ID == noti_ID);
        if (!foundNoti || typeof foundNoti.data.reporter_punish_count != 'number') {
            throw new common_1.BadRequestException({ message: "[Fetch Data Service] Notification not found anymore" });
        }
        await this.guestQandARepository.update({
            ID: QA_ID
        }, {
            report_controllers: _newQAControllerList
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _reportCounter = foundNoti.data.reporter_punish_count + 1;
        let notiData = Object.assign({}, foundNoti.data);
        notiData.reporter_punish_count = _reportCounter;
        let notiUsers = foundNoti.user_IDs;
        let _notiUsers = notiUsers.filter(y => y != controller_ID);
        await this.userNotificationRepository.update({
            ID: noti_ID
        }, {
            data: notiData,
            user_IDs: _notiUsers
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        if (_reportCounter >= 2) {
            let _selectedUsers = [];
            await this.punishUserByPoint(1, foundQA.report_sender);
            let _newNoti = {
                type: usernotifications_entity_1.UserNotification_Types.QA_AnswerItem_Reporter_isPunished,
                data: {
                    QA_Question_ID: foundQAQuestion.ID,
                    QA_ID: foundQA.ID,
                    punish_point: 1
                },
                secret: {},
                user_IDs: [foundQA.report_sender],
                deletion_allowed: [foundQA.report_sender]
            };
            await this.createSingleNoti(_newNoti);
            await this.userNotificationRepository.delete({
                ID: noti_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            _selectedUsers.push(foundQA.report_sender);
            await this.guestQandARepository.update({
                ID: foundQA.ID
            }, {
                is_reported: false,
                report_counter: 0,
                report_controllers: []
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
            await this.finishReportLogger(foundQA.ID, reportlogger_entity_1.ReportLoggerTypes.QA_Answer_ItemInvalid);
            return {
                selectedUsers: _selectedUsers
            };
        }
        return {};
    }
    async likeQAAnswer(user_id, QA_ID, forceLike) {
        let allQAs = await this.getAllguestQandA_items();
        let foundItem = allQAs.find(y => y.ID == QA_ID && y.item_status == "publish" && y.item_type == "answer");
        if (!foundItem) {
            throw new common_1.BadRequestException({ message: "This Q&A Item is not valid anymore" });
        }
        let allPostLikes = await this.getAllpostLikes();
        let foundAnswerLikes = allPostLikes.find(y => y.type == postlike_entity_1.PostLikeTypes.QA_Answer && y.parent_ID == QA_ID);
        if (!foundAnswerLikes) {
            let _newPostLikeitem = {
                type: postlike_entity_1.PostLikeTypes.QA_Answer,
                parent_ID: QA_ID,
                user_array: []
            };
            let _newItem = await this.postLikesRepository.save(_newPostLikeitem);
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_postLikes);
            allPostLikes = await this.getAllpostLikes();
            foundAnswerLikes = _newItem;
        }
        const userarr = [...foundAnswerLikes.user_array];
        if (userarr.includes(user_id) && forceLike == false) {
            userarr.splice(userarr.indexOf(user_id), 1);
            await this.postLikesRepository.update({
                ID: foundAnswerLikes.ID
            }, {
                user_array: userarr
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_postLikes);
            return;
        }
        else if (!userarr.includes(user_id)) {
            userarr.push(user_id);
            await this.postLikesRepository.update({
                ID: foundAnswerLikes.ID
            }, {
                user_array: userarr
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_postLikes);
            return;
        }
        return;
    }
    async checkStrContent(str, sv_name, user_ID) {
        function isValidURL(str) {
            var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return (res !== null);
        }
        ;
        if (isValidURL(str) == true) {
            throw new common_1.BadRequestException({ message: "Please don't embed any URL in your message" });
        }
        let allMsgs = await this.getallServerChatItems();
        let foundDuplicates = allMsgs.filter(y => y.message_content == str && y.server_name == sv_name && y.user_ID == user_ID);
        foundDuplicates.forEach(item => { });
        return true;
    }
    async getShopItemNamefromCode(code) {
        let allItems = await this.getAll_ShopItems();
        let foundItem = allItems.find(y => y.item_code == code);
        if (!foundItem) {
            throw new common_1.BadRequestException({ message: "Item not found" });
        }
        return foundItem.item_name;
    }
    async getShopItemAmountfromCode(code, user_ID) {
        let allInventoryItems = await this.getAll_UserInventories();
        let foundItem = allInventoryItems.find(y => y.item_code == code && y.user_ID == user_ID);
        if (!foundItem) {
            return undefined;
        }
        return foundItem.item_quantity;
    }
    async getShopItemPricefromCode(code) {
        let allItems = await this.getAll_ShopItems();
        let foundItem = allItems.find(y => y.item_code == code);
        if (!foundItem) {
            throw new common_1.BadRequestException({ message: "Item not found" });
        }
        return foundItem.item_price;
    }
};
FetchDataService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectRepository)(arealist_entity_1.AreaListEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(userauth_entity_1.UserEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(postComment_entity_1.PostCommentEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(GuestQAndA_entity_1.GuestQAndAEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(postlike_entity_1.PostLikeEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(userprivatemessage_entity_1.UserPrivateMessageEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(reportlogger_entity_1.ReportLoggerEntity)),
    __param(11, (0, typeorm_1.InjectRepository)(serverchat_entity_1.ServerChatEntity)),
    __param(12, (0, typeorm_1.InjectRepository)(shopitem_entity_1.ShopItemEntity)),
    __param(13, (0, typeorm_1.InjectRepository)(questionmarketanswer_entity_1.QuestionMarketAnswerEntity)),
    __param(14, (0, typeorm_1.InjectRepository)(questionproductcategory_entity_1.QuestionProductCategoryEntity)),
    __param(15, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(16, (0, typeorm_1.InjectRepository)(questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity)),
    __param(17, (0, typeorm_1.InjectRepository)(useranswer_review_entity_1.UserAnswerReviewEntity)),
    __param(18, (0, typeorm_1.InjectRepository)(userinventory_entity_1.UserInventoryEntity)),
    __param(19, (0, typeorm_1.InjectRepository)(lessoncategory_entity_1.LessonCategoryEntity)),
    __param(20, (0, typeorm_1.InjectRepository)(leveltable_entity_1.LevelTableEntity)),
    __param(21, (0, typeorm_1.InjectRepository)(blacklist_entity_1.BlackListEntity)),
    __param(22, (0, typeorm_1.InjectRepository)(questionmarketinfo_entity_1.QuestionMarketInfoEntity)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository, Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], FetchDataService);
exports.FetchDataService = FetchDataService;
//# sourceMappingURL=fetch-data.service.js.map