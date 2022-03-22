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
exports.TestController = exports.DeleteTemp_QandA_ImageController = exports.Upload_QandA_ImageByUrlController = exports.Upload_QandA_ImageByFileController = exports.RemoveAllUserServerChatContentController = exports.UserSendServerchatMsgController = exports.ConfirmReportInvalidQA_AnswerController = exports.ReportInvalidQA_AnswerController = exports.ConfirmReportInvalidQA_QuestionController = exports.ReportInvalidQAController = exports.UserLockQAItemController = exports.UserDeleteQA_AnswerController = exports.UserThankyou_QAAnswerController = exports.UserLikeQA_AnswerController = exports.UserSubmitQandA_AnswerController = exports.UserSubmitQandAController = exports.AddSingleAreaController = exports.FetchDataController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const Joi = require("joi");
const nodemailer = require("nodemailer");
const cacheKeys_entity_1 = require("../../models/cacheKeys/cacheKeys.entity");
const fetch_data_service_1 = require("./fetch-data.service");
const jwt_1 = require("@nestjs/jwt");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const user_authentication_service_1 = require("../user-authentication/user-authentication.service");
const question_market_service_1 = require("../question-market/question-market.service");
let nestconfig = process.env;
let config = nestconfig_interface_1.SystemDefaultConfig;
let FetchDataController = class FetchDataController {
};
FetchDataController = __decorate([
    (0, common_1.Controller)('fetch-data')
], FetchDataController);
exports.FetchDataController = FetchDataController;
let AddSingleAreaController = class AddSingleAreaController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
        this.uploadschema = Joi.object({
            area_name: Joi.string().required(),
        });
    }
    addsinglearea(req, body) {
        var _a;
        if (req.user.user_role == 'admin') {
            if (this.uploadschema.validate(body).error) {
                throw new common_1.ForbiddenException({ message: (_a = this.uploadschema.validate(body).error) === null || _a === void 0 ? void 0 : _a.message });
            }
            return (0, rxjs_1.from)(this.fetchDataService.arealistrepository.save({
                area_name: body.area_name
            }));
        }
        else {
            return null;
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
    __metadata("design:returntype", rxjs_1.Observable)
], AddSingleAreaController.prototype, "addsinglearea", null);
AddSingleAreaController = __decorate([
    (0, common_1.Controller)('addsinglearea'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], AddSingleAreaController);
exports.AddSingleAreaController = AddSingleAreaController;
let UserSubmitQandAController = class UserSubmitQandAController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
        this.uploadschema = Joi.object({
            item_content: Joi.string().required(),
            img_arr: Joi.array().required()
        });
    }
    async user_submit_QA(req, body) {
        var _a;
        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new common_1.ForbiddenException({ message: (_a = _checker.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let newQA = {
            item_content: body.item_content,
            user_email: req.user.user_email,
            item_type: 'question',
            parent_ID: 0,
            user_ID: req.user.user_id
        };
        let _result = await this.fetchDataService.guestQandARepository.save(newQA);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        for (let i = 0; i < body.img_arr.length; i++) {
            var _updateinfo = {
                parent_ID: _result.ID,
                media_status: "publish"
            };
            await this.fetchDataService.mediarepository.update({
                media_name: body.img_arr[i]
            }, _updateinfo);
        }
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionIMG);
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
], UserSubmitQandAController.prototype, "user_submit_QA", null);
UserSubmitQandAController = __decorate([
    (0, common_1.Controller)('user_submit_QA'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UserSubmitQandAController);
exports.UserSubmitQandAController = UserSubmitQandAController;
let UserSubmitQandA_AnswerController = class UserSubmitQandA_AnswerController {
    constructor(fetchDataService, jwt) {
        this.fetchDataService = fetchDataService;
        this.jwt = jwt;
        this.uploadschema = Joi.object({
            QA_ID: Joi.number().required(),
            item_content: Joi.string().required(),
        });
    }
    async user_submit_QA_answer(req, body) {
        var _a;
        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new common_1.ForbiddenException({ message: (_a = _checker.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == body.QA_ID);
        let foundAnswer = allQAs.find(y => y.parent_ID == body.QA_ID && y.user_email == req.user.user_email && y.item_status == "publish");
        if (foundAnswer) {
            throw new common_1.BadRequestException({ message: "You've already answered this question, please delete your old answer before submitting a new one" });
        }
        if (!foundQA || foundQA.QA_status == "Closed" || foundQA.item_status != "publish" || foundQA.item_type != "question") {
            throw new common_1.BadRequestException({ message: "This Q&A is closed or not exist anymore" });
        }
        let newQA = {
            item_content: body.item_content,
            user_email: req.user.user_email,
            item_type: "answer",
            parent_ID: body.QA_ID,
            user_ID: req.user.user_id
        };
        let _resultAnswer = await this.fetchDataService.guestQandARepository.save(newQA);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _jwtstr = this.jwt.sign({
            QA_ID: body.QA_ID
        }, {
            expiresIn: '999 days'
        });
        let _url = JSON.parse(nestconfig.MAIL_DOMAIN).MY_DOMAIN + "/userlockqaitem?secretkey=" + _jwtstr;
        let _thankyouJWT = this.jwt.sign({
            QA_ID: _resultAnswer.ID,
            user_ID: foundQA.user_ID
        }, {
            expiresIn: '999 days'
        });
        let _thankUrl = JSON.parse(nestconfig.MAIL_DOMAIN).MY_DOMAIN + "/userthankyou_qa_answer?secretkey=" + _thankyouJWT;
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
            }
        });
        let mailOptions = {
            from: "admin@" + JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            to: foundQA.user_email,
            subject: "Your Q&A on AzubiViet is answered",
            html: `
            <p>Hi,</p>
            <p>one of your Q&A on AzubiViet has been answered recently, your question is:</p>
            "${foundQA.item_content}"
            <br/><br/>
            <p>And the new answer is:</p>
            <p>"${body.item_content}"</p>
            <p>Thank you for using AzubiViet as one of your information channel. If you find this answer helpful, please say thanks to the author by this button:</p>
            <p>
                <a href="${_thankUrl}" style="
                    box-shadow: 0px 10px 14px -7px #3e7327;
                    background:linear-gradient(to bottom, #77b55a 5%, #72b352 100%);
                    background-color:#77b55a;
                    border-radius:4px;
                    border:1px solid #4b8f29;
                    display:inline-block;
                    cursor:pointer;
                    color:#ffffff;
                    font-family:Arial;
                    font-size:13px;
                    font-weight:bold;
                    padding:6px 12px;
                    text-decoration:none;
                    text-shadow:0px 1px 0px #5b8a3c;
                ">
                    Say thanks to the author
                </a>
            </p>
            <p>If you don't want to receive any answer for this question in the future, please click the button below:</p>
            <p><a href="${_url}" style="
                box-shadow:inset 0px 39px 0px -24px #e67a73;
                background-color:#e4685d;
                border-radius:4px;
                border:1px solid #ffffff;
                display:inline-block;
                cursor:pointer;
                color:#ffffff;
                font-family:Arial;
                font-size:15px;
                padding:6px 15px;
                text-decoration:none;
                text-shadow:0px 1px 0px #b23e35;
            ">Lock your question</a></p>
            <p>Don't hesitate to contact us if you have any question.</p>
            <p>Yours faithfully,</p>
            <p>Admin from AzubiViet</p>
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
], UserSubmitQandA_AnswerController.prototype, "user_submit_QA_answer", null);
UserSubmitQandA_AnswerController = __decorate([
    (0, common_1.Controller)('user_submit_QA_answer'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService,
        jwt_1.JwtService])
], UserSubmitQandA_AnswerController);
exports.UserSubmitQandA_AnswerController = UserSubmitQandA_AnswerController;
let UserLikeQA_AnswerController = class UserLikeQA_AnswerController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async userlikeqaanswer(req, body) {
        return await this.fetchDataService.likeQAAnswer(req.user.user_id, body.answer_ID, false);
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
], UserLikeQA_AnswerController.prototype, "userlikeqaanswer", null);
UserLikeQA_AnswerController = __decorate([
    (0, common_1.Controller)('userlike_qaanswer'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UserLikeQA_AnswerController);
exports.UserLikeQA_AnswerController = UserLikeQA_AnswerController;
let UserThankyou_QAAnswerController = class UserThankyou_QAAnswerController {
    constructor(jwt, fetchDataService) {
        this.jwt = jwt;
        this.fetchDataService = fetchDataService;
    }
    async userthankyou_qa_answer(query) {
        try {
            let _decoded = this.jwt.verify(query.secretkey);
            if (_decoded) {
                if (!_decoded.QA_ID ||
                    !_decoded.user_ID) {
                    throw new common_1.BadRequestException({ message: "Token invalid" });
                }
                await this.fetchDataService.likeQAAnswer(_decoded.user_ID, _decoded.QA_ID, true);
                return `Your thanks have been sent to the answer author successfully`;
            }
            else {
                throw new common_1.BadRequestException({ message: "Invalid token" });
            }
        }
        catch (error) {
            return new common_1.BadRequestException({ message: error.message });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserThankyou_QAAnswerController.prototype, "userthankyou_qa_answer", null);
UserThankyou_QAAnswerController = __decorate([
    (0, common_1.Controller)('userthankyou_qa_answer'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        fetch_data_service_1.FetchDataService])
], UserThankyou_QAAnswerController);
exports.UserThankyou_QAAnswerController = UserThankyou_QAAnswerController;
let UserDeleteQA_AnswerController = class UserDeleteQA_AnswerController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async userdeleteqa_answer(req, body) {
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == body.answer_ID && y.user_email == req.user.user_email);
        if (!foundQA) {
            throw new common_1.BadRequestException({ message: "Answer not found or you are not allowed to access it" });
        }
        await this.fetchDataService.guestQandARepository.update({
            ID: foundQA.ID
        }, {
            item_status: "trash"
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
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
], UserDeleteQA_AnswerController.prototype, "userdeleteqa_answer", null);
UserDeleteQA_AnswerController = __decorate([
    (0, common_1.Controller)('userdeleteqa_answer'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UserDeleteQA_AnswerController);
exports.UserDeleteQA_AnswerController = UserDeleteQA_AnswerController;
let UserLockQAItemController = class UserLockQAItemController {
    constructor(fetchDataService, jwt) {
        this.fetchDataService = fetchDataService;
        this.jwt = jwt;
    }
    async userdeleteqa_answer(req, query) {
        try {
            let _decoded = this.jwt.verify(query.secretkey);
            if (_decoded.QA_ID) {
                let allQAs = await this.fetchDataService.getAllguestQandA_items();
                let foundQA = allQAs.find(y => y.ID == _decoded.QA_ID && y.QA_status == "Closed");
                if (foundQA) {
                    return "Q&A is locked successfully, you won't get any answer in the future. If you want to unlock it, please go to our Homepage for further information";
                }
                await this.fetchDataService.guestQandARepository.update({
                    ID: _decoded.QA_ID
                }, {
                    QA_status: "Closed"
                });
                await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
                return "Q&A is locked successfully, you won't get any answer in the future. If you want to unlock it, please go to our Homepage for further information";
            }
            else {
                throw new common_1.BadRequestException({ message: "Invalid token" });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserLockQAItemController.prototype, "userdeleteqa_answer", null);
UserLockQAItemController = __decorate([
    (0, common_1.Controller)('userlockqaitem'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService,
        jwt_1.JwtService])
], UserLockQAItemController);
exports.UserLockQAItemController = UserLockQAItemController;
let ReportInvalidQAController = class ReportInvalidQAController {
    constructor(_userSevice, fetchDataService) {
        this._userSevice = _userSevice;
        this.fetchDataService = fetchDataService;
    }
    async report_invalid_QA_Question(req, body) {
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA_Question = allQAs.find(y => y.ID == body.QA_ID && y.item_status == "publish");
        if (!foundQA_Question) {
            throw new common_1.ForbiddenException({ message: "[User Authentication Controller] This question is not available anymore" });
        }
        let selectedUsers = [];
        let blacklist = [req.user.user_id, foundQA_Question.user_ID];
        let _allUsers = [...await this.fetchDataService.getallusers()];
        let filteredUsers = _allUsers.filter(y => !blacklist.includes(y.ID) && y.is_blocked == false);
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
        await this.fetchDataService.guestQandARepository.update({
            ID: body.QA_ID
        }, {
            is_reported: true,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            reported_date: new Date(),
            report_notes: body.report_notes
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _newReportLogger = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.QA_ID,
            report_type: reportlogger_entity_1.ReportLoggerTypes.QA_Question_ItemInvalid
        };
        await this.fetchDataService.reportLoggerRepository.save(_newReportLogger);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
        let _newNoti = {
            type: usernotifications_entity_1.UserNotification_Types.QA_QuestionItem_isReported,
            data: {
                QA_ID: foundQA_Question.ID,
                reporter_punish_count: 0
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: []
        };
        await this.fetchDataService.userNotificationRepository.save(_newNoti);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        return {
            selectedUsers: selectedUsers
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
], ReportInvalidQAController.prototype, "report_invalid_QA_Question", null);
ReportInvalidQAController = __decorate([
    (0, common_1.Controller)('report_invalid_QA_Question'),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        fetch_data_service_1.FetchDataService])
], ReportInvalidQAController);
exports.ReportInvalidQAController = ReportInvalidQAController;
let ConfirmReportInvalidQA_QuestionController = class ConfirmReportInvalidQA_QuestionController {
    constructor(_userSevice, fetchDataService) {
        this._userSevice = _userSevice;
        this.fetchDataService = fetchDataService;
    }
    async confirm_report_invalid_qa_question(req, body) {
        let allUsers = await this.fetchDataService.getallusers();
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == body.QA_ID && y.item_type == "question");
        if (!foundQA.report_controllers.includes(req.user.user_id)) {
            throw new common_1.BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this answer'" });
        }
        if (!foundQA ||
            foundQA.is_reported == false) {
            await this.fetchDataService.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.BadRequestException({ message: "[User Authentication Controller] This report is not available anymore" });
        }
        let author = allUsers.find(y => y.ID == foundQA.user_ID);
        let reporter = allUsers.find(y => y.ID == foundQA.report_sender);
        if (!reporter || !author) {
            throw new common_1.ForbiddenException({ message: "[User Authentication Controller] Reporter's or answerer's account is deleted" });
        }
        if (body.report_result == true) {
            return await this.fetchDataService.countQAQuestionPunishPoint(body.QA_ID, req.user.user_id, body.notification_ID);
        }
        else {
            return await this.fetchDataService.countQA_Question_ReporterPunishPoints(body.QA_ID, req.user.user_id, body.notification_ID);
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
], ConfirmReportInvalidQA_QuestionController.prototype, "confirm_report_invalid_qa_question", null);
ConfirmReportInvalidQA_QuestionController = __decorate([
    (0, common_1.Controller)('confirm_report_invalid_qa_question'),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        fetch_data_service_1.FetchDataService])
], ConfirmReportInvalidQA_QuestionController);
exports.ConfirmReportInvalidQA_QuestionController = ConfirmReportInvalidQA_QuestionController;
let ReportInvalidQA_AnswerController = class ReportInvalidQA_AnswerController {
    constructor(_userSevice, fetchDataService) {
        this._userSevice = _userSevice;
        this.fetchDataService = fetchDataService;
    }
    async report_invalid_QA_Answer(req, body) {
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA_Answer = allQAs.find(y => y.ID == body.QA_ID && y.item_status == "publish");
        if (!foundQA_Answer) {
            throw new common_1.ForbiddenException({ message: "[User Authentication Controller] This answer is not available anymore" });
        }
        let foundQAQuestion = allQAs.find(y => y.ID == foundQA_Answer.parent_ID && y.item_status == "publish");
        if (!foundQAQuestion) {
            throw new common_1.ForbiddenException({ message: "[User Authentication Controller] This Q&A item is not available anymore" });
        }
        let selectedUsers = [];
        let blacklist = [req.user.user_id];
        let _allUsers = [...await this.fetchDataService.getallusers()];
        let _foundAnswerer = _allUsers.find(y => y.user_email == foundQA_Answer.user_email);
        if (_foundAnswerer) {
            blacklist.push(_foundAnswerer.ID);
        }
        let filteredUsers = _allUsers.filter(y => !blacklist.includes(y.ID) && y.is_blocked == false);
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
        await this.fetchDataService.guestQandARepository.update({
            ID: body.QA_ID
        }, {
            is_reported: true,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            reported_date: new Date(),
            report_notes: body.report_notes
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _newReportLogger = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.QA_ID,
            report_type: reportlogger_entity_1.ReportLoggerTypes.QA_Answer_ItemInvalid
        };
        await this.fetchDataService.reportLoggerRepository.save(_newReportLogger);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
        let _newNoti = {
            type: usernotifications_entity_1.UserNotification_Types.QA_AnswerItem_isReported,
            data: {
                QA_Question_ID: foundQAQuestion.ID,
                QA_ID: foundQA_Answer.ID,
                reporter_punish_count: 0
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: []
        };
        await this.fetchDataService.userNotificationRepository.save(_newNoti);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        return {
            selectedUsers: selectedUsers
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
], ReportInvalidQA_AnswerController.prototype, "report_invalid_QA_Answer", null);
ReportInvalidQA_AnswerController = __decorate([
    (0, common_1.Controller)('report_invalid_QA_Answer'),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        fetch_data_service_1.FetchDataService])
], ReportInvalidQA_AnswerController);
exports.ReportInvalidQA_AnswerController = ReportInvalidQA_AnswerController;
let ConfirmReportInvalidQA_AnswerController = class ConfirmReportInvalidQA_AnswerController {
    constructor(_userSevice, fetchDataService) {
        this._userSevice = _userSevice;
        this.fetchDataService = fetchDataService;
    }
    async confirm_report_invalid_qa_answer(req, body) {
        let allUsers = await this.fetchDataService.getallusers();
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == body.QA_ID && y.item_type == "answer");
        if (!foundQA ||
            !foundQA.report_controllers.includes(req.user.user_id)) {
            throw new common_1.BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this answer'" });
        }
        if (!foundQA ||
            foundQA.is_reported == false) {
            await this.fetchDataService.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.BadRequestException({ message: "[User Authentication Controller] This report is not available anymore" });
        }
        let answerer = allUsers.find(y => y.ID == foundQA.user_ID);
        let reporter = allUsers.find(y => y.ID == foundQA.report_sender);
        if (!reporter || !answerer) {
            throw new common_1.ForbiddenException({ message: "[User Authentication Controller] Reporter's or answerer's account is deleted" });
        }
        if (body.report_result == true) {
            return await this.fetchDataService.countQAAnswerPunishPoint(body.QA_ID, req.user.user_id, body.notification_ID);
        }
        else {
            return await this.fetchDataService.countQA_Answer_ReporterPunishPoints(body.QA_ID, req.user.user_id, body.notification_ID);
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
], ConfirmReportInvalidQA_AnswerController.prototype, "confirm_report_invalid_qa_answer", null);
ConfirmReportInvalidQA_AnswerController = __decorate([
    (0, common_1.Controller)('confirm_report_invalid_qa_answer'),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        fetch_data_service_1.FetchDataService])
], ConfirmReportInvalidQA_AnswerController);
exports.ConfirmReportInvalidQA_AnswerController = ConfirmReportInvalidQA_AnswerController;
let UserSendServerchatMsgController = class UserSendServerchatMsgController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
        this.uploadschema = Joi.object({
            server_name: Joi.string().required(),
            message_content: Joi.string().max(500)
        });
    }
    async user_send_serverchat_msg(req, body) {
        var _a;
        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new common_1.ForbiddenException({ message: (_a = _checker.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let checker = await this.fetchDataService.checkStrContent(body.message_content, body.server_name, req.user.user_id);
        if (!checker) {
            throw new common_1.BadRequestException({ message: "This message content is against our community policies" });
        }
        let _newMsg = {
            message_content: body.message_content,
            server_name: body.server_name,
            user_ID: req.user.user_id,
            user_email: req.user.user_email,
            user_name: req.user.user_name
        };
        await this.fetchDataService.serverChatRepository.save(_newMsg);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_serverChatItems);
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
], UserSendServerchatMsgController.prototype, "user_send_serverchat_msg", null);
UserSendServerchatMsgController = __decorate([
    (0, common_1.Controller)('user_send_serverchat_msg'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UserSendServerchatMsgController);
exports.UserSendServerchatMsgController = UserSendServerchatMsgController;
let RemoveAllUserServerChatContentController = class RemoveAllUserServerChatContentController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async remove_all_user_serverchat_content(req, body) {
        await this.fetchDataService.serverChatRepository.delete({
            user_ID: req.user.user_id
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_serverChatItems);
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
], RemoveAllUserServerChatContentController.prototype, "remove_all_user_serverchat_content", null);
RemoveAllUserServerChatContentController = __decorate([
    (0, common_1.Controller)('remove_all_user_serverchat_content'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], RemoveAllUserServerChatContentController);
exports.RemoveAllUserServerChatContentController = RemoveAllUserServerChatContentController;
let Upload_QandA_ImageByFileController = class Upload_QandA_ImageByFileController {
    constructor(questionMarketService, fetchDataService) {
        this.questionMarketService = questionMarketService;
        this.fetchDataService = fetchDataService;
    }
    uploadqandaimgbyimgfile(req, query) {
        let path_to_save = config.QA_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.questionMarketService.getusertempmediafiles(req.user).then(() => {
                return this.fetchDataService.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user);
            }).then(async (result) => {
                let mediapayload = {
                    media_name: result.newFilename,
                    media_type: result.format,
                    media_path: result.newFilepath,
                    user_ID: req.user.user_id,
                    parent_ID: 0,
                    media_category: config.QA_IMG_CAT,
                    media_status: "trash"
                };
                await this.fetchDataService.mediarepository.save(mediapayload);
                await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
                return result;
            }).catch((error) => {
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
], Upload_QandA_ImageByFileController.prototype, "uploadqandaimgbyimgfile", null);
Upload_QandA_ImageByFileController = __decorate([
    (0, common_1.Controller)('uploadqandaimgbyimgfile'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        fetch_data_service_1.FetchDataService])
], Upload_QandA_ImageByFileController);
exports.Upload_QandA_ImageByFileController = Upload_QandA_ImageByFileController;
let Upload_QandA_ImageByUrlController = class Upload_QandA_ImageByUrlController {
    constructor(fetchDataService, localService) {
        this.fetchDataService = fetchDataService;
        this.localService = localService;
    }
    uploadqandaimgbyurl(req, body) {
        return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
            return this.fetchDataService.basictools.uploadimgbyurl(body.img_url, config.QA_IMG_PATH, req.user);
        }).then(async (result) => {
            let mediapayload = {
                media_name: result.newFilename,
                media_type: result.format,
                media_path: result.newFilepath,
                user_ID: req.user.user_id,
                parent_ID: 0,
                media_category: config.QA_IMG_CAT,
                media_status: "trash"
            };
            await this.fetchDataService.mediarepository.save(mediapayload);
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
            return result;
        }).catch((error) => {
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
], Upload_QandA_ImageByUrlController.prototype, "uploadqandaimgbyurl", null);
Upload_QandA_ImageByUrlController = __decorate([
    (0, common_1.Controller)('uploadqandaimgbyurl'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService,
        question_market_service_1.QuestionMarketService])
], Upload_QandA_ImageByUrlController);
exports.Upload_QandA_ImageByUrlController = Upload_QandA_ImageByUrlController;
let DeleteTemp_QandA_ImageController = class DeleteTemp_QandA_ImageController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async deletetemporary_qanda_img(req, body) {
        let _file = await this.fetchDataService.mediarepository.findOne({
            media_name: body.img_name,
            user_ID: req.user.user_id
        });
        if (_file) {
            await this.fetchDataService.basictools.deleteunusedcdn([_file.media_path], req.user);
            let _result = await this.fetchDataService.mediarepository.delete({
                media_name: body.img_name,
                user_ID: req.user.user_id
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_QA_images);
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
            return _result;
        }
        else {
            return null;
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
], DeleteTemp_QandA_ImageController.prototype, "deletetemporary_qanda_img", null);
DeleteTemp_QandA_ImageController = __decorate([
    (0, common_1.Controller)('deletetemporary_qanda_img'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], DeleteTemp_QandA_ImageController);
exports.DeleteTemp_QandA_ImageController = DeleteTemp_QandA_ImageController;
let TestController = class TestController {
    result() {
        return { message: "Success" };
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "result", null);
TestController = __decorate([
    (0, common_1.Controller)('testapi')
], TestController);
exports.TestController = TestController;
//# sourceMappingURL=fetch-data.controller.js.map