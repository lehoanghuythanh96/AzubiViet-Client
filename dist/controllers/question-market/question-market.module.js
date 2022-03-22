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
const questionmarketanswer_resolver_1 = require("../../models/questionmarketanswer/questionmarketanswer.resolver");
const questionmarketinfo_resolver_1 = require("../../models/questionmarketinfo/questionmarketinfo.resolver");
const questionmarket_useranswer_resolver_1 = require("../../models/QuestionMarket_UserAnswer/questionmarket_useranswer.resolver");
const questionproductcategory_resolver_1 = require("../../models/questionproductcategory/questionproductcategory.resolver");
const useranswer_review_resolver_1 = require("../../models/useranswer_review/useranswer_review.resolver");
const fetch_data_module_1 = require("../fetch-data/fetch-data.module");
const question_market_controller_1 = require("./question-market.controller");
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
            fetch_data_module_1.FetchDataModule
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
            questionmarketinfo_resolver_1.QuestionMarketInfoResolver,
            questionproductcategory_resolver_1.QuestionProductCategoryResolver,
            questionmarketanswer_resolver_1.QuestionMarketAnswerResolver,
            questionmarket_useranswer_resolver_1.QuestionMarket_UserAnswerResolver,
            useranswer_review_resolver_1.UserAnswerReviewResolver
        ]
    })
], QuestionMarketModule);
exports.QuestionMarketModule = QuestionMarketModule;
//# sourceMappingURL=question-market.module.js.map