"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonHandlerModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const arealist_entity_1 = require("../../models/arealist/arealist.entity");
const arealist_resolver_1 = require("../../models/arealist/arealist.resolver");
const blacklist_entity_1 = require("../../models/blacklist/blacklist.entity");
const GuestQAndA_entity_1 = require("../../models/GuestQAndA/GuestQAndA.entity");
const lessoncategory_entity_1 = require("../../models/lessoncategory/lessoncategory.entity");
const lessoncategory_resolver_1 = require("../../models/lessoncategory/lessoncategory.resolver");
const lessonpageinfo_entity_1 = require("../../models/lessonpageinfo/lessonpageinfo.entity");
const lessonpageinfo_resolver_1 = require("../../models/lessonpageinfo/lessonpageinfo.resolver");
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
const userinventory_entity_1 = require("../../models/userinventory/userinventory.entity");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const userprivatemessage_entity_1 = require("../../models/userprivatemessage/userprivatemessage.entity");
const basic_tools_service_1 = require("../../tools/basic-tools/basic-tools.service");
const fetch_data_service_1 = require("../fetch-data/fetch-data.service");
const question_market_service_1 = require("../question-market/question-market.service");
const user_authentication_service_1 = require("../user-authentication/user-authentication.service");
const lesson_handler_controller_1 = require("./lesson-handler.controller");
const lesson_handler_service_1 = require("./lesson-handler.service");
let LessonHandlerModule = class LessonHandlerModule {
};
LessonHandlerModule = __decorate([
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
                media_entity_1.MediaListEntity,
                post_entity_1.PostEntity,
                lessonpageinfo_entity_1.LessonGuestPageEntity,
                arealist_entity_1.AreaListEntity,
                lessoncategory_entity_1.LessonCategoryEntity,
                questionproductcategory_entity_1.QuestionProductCategoryEntity,
                userauth_entity_1.UserEntity,
                questionmarketanswer_entity_1.QuestionMarketAnswerEntity,
                questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity,
                useranswer_review_entity_1.UserAnswerReviewEntity,
                usernotifications_entity_1.UserNotificationEntity,
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
            lesson_handler_controller_1.LessonHandlerController,
            lesson_handler_controller_1.UploadLessonImageController,
            lesson_handler_controller_1.PublishNewLessonController,
            lesson_handler_controller_1.EditSingleLessonController,
            lesson_handler_controller_1.UploadLessonAvatarByUrlController,
            lesson_handler_controller_1.UploadLessonAvatarByimgFileController,
            lesson_handler_controller_1.DeletesinglelessonController,
            lesson_handler_controller_1.AddLessonCategoryController
        ],
        providers: [
            lesson_handler_service_1.LessonHandlerService,
            basic_tools_service_1.BasicToolsService,
            arealist_resolver_1.AreaListResolver,
            lessoncategory_resolver_1.LessonCategoryResolver,
            lessonpageinfo_resolver_1.LessonGuestPageResolver,
            fetch_data_service_1.FetchDataService,
            question_market_service_1.QuestionMarketService,
            user_authentication_service_1.UserAuthenticationService
        ]
    })
], LessonHandlerModule);
exports.LessonHandlerModule = LessonHandlerModule;
//# sourceMappingURL=lesson-handler.module.js.map