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
exports.UserAuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blacklist_entity_1 = require("../../models/blacklist/blacklist.entity");
const cacheKeys_entity_1 = require("../../models/cacheKeys/cacheKeys.entity");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const GuestQAndA_entity_1 = require("../../models/GuestQAndA/GuestQAndA.entity");
const leveltable_entity_1 = require("../../models/leveltable/leveltable.entity");
const media_entity_1 = require("../../models/media/media.entity");
const post_entity_1 = require("../../models/post/post.entity");
const questionmarket_useranswer_entity_1 = require("../../models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const useranswer_review_entity_1 = require("../../models/useranswer_review/useranswer_review.entity");
const userauth_entity_1 = require("../../models/userauthentication/userauth.entity");
const userinventory_entity_1 = require("../../models/userinventory/userinventory.entity");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const userprivatemessage_entity_1 = require("../../models/userprivatemessage/userprivatemessage.entity");
const typeorm_2 = require("typeorm");
let config = nestconfig_interface_1.SystemDefaultConfig;
let UserAuthenticationService = class UserAuthenticationService {
    constructor(userrepository, mediarepository, usernotificationrepository, leveltableRepository, postEntityRepository, reportLoggerRepository, userPrivatemessageRepository, questionMarketUseranswerRepository, userAnswerReviewRepository, guestQandARepository, blackListRepository, userInventoryRepository, cacheManager) {
        this.userrepository = userrepository;
        this.mediarepository = mediarepository;
        this.usernotificationrepository = usernotificationrepository;
        this.leveltableRepository = leveltableRepository;
        this.postEntityRepository = postEntityRepository;
        this.reportLoggerRepository = reportLoggerRepository;
        this.userPrivatemessageRepository = userPrivatemessageRepository;
        this.questionMarketUseranswerRepository = questionMarketUseranswerRepository;
        this.userAnswerReviewRepository = userAnswerReviewRepository;
        this.guestQandARepository = guestQandARepository;
        this.blackListRepository = blackListRepository;
        this.userInventoryRepository = userInventoryRepository;
        this.cacheManager = cacheManager;
    }
    async getallusers() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_users);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.userrepository.find();
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
        let _data = await this.usernotificationrepository.find();
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
        let _data = await this.leveltableRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_levelPoints, _data);
        return [..._data];
    }
    async getAllUserPrivateMessages() {
        let _cache = await this.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_userPrivateMessage);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.userPrivatemessageRepository.find();
        await this.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_userPrivateMessage, _data);
        return [..._data];
    }
    async deleteSingleNotiByID(noti_ID, user_id) {
        let allNotis = await this.getallusernotifications();
        let _foundNotis = allNotis.find(y => y.ID == noti_ID && y.user_IDs.includes(user_id) && y.deletion_allowed.includes(user_id));
        if (!_foundNotis) {
            throw new common_1.BadRequestException({ message: "[User Authentication Service] Notification not found or you are not allowed to delete this notification" });
        }
        await this.usernotificationrepository.delete({
            ID: _foundNotis.ID
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        return 1;
    }
    async createSingleNoti(input) {
        await this.usernotificationrepository.save(input);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        return;
    }
    async punishUserByPoint(point_numbers, user_id) {
        let allUsers = await this.getallusers();
        let foundUser = allUsers.find(y => y.ID == user_id);
        let PunishPoint = foundUser.punish_point + point_numbers;
        if (PunishPoint <= 3) {
            await this.userrepository.update({
                ID: foundUser.ID
            }, {
                punish_point: PunishPoint
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
            return;
        }
        else {
            await this.userrepository.update({
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
        await this.postEntityRepository.update({
            post_author: user_ID
        }, {
            author_isBlocked: true
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
        await this.questionMarketUseranswerRepository.update({
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
        await this.postEntityRepository.update({
            post_author: user_ID
        }, {
            author_isBlocked: false
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
        await this.questionMarketUseranswerRepository.update({
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
        await this.userPrivatemessageRepository.save(msgItem);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userPrivateMessage);
        return;
    }
};
UserAuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userauth_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(leveltable_entity_1.LevelTableEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(reportlogger_entity_1.ReportLoggerEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(userprivatemessage_entity_1.UserPrivateMessageEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(useranswer_review_entity_1.UserAnswerReviewEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(GuestQAndA_entity_1.GuestQAndAEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(blacklist_entity_1.BlackListEntity)),
    __param(11, (0, typeorm_1.InjectRepository)(userinventory_entity_1.UserInventoryEntity)),
    __param(12, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
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
        typeorm_2.Repository, Object])
], UserAuthenticationService);
exports.UserAuthenticationService = UserAuthenticationService;
//# sourceMappingURL=user-authentication.service.js.map