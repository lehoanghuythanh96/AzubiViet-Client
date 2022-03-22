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
exports.UserUpdateProfileController = exports.UploadUserAvatarByUrlController = exports.UploadQuestionProductAvatarByImgFileController = exports.ConfirmResetPasswordController = exports.UserChangePasswordController = exports.UserBuyASHOPitemController = exports.UserBlockEmailFromPrivateMessageController = exports.ConfirmReportInvalidQuestionController = exports.ReportInvalidQuestionController = exports.ConfirmReportInvalidAnswerController = exports.ReportUserAnswerReviewInvalidController = exports.ConfirmReportInvalidAnswerReviewController = exports.ReportUserAnswerReviewInvalidControllerInvalidController = exports.ConfirmUserController = exports.UserLoginController = exports.NewUserRegisterController = exports.userGGloginController = exports.UserAuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const rxjs_1 = require("rxjs");
const userauth_entity_1 = require("../../models/userauthentication/userauth.entity");
const basic_tools_service_1 = require("../../tools/basic-tools/basic-tools.service");
const user_authentication_service_1 = require("./user-authentication.service");
const crypto = require("crypto");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const nodemailer = require("nodemailer");
const cacheKeys_entity_1 = require("../../models/cacheKeys/cacheKeys.entity");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const typeorm_2 = require("typeorm");
const question_market_service_1 = require("../question-market/question-market.service");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const blacklist_entity_1 = require("../../models/blacklist/blacklist.entity");
const fetch_data_service_1 = require("../fetch-data/fetch-data.service");
const userinventory_entity_1 = require("../../models/userinventory/userinventory.entity");
const Joi = require("joi");
let nestconfig = process.env;
let config = nestconfig_interface_1.SystemDefaultConfig;
let UserAuthenticationController = class UserAuthenticationController {
};
UserAuthenticationController = __decorate([
    (0, common_1.Controller)('user-authentication')
], UserAuthenticationController);
exports.UserAuthenticationController = UserAuthenticationController;
let userGGloginController = class userGGloginController {
    constructor(fetchDataService, jwt) {
        this.fetchDataService = fetchDataService;
        this.jwt = jwt;
    }
    async userAuthGoogle(GGauthBody) {
        let _res = await this.fetchDataService.basictools.verifyGGidtoken(GGauthBody);
        if (!_res.email) {
            return new common_1.BadRequestException({
                message: 'GG login failed, please contact admin',
            });
        }
        const _user = await this.fetchDataService.finduserbyEmail(_res.email);
        if (_user) {
            let payload = {
                user_id: _user.ID,
                user_name: _user.user_name,
                user_email: _user.user_email,
                user_role: _user.user_role,
                access_token: null,
            };
            let _token = this.jwt.sign(payload);
            payload.access_token = _token;
            return payload;
        }
        else {
            let _tempname = _res.email.split('@')[0];
            let all_users = await this.fetchDataService.getallusers();
            let _foundname = all_users.find((y) => y.user_name == _tempname);
            if (_foundname) {
                _tempname = _tempname + crypto.randomBytes(2).toString('hex');
            }
            let __userinfo = {
                user_name: _res.name || _tempname,
                user_email: _res.email,
                user_password: crypto.randomBytes(20).toString('hex'),
            };
            let _reg = await this.fetchDataService.userRepository.save(__userinfo);
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
            let payload = {
                user_id: _reg.ID,
                user_name: _reg.user_name,
                user_email: _reg.user_email,
                user_role: _reg.user_role,
                access_token: null,
            };
            let _token = this.jwt.sign(payload);
            payload.access_token = _token;
            return payload;
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userGGloginController.prototype, "userAuthGoogle", null);
userGGloginController = __decorate([
    (0, common_1.Controller)('userGGlogin'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService,
        jwt_1.JwtService])
], userGGloginController);
exports.userGGloginController = userGGloginController;
let NewUserRegisterController = class NewUserRegisterController {
    constructor(jwt, fetchDataService) {
        this.jwt = jwt;
        this.fetchDataService = fetchDataService;
    }
    async newuserregister(body) {
        let _allusers = await this.fetchDataService.getallusers();
        let _found = _allusers.find((y) => y.user_email == body.user_email);
        if (_found) {
            throw new common_1.BadRequestException({ message: 'This email is already used' });
        }
        let _registeredEmail = await this.fetchDataService.cacheManager.get(body.user_email);
        if (_registeredEmail) {
            throw new common_1.BadRequestException({
                message: 'Email này đã được dùng để đăng ký, nếu bạn chưa nhận được Email xác nhận, vui lòng chờ 2 phút sau đó thử đăng ký lại.',
            });
        }
        await this.fetchDataService.cacheManager.set(body.user_email, body.user_email, {
            ttl: 120,
        });
        let _newpass = await this.fetchDataService.basictools.genBcrypt(body.user_password);
        body.user_password = _newpass;
        let _jwtstr = this.jwt.sign(body, {
            expiresIn: '24h',
        });
        let _url = JSON.parse(nestconfig.MAIL_DOMAIN).MY_DOMAIN +
            '/confirmuser?secretkey=' +
            _jwtstr;
        let transporter = nodemailer.createTransport({
            host: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_USERNAME,
                pass: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        let mailOptions = {
            from: 'admin@' + JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            to: body.user_email,
            subject: 'Registration confirmation with AzubiViet',
            html: `
            Dear Sir/ Madam,
            <br/><br/>
            thank you for registering with Azubiviet Community, please confirm your registration with this link in 24 hours:<br/><br/>
            <a href="${_url}">${_url}</a>
            <br/><br/>
            Yours faithfully,<br/>
            Admin from AzubiViet
            `,
        };
        let _sent = await transporter.sendMail(mailOptions);
        return _sent;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewUserRegisterController.prototype, "newuserregister", null);
NewUserRegisterController = __decorate([
    (0, common_1.Controller)('newuserregister'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        fetch_data_service_1.FetchDataService])
], NewUserRegisterController);
exports.NewUserRegisterController = NewUserRegisterController;
let UserLoginController = class UserLoginController {
    constructor(jwt, fetchDataService) {
        this.jwt = jwt;
        this.fetchDataService = fetchDataService;
    }
    async userlogin(body) {
        let _allusers = await this.fetchDataService.getallusers();
        let _found = _allusers.find((y) => y.user_email == body.user_email);
        if (!_found) {
            throw new common_1.BadRequestException({
                message: "The account with this email doesn't exist",
            });
        }
        let _hashedpw = _found.user_password;
        let _matched = await this.fetchDataService.basictools.matchbcrypt(body.user_password, _hashedpw);
        if (!_matched) {
            throw new common_1.BadRequestException({ message: 'Wrong password' });
        }
        let payload = {
            user_id: _found.ID,
            user_name: _found.user_name,
            user_email: _found.user_email,
            user_role: _found.user_role,
            access_token: null,
        };
        let _token = this.jwt.sign(payload);
        payload.access_token = _token;
        return payload;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserLoginController.prototype, "userlogin", null);
UserLoginController = __decorate([
    (0, common_1.Controller)('userlogin'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        fetch_data_service_1.FetchDataService])
], UserLoginController);
exports.UserLoginController = UserLoginController;
let ConfirmUserController = class ConfirmUserController {
    constructor(jwt, fetchDataService) {
        this.jwt = jwt;
        this.fetchDataService = fetchDataService;
    }
    async confirmuser(query) {
        let _decoded = this.jwt.verify(query.secretkey);
        if (_decoded) {
            if (!_decoded.user_email || !_decoded.user_password) {
                throw new common_1.BadRequestException({ message: 'Token invalid' });
            }
            let useremail = _decoded.user_email;
            let password = _decoded.user_password;
            let _allusers = await this.fetchDataService.getallusers();
            let _found = _allusers.find((y) => y.user_email == useremail);
            if (_found) {
                throw new common_1.BadRequestException({
                    message: 'Email is already confirmed',
                });
            }
            let _username = useremail.split('@')[0];
            let all_users = await this.fetchDataService.getallusers();
            let _foundname = all_users.find((y) => y.user_name == _username);
            if (_foundname) {
                _username = _username + crypto.randomBytes(2).toString('hex');
            }
            await this.fetchDataService.userRepository.save({
                user_name: _username,
                user_email: useremail,
                user_password: password,
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
            return 'Đã xác nhận thành công, bạn bây giờ có thể dùng email này để đăng nhập.';
        }
        else {
            throw new common_1.BadRequestException({ message: 'Invalid token' });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConfirmUserController.prototype, "confirmuser", null);
ConfirmUserController = __decorate([
    (0, common_1.Controller)('confirmuser'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        fetch_data_service_1.FetchDataService])
], ConfirmUserController);
exports.ConfirmUserController = ConfirmUserController;
let ReportUserAnswerReviewInvalidControllerInvalidController = class ReportUserAnswerReviewInvalidControllerInvalidController {
    constructor(questionmarketService, fetchDataService) {
        this.questionmarketService = questionmarketService;
        this.fetchDataService = fetchDataService;
    }
    async report_user_answer_review_invalid(req, body) {
        let allUserAnswerReviews = await this.questionmarketService.getAllUserAnswerReviews();
        let foundUserAnswerReview = allUserAnswerReviews.find((y) => y.ID == body.user_answer_review_ID && y.review_status == 'publish');
        if (!foundUserAnswerReview ||
            foundUserAnswerReview.review_confirmed == true ||
            foundUserAnswerReview.is_reported == true) {
            throw new common_1.ForbiddenException({
                message: '[User Authentication Controller] This review is not available anymore',
            });
        }
        if (foundUserAnswerReview.answerer_ID != req.user.user_id) {
            throw new common_1.ForbiddenException({
                message: '[User Authentication Controller] You are not allowed to access this answer',
            });
        }
        let selectedUsers = [];
        let blacklist = [req.user.user_id, foundUserAnswerReview.review_author];
        let _allUsers = [...(await this.fetchDataService.getallusers())];
        let filteredUsers = _allUsers.filter((y) => !blacklist.includes(y.ID) && y.is_blocked == false);
        for (let i = 0; i < 5; i++) {
            if (filteredUsers.length > 0) {
                let random = Math.floor(Math.random() * filteredUsers.length);
                let _tempID = filteredUsers[random].ID;
                if (!selectedUsers.includes(_tempID)) {
                    selectedUsers.push(_tempID);
                }
                filteredUsers.splice(random, 1);
            }
        }
        await this.fetchDataService.userAnswerReviewRepository.update({
            ID: body.user_answer_review_ID,
        }, {
            is_reported: true,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            reported_date: new Date(),
            report_notes: body.report_notes,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
        let _newReportLogger = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: foundUserAnswerReview.user_answer_ID,
            report_type: reportlogger_entity_1.ReportLoggerTypes.questionMarket_UserAnswerReview,
        };
        await this.fetchDataService.reportLoggerRepository.save(_newReportLogger);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
        let _newNoti = {
            type: usernotifications_entity_1.UserNotification_Types.useranswer_review_isReported,
            data: {
                question_ID: foundUserAnswerReview.question_ID,
                user_answer_ID: foundUserAnswerReview.user_answer_ID,
                user_answer_review_ID: foundUserAnswerReview.ID,
                reporter_punish_count: 0,
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: [],
        };
        await this.fetchDataService.userNotificationRepository.save(_newNoti);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        await this.fetchDataService.userNotificationRepository.delete({
            ID: body.notification_ID,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        let allNotis = await this.fetchDataService.getallusernotifications();
        let foundUserAnswerReviewNoti = allNotis.find((y) => y.type == usernotifications_entity_1.UserNotification_Types.answer_isReviewed &&
            y.data.review_ID == body.user_answer_review_ID);
        if (foundUserAnswerReviewNoti) {
            selectedUsers = selectedUsers.concat(foundUserAnswerReviewNoti.user_IDs);
            await this.fetchDataService.userNotificationRepository.delete({
                ID: foundUserAnswerReviewNoti.ID,
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        }
        return {
            selectedUsers: selectedUsers,
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportUserAnswerReviewInvalidControllerInvalidController.prototype, "report_user_answer_review_invalid", null);
ReportUserAnswerReviewInvalidControllerInvalidController = __decorate([
    (0, common_1.Controller)('report_user_answer_review_invalid'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        fetch_data_service_1.FetchDataService])
], ReportUserAnswerReviewInvalidControllerInvalidController);
exports.ReportUserAnswerReviewInvalidControllerInvalidController = ReportUserAnswerReviewInvalidControllerInvalidController;
let ConfirmReportInvalidAnswerReviewController = class ConfirmReportInvalidAnswerReviewController {
    constructor(questionmarketService, fetchDataService) {
        this.questionmarketService = questionmarketService;
        this.fetchDataService = fetchDataService;
    }
    async confirm_report_invalid_answer_review(req, body) {
        let allUsers = await this.fetchDataService.getallusers();
        let allUserAnswerReviews = await this.questionmarketService.getAllUserAnswerReviews();
        let foundAnswerReview = allUserAnswerReviews.find((y) => y.ID == body.user_answer_review_ID);
        if (!foundAnswerReview.report_controllers.includes(req.user.user_id)) {
            throw new common_1.BadRequestException({
                message: "[User Authentication Controller] You don't have the permission to report this review'",
            });
        }
        if (!foundAnswerReview || foundAnswerReview.is_reported == false) {
            await this.fetchDataService.userNotificationRepository.delete({
                ID: body.notification_ID,
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.BadRequestException({
                message: '[User Authentication Controller] This report is not available anymore',
            });
        }
        let reviewer = allUsers.find((y) => y.ID == foundAnswerReview.review_author);
        let reporter = allUsers.find((y) => y.ID == foundAnswerReview.report_sender);
        if (!reporter || !reviewer) {
            throw new common_1.ForbiddenException({
                message: "[User Authentication Controller] Reporter's or reviewer's account is deleted",
            });
        }
        if (body.report_result == true) {
            return await this.questionmarketService.countAnswerReviewPunishPoint(body.user_answer_review_ID, req.user.user_id, body.notification_ID);
        }
        else {
            return await this.questionmarketService.countUserAnswerReview_ReporterPunishPoints(body.user_answer_review_ID, req.user.user_id, body.notification_ID);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfirmReportInvalidAnswerReviewController.prototype, "confirm_report_invalid_answer_review", null);
ConfirmReportInvalidAnswerReviewController = __decorate([
    (0, common_1.Controller)('confirm_report_invalid_answer_review'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        fetch_data_service_1.FetchDataService])
], ConfirmReportInvalidAnswerReviewController);
exports.ConfirmReportInvalidAnswerReviewController = ConfirmReportInvalidAnswerReviewController;
let ReportUserAnswerReviewInvalidController = class ReportUserAnswerReviewInvalidController {
    constructor(questionmarketService, fetchDataService) {
        this.questionmarketService = questionmarketService;
        this.fetchDataService = fetchDataService;
    }
    async report_user_answer_invalid(req, body) {
        let allUserAnswer = await this.questionmarketService.getalluseranswerinmarket();
        let foundUserAnswer = allUserAnswer.find((y) => y.ID == body.user_answer_ID && y.answer_status == 'publish');
        if (!foundUserAnswer || foundUserAnswer.is_reviewed == true) {
            throw new common_1.ForbiddenException({
                message: '[User Authentication Controller] This answer is not available anymore',
            });
        }
        if (!foundUserAnswer.waiting_reviewers.includes(req.user.user_id)) {
            throw new common_1.ForbiddenException({
                message: '[User Authentication Controller] You are not allowed to access this answer',
            });
        }
        let selectedUsers = [];
        let blacklist = [req.user.user_id, foundUserAnswer.user_ID];
        let _allUsers = [...(await this.fetchDataService.getallusers())];
        let filteredUsers = _allUsers.filter((y) => !blacklist.includes(y.ID) && y.is_blocked == false);
        for (let i = 0; i < 5; i++) {
            if (filteredUsers.length > 0) {
                let random = Math.floor(Math.random() * filteredUsers.length);
                let _tempID = filteredUsers[random].ID;
                if (!selectedUsers.includes(_tempID)) {
                    selectedUsers.push(_tempID);
                }
                filteredUsers.splice(random, 1);
            }
        }
        await this.fetchDataService.questionmarketuseranswerRepository.update({
            ID: body.user_answer_ID,
        }, {
            is_reported: true,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            reported_date: new Date(),
            report_notes: body.report_notes,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerinMarket);
        let _newReportLogger = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.user_answer_ID,
            report_type: reportlogger_entity_1.ReportLoggerTypes.questionMarketUserAnswer,
        };
        await this.fetchDataService.reportLoggerRepository.save(_newReportLogger);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
        let _newNoti = {
            type: usernotifications_entity_1.UserNotification_Types.answer_isReported,
            data: {
                question_ID: foundUserAnswer.parent_ID,
                user_answer_ID: body.user_answer_ID,
                reporter_punish_count: 0,
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: [],
        };
        await this.fetchDataService.userNotificationRepository.save(_newNoti);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        await this.fetchDataService.userNotificationRepository.delete({
            ID: body.notification_ID,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        let allNotis = await this.fetchDataService.getallusernotifications();
        let foundUserAnswerNoti = allNotis.find((y) => y.type == usernotifications_entity_1.UserNotification_Types.user_answer &&
            y.data.user_answer_ID == body.user_answer_ID);
        if (foundUserAnswerNoti) {
            selectedUsers = selectedUsers.concat(foundUserAnswerNoti.user_IDs);
            await this.fetchDataService.userNotificationRepository.delete({
                ID: foundUserAnswerNoti.ID,
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        }
        return {
            selectedUsers: selectedUsers,
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportUserAnswerReviewInvalidController.prototype, "report_user_answer_invalid", null);
ReportUserAnswerReviewInvalidController = __decorate([
    (0, common_1.Controller)('report_user_answer_invalid'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        fetch_data_service_1.FetchDataService])
], ReportUserAnswerReviewInvalidController);
exports.ReportUserAnswerReviewInvalidController = ReportUserAnswerReviewInvalidController;
let ConfirmReportInvalidAnswerController = class ConfirmReportInvalidAnswerController {
    constructor(questionmarketService, fetchDataService) {
        this.questionmarketService = questionmarketService;
        this.fetchDataService = fetchDataService;
    }
    async confirm_report_invalid_answer(req, body) {
        let allUsers = await this.fetchDataService.getallusers();
        let allUserAnswers = await this.questionmarketService.getalluseranswerinmarket();
        let foundAnswer = allUserAnswers.find((y) => y.ID == body.user_answer_ID);
        if (!foundAnswer.report_controllers.includes(req.user.user_id)) {
            throw new common_1.BadRequestException({
                message: "[User Authentication Controller] You don't have the permission to report this answer'",
            });
        }
        if (!foundAnswer || foundAnswer.is_reported == false) {
            await this.fetchDataService.userNotificationRepository.delete({
                ID: body.notification_ID,
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.BadRequestException({
                message: '[User Authentication Controller] This report is not available anymore',
            });
        }
        let answerer = allUsers.find((y) => y.ID == foundAnswer.user_ID);
        let reporter = allUsers.find((y) => y.ID == foundAnswer.report_sender);
        if (!reporter || !answerer) {
            throw new common_1.ForbiddenException({
                message: "[User Authentication Controller] Reporter's or answerer's account is deleted",
            });
        }
        if (body.report_result == true) {
            return await this.questionmarketService.countAnswerPunishPoint(body.user_answer_ID, req.user.user_id, body.notification_ID);
        }
        else {
            return await this.questionmarketService.countUserAnswer_ReporterPunishPoints(body.user_answer_ID, req.user.user_id, body.notification_ID);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfirmReportInvalidAnswerController.prototype, "confirm_report_invalid_answer", null);
ConfirmReportInvalidAnswerController = __decorate([
    (0, common_1.Controller)('confirm_report_invalid_answer'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        fetch_data_service_1.FetchDataService])
], ConfirmReportInvalidAnswerController);
exports.ConfirmReportInvalidAnswerController = ConfirmReportInvalidAnswerController;
let ReportInvalidQuestionController = class ReportInvalidQuestionController {
    constructor(questionmarketService, fetchDataService) {
        this.questionmarketService = questionmarketService;
        this.fetchDataService = fetchDataService;
    }
    async report_invalid_question(req, body) {
        let allQuestionProduct = await this.questionmarketService.getall_questionproduct();
        let foundQuestion = allQuestionProduct.find((y) => y.ID == body.question_ID);
        if (!foundQuestion || foundQuestion.post_status != 'publish') {
            throw new common_1.ForbiddenException({
                message: '[User Authentication Controller] This question is not available anymore',
            });
        }
        let selectedUsers = [];
        let blacklist = [req.user.user_id, foundQuestion.post_author];
        let _allUsers = [...(await this.fetchDataService.getallusers())];
        let filteredUsers = _allUsers.filter((y) => !blacklist.includes(y.ID) && y.is_blocked == false);
        for (let i = 0; i < 5; i++) {
            if (filteredUsers.length > 0) {
                let random = Math.floor(Math.random() * filteredUsers.length);
                let _tempID = filteredUsers[random].ID;
                if (!selectedUsers.includes(_tempID)) {
                    selectedUsers.push(_tempID);
                }
                filteredUsers.splice(random, 1);
            }
        }
        await this.fetchDataService.postrepository.update({
            ID: body.question_ID,
        }, {
            is_reported: true,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            reported_date: new Date(),
            report_notes: body.report_notes,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
        let _newReportLogger = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.question_ID,
            report_type: reportlogger_entity_1.ReportLoggerTypes.questionProduct_Invalid,
        };
        await this.fetchDataService.reportLoggerRepository.save(_newReportLogger);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
        let _newNoti = {
            type: usernotifications_entity_1.UserNotification_Types.questionProduct_isReported,
            data: {
                question_ID: foundQuestion.ID,
                reporter_punish_count: 0,
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: [],
        };
        await this.fetchDataService.userNotificationRepository.save(_newNoti);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        return {
            selectedUsers: selectedUsers,
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportInvalidQuestionController.prototype, "report_invalid_question", null);
ReportInvalidQuestionController = __decorate([
    (0, common_1.Controller)('report_invalid_question'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        fetch_data_service_1.FetchDataService])
], ReportInvalidQuestionController);
exports.ReportInvalidQuestionController = ReportInvalidQuestionController;
let ConfirmReportInvalidQuestionController = class ConfirmReportInvalidQuestionController {
    constructor(questionmarketService, fetchDataService) {
        this.questionmarketService = questionmarketService;
        this.fetchDataService = fetchDataService;
    }
    async confirm_report_invalid_question(req, body) {
        let allUsers = await this.fetchDataService.getallusers();
        let allQuestions = await this.questionmarketService.getall_questionproduct();
        let foundQuestion = allQuestions.find((y) => y.ID == body.question_ID);
        if (!foundQuestion.report_controllers.includes(req.user.user_id)) {
            throw new common_1.BadRequestException({
                message: "[User Authentication Controller] You don't have the permission to report this answer'",
            });
        }
        if (!foundQuestion || foundQuestion.is_reported == false) {
            await this.fetchDataService.userNotificationRepository.delete({
                ID: body.notification_ID,
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.BadRequestException({
                message: '[User Authentication Controller] This report is not available anymore',
            });
        }
        let post_author = allUsers.find((y) => y.ID == foundQuestion.post_author);
        let reporter = allUsers.find((y) => y.ID == foundQuestion.report_sender);
        if (!reporter || !post_author) {
            throw new common_1.ForbiddenException({
                message: "[User Authentication Controller] Reporter's or answerer's account is deleted",
            });
        }
        if (body.report_result == true) {
            return await this.questionmarketService.countQuestionPunishPoint(body.question_ID, req.user.user_id, body.notification_ID);
        }
        else {
            return await this.questionmarketService.countQuestion_ReporterPunishPoints(body.question_ID, req.user.user_id, body.notification_ID);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfirmReportInvalidQuestionController.prototype, "confirm_report_invalid_question", null);
ConfirmReportInvalidQuestionController = __decorate([
    (0, common_1.Controller)('confirm_report_invalid_question'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        fetch_data_service_1.FetchDataService])
], ConfirmReportInvalidQuestionController);
exports.ConfirmReportInvalidQuestionController = ConfirmReportInvalidQuestionController;
let UserBlockEmailFromPrivateMessageController = class UserBlockEmailFromPrivateMessageController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async userblockemailfromprivatemessage(req, body) {
        let _allmsgs = await this.fetchDataService.getAllUserPrivateMessages();
        let foundMsg = _allmsgs.find((y) => y.ID == body.msg_ID);
        if (!foundMsg) {
            throw new common_1.BadRequestException({
                message: 'This message is not a available anymore',
            });
        }
        let allBlacklist = await this.fetchDataService.getAllblackListItems();
        let foundUserBlacklist = allBlacklist.find((y) => y.type == blacklist_entity_1.BlackListTypes.userPrivateMessage &&
            y.user_ID == req.user.user_id);
        if (!foundUserBlacklist) {
            let newBlacklist = {
                type: blacklist_entity_1.BlackListTypes.userPrivateMessage,
                user_ID: req.user.user_id,
                black_list: [],
            };
            foundUserBlacklist = await this.fetchDataService.blackListRepository.save(newBlacklist);
        }
        let blacklistarr = [...foundUserBlacklist.black_list];
        if (!blacklistarr.includes(foundMsg.sender_ID)) {
            blacklistarr.push(foundMsg.sender_ID);
        }
        await this.fetchDataService.blackListRepository.update({
            ID: foundUserBlacklist.ID,
        }, {
            black_list: blacklistarr,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_blackListItems);
        await this.fetchDataService.userPrivateMessageRepository.delete({
            user_ID: req.user.user_id,
            sender_ID: foundMsg.sender_ID,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userPrivateMessage);
        return;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserBlockEmailFromPrivateMessageController.prototype, "userblockemailfromprivatemessage", null);
UserBlockEmailFromPrivateMessageController = __decorate([
    (0, common_1.Controller)('userblockemailfromprivatemessage'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UserBlockEmailFromPrivateMessageController);
exports.UserBlockEmailFromPrivateMessageController = UserBlockEmailFromPrivateMessageController;
let UserBuyASHOPitemController = class UserBuyASHOPitemController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async userbuyashopitem(req, body) {
        let allusers = await this.fetchDataService.getallusers();
        let foundUser = allusers.find((y) => y.ID == req.user.user_id);
        if (!foundUser) {
            throw new common_1.BadRequestException({ message: 'User not found' });
        }
        let currMoney = foundUser.user_abicoin;
        let itemPrice = await this.fetchDataService.getShopItemPricefromCode(body.item_code);
        let totalAmount = itemPrice * body.quantity;
        if (currMoney < totalAmount) {
            throw new common_1.BadRequestException({
                message: "You don't have enough Abicoin to buy this item",
            });
        }
        let allInventories = await this.fetchDataService.getAll_UserInventories();
        let foundInventory = allInventories.find((y) => y.item_code == body.item_code && y.user_ID == req.user.user_id);
        let currQuantity = await this.fetchDataService.getShopItemAmountfromCode(body.item_code, req.user.user_id);
        if (!foundInventory) {
            let _newItem = {
                item_quantity: 0,
                item_code: body.item_code,
                user_ID: req.user.user_id,
            };
            await this.fetchDataService.userInventoryRepository.save(_newItem);
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userInventories);
            currQuantity = 0;
        }
        let newQuantity = currQuantity + body.quantity;
        let newMoney = currMoney - totalAmount;
        await this.fetchDataService.userRepository.update({
            ID: req.user.user_id,
        }, {
            user_abicoin: newMoney,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
        await this.fetchDataService.userInventoryRepository.update({
            item_code: body.item_code,
            user_ID: req.user.user_id,
        }, {
            item_quantity: newQuantity,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userInventories);
        return;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserBuyASHOPitemController.prototype, "userbuyashopitem", null);
UserBuyASHOPitemController = __decorate([
    (0, common_1.Controller)('userbuyashopitem'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UserBuyASHOPitemController);
exports.UserBuyASHOPitemController = UserBuyASHOPitemController;
let UserChangePasswordController = class UserChangePasswordController {
    constructor(jwt, fetchDataService) {
        this.jwt = jwt;
        this.fetchDataService = fetchDataService;
    }
    async userchangepassword(req, body) {
        let hashedpass = await this.fetchDataService.basictools.genBcrypt(body.user_password);
        let newhash = this.jwt.sign({
            user_ID: req.user.user_id,
            user_password: hashedpass,
        }, {
            expiresIn: '24h',
        });
        let _url = JSON.parse(nestconfig.MAIL_DOMAIN).MY_DOMAIN +
            '/resetpassword?secretkey=' +
            newhash;
        let transporter = nodemailer.createTransport({
            host: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_USERNAME,
                pass: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        let mailOptions = {
            from: 'admin@' + JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            to: req.user.user_email,
            subject: 'Reset password confirmation with AzubiViet',
            html: `
            Dear Sir/ Madam,
            <br/><br/>
            thank you for joining in Azubiviet Community, please confirm that you changed your password with this link within 24 hours:<br/><br/>
            <a href="${_url}">${_url}</a>
            <br/><br/>
            Yours faithfully,<br/>
            Admin from AzubiViet
            `,
        };
        await transporter.sendMail(mailOptions);
        return;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserChangePasswordController.prototype, "userchangepassword", null);
UserChangePasswordController = __decorate([
    (0, common_1.Controller)('userchangepassword'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        fetch_data_service_1.FetchDataService])
], UserChangePasswordController);
exports.UserChangePasswordController = UserChangePasswordController;
let ConfirmResetPasswordController = class ConfirmResetPasswordController {
    constructor(jwt, fetchDataService) {
        this.jwt = jwt;
        this.fetchDataService = fetchDataService;
    }
    async resetpassword(query) {
        try {
            let _decoded = this.jwt.verify(query.secretkey);
            if (!_decoded.user_ID || !_decoded.user_password) {
                return 'Invalid token';
            }
            await this.fetchDataService.userRepository.update({
                ID: _decoded.user_ID,
            }, {
                user_password: _decoded.user_password,
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
            return 'Password updated successfully';
        }
        catch (error) {
            return error.message;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ConfirmResetPasswordController.prototype, "resetpassword", null);
ConfirmResetPasswordController = __decorate([
    (0, common_1.Controller)('resetpassword'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        fetch_data_service_1.FetchDataService])
], ConfirmResetPasswordController);
exports.ConfirmResetPasswordController = ConfirmResetPasswordController;
let UploadQuestionProductAvatarByImgFileController = class UploadQuestionProductAvatarByImgFileController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    uploaduseravatarbyimgfile(req, query) {
        let path_to_save = config.USER_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.fetchDataService.basictools
                .formuploadIMG(req, query.file_obj_name, path_to_save, req.user)
                .then(async (result) => {
                await this.fetchDataService.mediarepository.update({
                    user_ID: req.user.user_id,
                    media_category: config.USER_AVT_CAT,
                    parent_ID: req.user.user_id,
                }, {
                    media_status: 'trash',
                });
                await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
                let mediapayload = {
                    media_name: result.newFilename,
                    media_type: result.format,
                    media_path: result.newFilepath,
                    user_ID: req.user.user_id,
                    parent_ID: req.user.user_id,
                    media_category: config.USER_AVT_CAT,
                    media_status: 'publish',
                };
                await this.fetchDataService.mediarepository.save(mediapayload);
                await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_useravatars);
                return result;
            })
                .catch((error) => {
                throw error;
            }));
        }
        else {
            throw new common_1.PayloadTooLargeException({ message: 'File is too large' });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UploadQuestionProductAvatarByImgFileController.prototype, "uploaduseravatarbyimgfile", null);
UploadQuestionProductAvatarByImgFileController = __decorate([
    (0, common_1.Controller)('uploaduseravatarbyimgfile'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UploadQuestionProductAvatarByImgFileController);
exports.UploadQuestionProductAvatarByImgFileController = UploadQuestionProductAvatarByImgFileController;
let UploadUserAvatarByUrlController = class UploadUserAvatarByUrlController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    uploaduseravatarbyurl(req, body) {
        return (0, rxjs_1.from)(this.fetchDataService.basictools
            .uploadimgbyurl(body.img_url, config.USER_IMG_PATH, req.user)
            .then(async (result) => {
            await this.fetchDataService.mediarepository.update({
                user_ID: req.user.user_id,
                media_category: config.USER_AVT_CAT,
                parent_ID: req.user.user_id,
            }, {
                media_status: 'trash',
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
            let mediapayload = {
                media_name: result.newFilename,
                media_type: result.format,
                media_path: result.newFilepath,
                user_ID: req.user.user_id,
                parent_ID: req.user.user_id,
                media_category: config.USER_AVT_CAT,
                media_status: 'publish',
            };
            await this.fetchDataService.mediarepository.save(mediapayload);
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_useravatars);
            return result;
        })
            .catch((error) => {
            throw error;
        }));
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UploadUserAvatarByUrlController.prototype, "uploaduseravatarbyurl", null);
UploadUserAvatarByUrlController = __decorate([
    (0, common_1.Controller)('uploaduseravatarbyurl'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UploadUserAvatarByUrlController);
exports.UploadUserAvatarByUrlController = UploadUserAvatarByUrlController;
let UserUpdateProfileController = class UserUpdateProfileController {
    constructor(_userSevice, fetchDataService, basictools, cacheManager, userRepository, userInventoryRepository) {
        this._userSevice = _userSevice;
        this.fetchDataService = fetchDataService;
        this.basictools = basictools;
        this.cacheManager = cacheManager;
        this.userRepository = userRepository;
        this.userInventoryRepository = userInventoryRepository;
        this.uploadschema = Joi.object({
            user_name: Joi.string().required(),
            user_password: Joi.string().required(),
            gender: Joi.allow('Male', 'Female').required(),
        });
    }
    async userupdateprofile(req, body) {
        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new common_1.ForbiddenException({ message: _checker.error.message });
        }
        let allUsers = await this.fetchDataService.getallusers();
        let foundUser = allUsers.find((y) => y.ID == req.user.user_id);
        if (!foundUser) {
            throw new common_1.ForbiddenException({ message: 'No user found' });
        }
        let matched = await this.fetchDataService.basictools.matchbcrypt(body.user_password, foundUser.user_password);
        if (!matched) {
            throw new common_1.BadRequestException({ message: 'Password incorrect' });
        }
        await this.fetchDataService.userRepository.update({
            ID: foundUser.ID,
        }, {
            user_name: body.user_name,
            gender: body.gender,
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
        return;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserUpdateProfileController.prototype, "userupdateprofile", null);
UserUpdateProfileController = __decorate([
    (0, common_1.Controller)('userupdateprofile'),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(4, (0, typeorm_1.InjectRepository)(userauth_entity_1.UserEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(userinventory_entity_1.UserInventoryEntity)),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        fetch_data_service_1.FetchDataService,
        basic_tools_service_1.BasicToolsService, Object, typeorm_2.Repository,
        typeorm_2.Repository])
], UserUpdateProfileController);
exports.UserUpdateProfileController = UserUpdateProfileController;
//# sourceMappingURL=user-authentication.controller.js.map