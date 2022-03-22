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
const userauth_resolver_1 = require("../../models/userauthentication/userauth.resolver");
const usernotifications_resolver_1 = require("../../models/usernotifications/usernotifications.resolver");
const userprivatemessage_resolver_1 = require("../../models/userprivatemessage/userprivatemessage.resolver");
const fetch_data_module_1 = require("../fetch-data/fetch-data.module");
const user_authentication_controller_1 = require("./user-authentication.controller");
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
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('SECRET_TOKEN'),
                    signOptions: { expiresIn: '72h' }
                }),
                inject: [config_1.ConfigService],
            }),
            fetch_data_module_1.FetchDataModule
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
            userauth_resolver_1.UserEntityResolver,
            usernotifications_resolver_1.UserNotificationResolver,
            userprivatemessage_resolver_1.UserPrivateMessageResolver,
        ]
    })
], UserAuthenticationModule);
exports.UserAuthenticationModule = UserAuthenticationModule;
//# sourceMappingURL=user-authentication.module.js.map