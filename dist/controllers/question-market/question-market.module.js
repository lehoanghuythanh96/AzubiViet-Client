"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionMarketModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const arealist_entity_1 = require("../../models/arealist/arealist.entity");
const blacklist_entity_1 = require("../../models/blacklist/blacklist.entity");
const GuestQAndA_entity_1 = require("../../models/GuestQAndA/GuestQAndA.entity");
const lessoncategory_entity_1 = require("../../models/lessoncategory/lessoncategory.entity");
const leveltable_entity_1 = require("../../models/leveltable/leveltable.entity");
const media_entity_1 = require("../../models/media/media.entity");
const post_entity_1 = require("../../models/post/post.entity");
const postComment_entity_1 = require("../../models/postComment/postComment.entity");
const postlike_entity_1 = require("../../models/postLikes/postlike.entity");
const questionmarketanswer_entity_1 = require("../../models/questionmarketanswer/questionmarketanswer.entity");
const questionmarketanswer_resolver_1 = require("../../models/questionmarketanswer/questionmarketanswer.resolver");
const questionmarketinfo_entity_1 = require("../../models/questionmarketinfo/questionmarketinfo.entity");
const questionmarketinfo_resolver_1 = require("../../models/questionmarketinfo/questionmarketinfo.resolver");
const questionmarket_useranswer_entity_1 = require("../../models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const questionmarket_useranswer_resolver_1 = require("../../models/QuestionMarket_UserAnswer/questionmarket_useranswer.resolver");
const questionproductcategory_entity_1 = require("../../models/questionproductcategory/questionproductcategory.entity");
const questionproductcategory_resolver_1 = require("../../models/questionproductcategory/questionproductcategory.resolver");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const serverchat_entity_1 = require("../../models/serverChat/serverchat.entity");
const shopitem_entity_1 = require("../../models/ShopItem/shopitem.entity");
const thankyouitem_entity_1 = require("../../models/thankyouItem/thankyouitem.entity");
const useranswer_review_entity_1 = require("../../models/useranswer_review/useranswer_review.entity");
const useranswer_review_resolver_1 = require("../../models/useranswer_review/useranswer_review.resolver");
const userauth_entity_1 = require("../../models/userauthentication/userauth.entity");
const userinventory_entity_1 = require("../../models/userinventory/userinventory.entity");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const userprivatemessage_entity_1 = require("../../models/userprivatemessage/userprivatemessage.entity");
const basic_tools_service_1 = require("../../tools/basic-tools/basic-tools.service");
const fetch_data_service_1 = require("../fetch-data/fetch-data.service");
const user_authentication_service_1 = require("../user-authentication/user-authentication.service");
const question_market_controller_1 = require("./question-market.controller");
const question_market_service_1 = require("./question-market.service");
let QuestionMarketModule = class QuestionMarketModule {
};
QuestionMarketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('SECRET_TOKEN'),
                    signOptions: { expiresIn: '5 days' }
                }),
                inject: [config_1.ConfigService],
            }),
            common_1.CacheModule.registerAsync({
                useFactory: () => ({
                    ttl: 86400,
                    max: 100
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([
                questionmarketinfo_entity_1.QuestionMarketInfoEntity,
                arealist_entity_1.AreaListEntity,
                lessoncategory_entity_1.LessonCategoryEntity,
                post_entity_1.PostEntity,
                questionproductcategory_entity_1.QuestionProductCategoryEntity,
                media_entity_1.MediaListEntity,
                questionmarketanswer_entity_1.QuestionMarketAnswerEntity,
                userauth_entity_1.UserEntity,
                questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity,
                usernotifications_entity_1.UserNotificationEntity,
                useranswer_review_entity_1.UserAnswerReviewEntity,
                leveltable_entity_1.LevelTableEntity,
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
            ])
        ],
        controllers: [
            question_market_controller_1.QuestionMarketController,
            question_market_controller_1.AddQuestionProductCategoryController,
            question_market_controller_1.UploadQuestionProductImageByFileController,
            question_market_controller_1.UploadQuestionProductImageByUrlController,
            question_market_controller_1.DeleteTempQuestionProductImageController,
            question_market_controller_1.UploadQuestionProductAnswerImageByFileController,
            question_market_controller_1.UploadQuestionProductAnswerImageByUrlController,
            question_market_controller_1.CreateNewQuestionProductController,
            question_market_controller_1.UploadQuestionProductAvatarByImgFileController,
            question_market_controller_1.UploadQuestionProductAvatarByUrlController,
            question_market_controller_1.EditPrivateQuestionProductController,
            question_market_controller_1.UploadQuestionMarketUserAnswerImageByFileController,
            question_market_controller_1.UploadQuestionMarketUserAnswerImageByUrlController,
            question_market_controller_1.UsersubmitQuestionAnswerController,
            question_market_controller_1.DeleteTempQuestionUserAnswerImageController,
            question_market_controller_1.GetReviewQuestionAnswerController,
            question_market_controller_1.UserSubmitAnswerReviewController,
            question_market_controller_1.UserRequiredReviewUpdateController,
            question_market_controller_1.UserRequireMakingReviewFixedController,
            question_market_controller_1.UserRequireSkipReviewUpdate,
            question_market_controller_1.UserConfirmReviewController,
            question_market_controller_1.useranswer_reportedReviewerRequireOriginalAnswerController,
            question_market_controller_1.ReportedQuestionAuthorRequiredDataController,
            question_market_controller_1.SendPrivateMessageToQuestionAuthorController,
            question_market_controller_1.UserConfirmClearAnswerReportController,
            question_market_controller_1.UserReportExpiredAnswerController,
            question_market_controller_1.UserDeleteSingleQuestionProductController
        ],
        providers: [
            question_market_service_1.QuestionMarketService,
            questionmarketinfo_resolver_1.QuestionMarketInfoResolver,
            questionproductcategory_resolver_1.QuestionProductCategoryResolver,
            basic_tools_service_1.BasicToolsService,
            fetch_data_service_1.FetchDataService,
            questionmarketanswer_resolver_1.QuestionMarketAnswerResolver,
            questionmarket_useranswer_resolver_1.QuestionMarket_UserAnswerResolver,
            user_authentication_service_1.UserAuthenticationService,
            useranswer_review_resolver_1.UserAnswerReviewResolver
        ]
    })
], QuestionMarketModule);
exports.QuestionMarketModule = QuestionMarketModule;
//# sourceMappingURL=question-market.module.js.map