"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchDataModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const admininfo_resolver_1 = require("../../models/admininfo/admininfo.resolver");
const arealist_entity_1 = require("../../models/arealist/arealist.entity");
const blacklist_entity_1 = require("../../models/blacklist/blacklist.entity");
const defaultconfig_entity_1 = require("../../models/defaultconfig/defaultconfig.entity");
const GuestQAndA_entity_1 = require("../../models/GuestQAndA/GuestQAndA.entity");
const GuestQAndA_resolver_1 = require("../../models/GuestQAndA/GuestQAndA.resolver");
const lessoncategory_entity_1 = require("../../models/lessoncategory/lessoncategory.entity");
const leveltable_entity_1 = require("../../models/leveltable/leveltable.entity");
const mainLandingPageInfo_entity_1 = require("../../models/mainlandingpageInfo/mainLandingPageInfo.entity");
const mainLandingPageInfo_resolver_1 = require("../../models/mainlandingpageInfo/mainLandingPageInfo.resolver");
const media_entity_1 = require("../../models/media/media.entity");
const post_entity_1 = require("../../models/post/post.entity");
const post_resolver_1 = require("../../models/post/post.resolver");
const postComment_entity_1 = require("../../models/postComment/postComment.entity");
const postlike_entity_1 = require("../../models/postLikes/postlike.entity");
const questionmarketanswer_entity_1 = require("../../models/questionmarketanswer/questionmarketanswer.entity");
const questionmarket_useranswer_entity_1 = require("../../models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const questionproductcategory_entity_1 = require("../../models/questionproductcategory/questionproductcategory.entity");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const serverchat_entity_1 = require("../../models/serverChat/serverchat.entity");
const serverchat_resolver_1 = require("../../models/serverChat/serverchat.resolver");
const shopitem_entity_1 = require("../../models/ShopItem/shopitem.entity");
const shopitem_resolver_1 = require("../../models/ShopItem/shopitem.resolver");
const thankyouitem_entity_1 = require("../../models/thankyouItem/thankyouitem.entity");
const useranswer_review_entity_1 = require("../../models/useranswer_review/useranswer_review.entity");
const userauth_entity_1 = require("../../models/userauthentication/userauth.entity");
const userinventory_entity_1 = require("../../models/userinventory/userinventory.entity");
const userinventory_resolver_1 = require("../../models/userinventory/userinventory.resolver");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const userprivatemessage_entity_1 = require("../../models/userprivatemessage/userprivatemessage.entity");
const jwt_strategy_1 = require("../../tools/auth-tools/jwt.strategy");
const basic_tools_service_1 = require("../../tools/basic-tools/basic-tools.service");
const lesson_handler_service_1 = require("../lesson-handler/lesson-handler.service");
const question_market_service_1 = require("../question-market/question-market.service");
const user_authentication_service_1 = require("../user-authentication/user-authentication.service");
const fetch_data_controller_1 = require("./fetch-data.controller");
const fetch_data_service_1 = require("./fetch-data.service");
let FetchDataModule = class FetchDataModule {
};
FetchDataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.registerAsync({
                useFactory: () => ({
                    ttl: 86400,
                    max: 100
                })
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('SECRET_TOKEN'),
                    signOptions: { expiresIn: '5 days' }
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                post_entity_1.PostEntity,
                lessoncategory_entity_1.LessonCategoryEntity,
                media_entity_1.MediaListEntity,
                userauth_entity_1.UserEntity,
                arealist_entity_1.AreaListEntity,
                defaultconfig_entity_1.DefaultConfigEntity,
                questionmarketanswer_entity_1.QuestionMarketAnswerEntity,
                questionproductcategory_entity_1.QuestionProductCategoryEntity,
                questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity,
                usernotifications_entity_1.UserNotificationEntity,
                useranswer_review_entity_1.UserAnswerReviewEntity,
                leveltable_entity_1.LevelTableEntity,
                reportlogger_entity_1.ReportLoggerEntity,
                userprivatemessage_entity_1.UserPrivateMessageEntity,
                GuestQAndA_entity_1.GuestQAndAEntity,
                postComment_entity_1.PostCommentEntity,
                mainLandingPageInfo_entity_1.MainLandingPageEntity,
                postlike_entity_1.PostLikeEntity,
                blacklist_entity_1.BlackListEntity,
                thankyouitem_entity_1.ThankYouItemEntity,
                serverchat_entity_1.ServerChatEntity,
                shopitem_entity_1.ShopItemEntity,
                userinventory_entity_1.UserInventoryEntity
            ])
        ],
        controllers: [
            fetch_data_controller_1.FetchDataController,
            fetch_data_controller_1.AddSingleAreaController,
            fetch_data_controller_1.UserSubmitQandAController,
            fetch_data_controller_1.UserSubmitQandA_AnswerController,
            fetch_data_controller_1.UserLikeQA_AnswerController,
            fetch_data_controller_1.UserDeleteQA_AnswerController,
            fetch_data_controller_1.UserLockQAItemController,
            fetch_data_controller_1.ReportInvalidQAController,
            fetch_data_controller_1.ConfirmReportInvalidQA_QuestionController,
            fetch_data_controller_1.ReportInvalidQA_AnswerController,
            fetch_data_controller_1.ConfirmReportInvalidQA_AnswerController,
            fetch_data_controller_1.UserThankyou_QAAnswerController,
            fetch_data_controller_1.UserSendServerchatMsgController,
            fetch_data_controller_1.RemoveAllUserServerChatContentController,
            fetch_data_controller_1.DeleteTemp_QandA_ImageController,
            fetch_data_controller_1.Upload_QandA_ImageByFileController,
            fetch_data_controller_1.Upload_QandA_ImageByUrlController
        ],
        providers: [
            admininfo_resolver_1.AdminInfoResolver,
            post_resolver_1.PostEntityResolver,
            fetch_data_service_1.FetchDataService,
            jwt_strategy_1.JwtStrategy,
            basic_tools_service_1.BasicToolsService,
            lesson_handler_service_1.LessonHandlerService,
            user_authentication_service_1.UserAuthenticationService,
            mainLandingPageInfo_resolver_1.MainLandingPageInfoResolver,
            GuestQAndA_resolver_1.GuestQAndAResolver,
            serverchat_resolver_1.ServerChatResolver,
            shopitem_resolver_1.ShopItemResolver,
            userinventory_resolver_1.UserInventoryResolver,
            question_market_service_1.QuestionMarketService
        ]
    })
], FetchDataModule);
exports.FetchDataModule = FetchDataModule;
//# sourceMappingURL=fetch-data.module.js.map