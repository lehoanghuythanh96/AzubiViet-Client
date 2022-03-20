"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const arealist_entity_1 = require("../../models/arealist/arealist.entity");
const blacklist_entity_1 = require("../../models/blacklist/blacklist.entity");
const GuestQAndA_entity_1 = require("../../models/GuestQAndA/GuestQAndA.entity");
const leveltable_entity_1 = require("../../models/leveltable/leveltable.entity");
const media_entity_1 = require("../../models/media/media.entity");
const post_entity_1 = require("../../models/post/post.entity");
const postComment_entity_1 = require("../../models/postComment/postComment.entity");
const postlike_entity_1 = require("../../models/postLikes/postlike.entity");
const questionmarketanswer_entity_1 = require("../../models/questionmarketanswer/questionmarketanswer.entity");
const questionmarket_useranswer_entity_1 = require("../../models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const questionproductcategory_entity_1 = require("../../models/questionproductcategory/questionproductcategory.entity");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const serverchat_entity_1 = require("../../models/serverChat/serverchat.entity");
const shopitem_entity_1 = require("../../models/ShopItem/shopitem.entity");
const thankyouitem_entity_1 = require("../../models/thankyouItem/thankyouitem.entity");
const useranswer_review_entity_1 = require("../../models/useranswer_review/useranswer_review.entity");
const userauth_entity_1 = require("../../models/userauthentication/userauth.entity");
const userauth_resolver_1 = require("../../models/userauthentication/userauth.resolver");
const userinventory_entity_1 = require("../../models/userinventory/userinventory.entity");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const usernotifications_resolver_1 = require("../../models/usernotifications/usernotifications.resolver");
const userprivatemessage_entity_1 = require("../../models/userprivatemessage/userprivatemessage.entity");
const userprivatemessage_resolver_1 = require("../../models/userprivatemessage/userprivatemessage.resolver");
const basic_tools_service_1 = require("../../tools/basic-tools/basic-tools.service");
const fetch_data_service_1 = require("../fetch-data/fetch-data.service");
const question_market_service_1 = require("../question-market/question-market.service");
const user_authentication_controller_1 = require("./user-authentication.controller");
const user_authentication_service_1 = require("./user-authentication.service");
let UserAuthenticationModule = class UserAuthenticationModule {
};
UserAuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.registerAsync({
                useFactory: () => ({
                    ttl: 86400,
                    max: 100
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([
                userauth_entity_1.UserEntity,
                arealist_entity_1.AreaListEntity,
                media_entity_1.MediaListEntity,
                usernotifications_entity_1.UserNotificationEntity,
                leveltable_entity_1.LevelTableEntity,
                questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity,
                questionmarketanswer_entity_1.QuestionMarketAnswerEntity,
                questionproductcategory_entity_1.QuestionProductCategoryEntity,
                post_entity_1.PostEntity,
                useranswer_review_entity_1.UserAnswerReviewEntity,
                reportlogger_entity_1.ReportLoggerEntity,
                userprivatemessage_entity_1.UserPrivateMessageEntity,
                GuestQAndA_entity_1.GuestQAndAEntity,
                postComment_entity_1.PostCommentEntity,
                postlike_entity_1.PostLikeEntity,
                blacklist_entity_1.BlackListEntity,
                thankyouitem_entity_1.ThankYouItemEntity,
                serverchat_entity_1.ServerChatEntity,
                shopitem_entity_1.ShopItemEntity,
                userinventory_entity_1.UserInventoryEntity
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('SECRET_TOKEN'),
                    signOptions: { expiresIn: '72h' }
                }),
                inject: [config_1.ConfigService],
            })
        ],
        controllers: [
            user_authentication_controller_1.UserAuthenticationController,
            user_authentication_controller_1.userGGloginController,
            user_authentication_controller_1.NewUserRegisterController,
            user_authentication_controller_1.UserLoginController,
            user_authentication_controller_1.ConfirmUserController,
            user_authentication_controller_1.ReportUserAnswerReviewInvalidControllerInvalidController,
            user_authentication_controller_1.ConfirmReportInvalidAnswerReviewController,
            user_authentication_controller_1.ReportUserAnswerReviewInvalidController,
            user_authentication_controller_1.ConfirmReportInvalidAnswerController,
            user_authentication_controller_1.ReportInvalidQuestionController,
            user_authentication_controller_1.ConfirmReportInvalidQuestionController,
            user_authentication_controller_1.UserBlockEmailFromPrivateMessageController,
            user_authentication_controller_1.UserBuyASHOPitemController,
            user_authentication_controller_1.UserChangePasswordController,
            user_authentication_controller_1.ConfirmResetPasswordController,
            user_authentication_controller_1.UploadQuestionProductAvatarByImgFileController,
            user_authentication_controller_1.UploadUserAvatarByUrlController,
            user_authentication_controller_1.UserUpdateProfileController
        ],
        providers: [
            user_authentication_service_1.UserAuthenticationService,
            basic_tools_service_1.BasicToolsService,
            userauth_resolver_1.UserEntityResolver,
            usernotifications_resolver_1.UserNotificationResolver,
            question_market_service_1.QuestionMarketService,
            userprivatemessage_resolver_1.UserPrivateMessageResolver,
            fetch_data_service_1.FetchDataService
        ]
    })
], UserAuthenticationModule);
exports.UserAuthenticationModule = UserAuthenticationModule;
//# sourceMappingURL=user-authentication.module.js.map