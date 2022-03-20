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
exports.DeleteTemp_QandA_ImageController = exports.Upload_QandA_ImageByUrlController = exports.Upload_QandA_ImageByFileController = exports.RemoveAllUserServerChatContentController = exports.UserSendServerchatMsgController = exports.ConfirmReportInvalidQA_AnswerController = exports.ReportInvalidQA_AnswerController = exports.ConfirmReportInvalidQA_QuestionController = exports.ReportInvalidQAController = exports.UserLockQAItemController = exports.UserDeleteQA_AnswerController = exports.UserThankyou_QAAnswerController = exports.UserLikeQA_AnswerController = exports.UserSubmitQandA_AnswerController = exports.UserSubmitQandAController = exports.AddSingleAreaController = exports.FetchDataController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const arealist_entity_1 = require("../../models/arealist/arealist.entity");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const typeorm_2 = require("typeorm");
const Joi = require("joi");
const nodemailer = require("nodemailer");
const GuestQAndA_entity_1 = require("../../models/GuestQAndA/GuestQAndA.entity");
const cacheKeys_entity_1 = require("../../models/cacheKeys/cacheKeys.entity");
const fetch_data_service_1 = require("./fetch-data.service");
const jwt_1 = require("@nestjs/jwt");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const postlike_entity_1 = require("../../models/postLikes/postlike.entity");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const user_authentication_service_1 = require("../user-authentication/user-authentication.service");
const serverchat_entity_1 = require("../../models/serverChat/serverchat.entity");
const media_entity_1 = require("../../models/media/media.entity");
const basic_tools_service_1 = require("../../tools/basic-tools/basic-tools.service");
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
    constructor(areaListRepository) {
        this.areaListRepository = areaListRepository;
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
            return (0, rxjs_1.from)(this.areaListRepository.save({
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
    __param(0, (0, typeorm_1.InjectRepository)(arealist_entity_1.AreaListEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddSingleAreaController);
exports.AddSingleAreaController = AddSingleAreaController;
let UserSubmitQandAController = class UserSubmitQandAController {
    constructor(guestQandARepository, cacheManager, mediaListRepository) {
        this.guestQandARepository = guestQandARepository;
        this.cacheManager = cacheManager;
        this.mediaListRepository = mediaListRepository;
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
        let _result = await this.guestQandARepository.save(newQA);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        for (let i = 0; i < body.img_arr.length; i++) {
            var _updateinfo = {
                parent_ID: _result.ID,
                media_status: "publish"
            };
            await this.mediaListRepository.update({
                media_name: body.img_arr[i]
            }, _updateinfo);
        }
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionIMG);
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
    __param(0, (0, typeorm_1.InjectRepository)(GuestQAndA_entity_1.GuestQAndAEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(2, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, typeorm_2.Repository])
], UserSubmitQandAController);
exports.UserSubmitQandAController = UserSubmitQandAController;
let UserSubmitQandA_AnswerController = class UserSubmitQandA_AnswerController {
    constructor(guestQandARepository, cacheManager, _fetchdataService, jwt) {
        this.guestQandARepository = guestQandARepository;
        this.cacheManager = cacheManager;
        this._fetchdataService = _fetchdataService;
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
        let allQAs = await this._fetchdataService.getAllguestQandA_items();
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
        let _resultAnswer = await this.guestQandARepository.save(newQA);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
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
    __param(0, (0, typeorm_1.InjectRepository)(GuestQAndA_entity_1.GuestQAndAEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, fetch_data_service_1.FetchDataService,
        jwt_1.JwtService])
], UserSubmitQandA_AnswerController);
exports.UserSubmitQandA_AnswerController = UserSubmitQandA_AnswerController;
let UserLikeQA_AnswerController = class UserLikeQA_AnswerController {
    constructor(postLikesRepository, cacheManager, _fetchdataService, jwt) {
        this.postLikesRepository = postLikesRepository;
        this.cacheManager = cacheManager;
        this._fetchdataService = _fetchdataService;
        this.jwt = jwt;
    }
    async userlikeqaanswer(req, body) {
        return await this._fetchdataService.likeQAAnswer(req.user.user_id, body.answer_ID, false);
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
    __param(0, (0, typeorm_1.InjectRepository)(postlike_entity_1.PostLikeEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, fetch_data_service_1.FetchDataService,
        jwt_1.JwtService])
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
    constructor(guestQandARepository, cacheManager, _fetchdataService) {
        this.guestQandARepository = guestQandARepository;
        this.cacheManager = cacheManager;
        this._fetchdataService = _fetchdataService;
    }
    async userdeleteqa_answer(req, body) {
        let allQAs = await this._fetchdataService.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == body.answer_ID && y.user_email == req.user.user_email);
        if (!foundQA) {
            throw new common_1.BadRequestException({ message: "Answer not found or you are not allowed to access it" });
        }
        await this.guestQandARepository.update({
            ID: foundQA.ID
        }, {
            item_status: "trash"
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
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
    __param(0, (0, typeorm_1.InjectRepository)(GuestQAndA_entity_1.GuestQAndAEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, fetch_data_service_1.FetchDataService])
], UserDeleteQA_AnswerController);
exports.UserDeleteQA_AnswerController = UserDeleteQA_AnswerController;
let UserLockQAItemController = class UserLockQAItemController {
    constructor(guestQandARepository, cacheManager, _fetchdataService, jwt) {
        this.guestQandARepository = guestQandARepository;
        this.cacheManager = cacheManager;
        this._fetchdataService = _fetchdataService;
        this.jwt = jwt;
    }
    async userdeleteqa_answer(req, query) {
        try {
            let _decoded = this.jwt.verify(query.secretkey);
            if (_decoded.QA_ID) {
                let allQAs = await this._fetchdataService.getAllguestQandA_items();
                let foundQA = allQAs.find(y => y.ID == _decoded.QA_ID && y.QA_status == "Closed");
                if (foundQA) {
                    return "Q&A is locked successfully, you won't get any answer in the future. If you want to unlock it, please go to our Homepage for further information";
                }
                await this.guestQandARepository.update({
                    ID: _decoded.QA_ID
                }, {
                    QA_status: "Closed"
                });
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
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
    __param(0, (0, typeorm_1.InjectRepository)(GuestQAndA_entity_1.GuestQAndAEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, fetch_data_service_1.FetchDataService,
        jwt_1.JwtService])
], UserLockQAItemController);
exports.UserLockQAItemController = UserLockQAItemController;
let ReportInvalidQAController = class ReportInvalidQAController {
    constructor(_userSevice, cacheManager, userNotificationRepository, reportLoggerRepository, fetchDataService, guestQandARepository) {
        this._userSevice = _userSevice;
        this.cacheManager = cacheManager;
        this.userNotificationRepository = userNotificationRepository;
        this.reportLoggerRepository = reportLoggerRepository;
        this.fetchDataService = fetchDataService;
        this.guestQandARepository = guestQandARepository;
    }
    async report_invalid_QA_Question(req, body) {
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA_Question = allQAs.find(y => y.ID == body.QA_ID && y.item_status == "publish");
        if (!foundQA_Question) {
            throw new common_1.ForbiddenException({ message: "[User Authentication Controller] This question is not available anymore" });
        }
        let selectedUsers = [];
        let blacklist = [req.user.user_id, foundQA_Question.user_ID];
        let _allUsers = [...await this._userSevice.getallusers()];
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
        await this.guestQandARepository.update({
            ID: body.QA_ID
        }, {
            is_reported: true,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            reported_date: new Date(),
            report_notes: body.report_notes
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _newReportLogger = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.QA_ID,
            report_type: reportlogger_entity_1.ReportLoggerTypes.QA_Question_ItemInvalid
        };
        await this.reportLoggerRepository.save(_newReportLogger);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
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
        await this.userNotificationRepository.save(_newNoti);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
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
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(2, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(reportlogger_entity_1.ReportLoggerEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(GuestQAndA_entity_1.GuestQAndAEntity)),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService, Object, typeorm_2.Repository,
        typeorm_2.Repository,
        fetch_data_service_1.FetchDataService,
        typeorm_2.Repository])
], ReportInvalidQAController);
exports.ReportInvalidQAController = ReportInvalidQAController;
let ConfirmReportInvalidQA_QuestionController = class ConfirmReportInvalidQA_QuestionController {
    constructor(_userSevice, userNotificationRepository, fetchDataService, cacheManager) {
        this._userSevice = _userSevice;
        this.userNotificationRepository = userNotificationRepository;
        this.fetchDataService = fetchDataService;
        this.cacheManager = cacheManager;
    }
    async confirm_report_invalid_qa_question(req, body) {
        let allUsers = await this._userSevice.getallusers();
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == body.QA_ID && y.item_type == "question");
        if (!foundQA.report_controllers.includes(req.user.user_id)) {
            throw new common_1.BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this answer'" });
        }
        if (!foundQA ||
            foundQA.is_reported == false) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
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
    __param(1, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        typeorm_2.Repository,
        fetch_data_service_1.FetchDataService, Object])
], ConfirmReportInvalidQA_QuestionController);
exports.ConfirmReportInvalidQA_QuestionController = ConfirmReportInvalidQA_QuestionController;
let ReportInvalidQA_AnswerController = class ReportInvalidQA_AnswerController {
    constructor(_userSevice, cacheManager, userNotificationRepository, reportLoggerRepository, fetchDataService, guestQandARepository) {
        this._userSevice = _userSevice;
        this.cacheManager = cacheManager;
        this.userNotificationRepository = userNotificationRepository;
        this.reportLoggerRepository = reportLoggerRepository;
        this.fetchDataService = fetchDataService;
        this.guestQandARepository = guestQandARepository;
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
        let _allUsers = [...await this._userSevice.getallusers()];
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
        await this.guestQandARepository.update({
            ID: body.QA_ID
        }, {
            is_reported: true,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            reported_date: new Date(),
            report_notes: body.report_notes
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_guestQandAItems);
        let _newReportLogger = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.QA_ID,
            report_type: reportlogger_entity_1.ReportLoggerTypes.QA_Answer_ItemInvalid
        };
        await this.reportLoggerRepository.save(_newReportLogger);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
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
        await this.userNotificationRepository.save(_newNoti);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
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
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(2, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(reportlogger_entity_1.ReportLoggerEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(GuestQAndA_entity_1.GuestQAndAEntity)),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService, Object, typeorm_2.Repository,
        typeorm_2.Repository,
        fetch_data_service_1.FetchDataService,
        typeorm_2.Repository])
], ReportInvalidQA_AnswerController);
exports.ReportInvalidQA_AnswerController = ReportInvalidQA_AnswerController;
let ConfirmReportInvalidQA_AnswerController = class ConfirmReportInvalidQA_AnswerController {
    constructor(_userSevice, userNotificationRepository, fetchDataService, cacheManager) {
        this._userSevice = _userSevice;
        this.userNotificationRepository = userNotificationRepository;
        this.fetchDataService = fetchDataService;
        this.cacheManager = cacheManager;
    }
    async confirm_report_invalid_qa_answer(req, body) {
        let allUsers = await this._userSevice.getallusers();
        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA = allQAs.find(y => y.ID == body.QA_ID && y.item_type == "answer");
        if (!foundQA ||
            !foundQA.report_controllers.includes(req.user.user_id)) {
            throw new common_1.BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this answer'" });
        }
        if (!foundQA ||
            foundQA.is_reported == false) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
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
    __param(1, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        typeorm_2.Repository,
        fetch_data_service_1.FetchDataService, Object])
], ConfirmReportInvalidQA_AnswerController);
exports.ConfirmReportInvalidQA_AnswerController = ConfirmReportInvalidQA_AnswerController;
let UserSendServerchatMsgController = class UserSendServerchatMsgController {
    constructor(_userSevice, serverChatRepository, fetchDataService, cacheManager) {
        this._userSevice = _userSevice;
        this.serverChatRepository = serverChatRepository;
        this.fetchDataService = fetchDataService;
        this.cacheManager = cacheManager;
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
        await this.serverChatRepository.save(_newMsg);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_serverChatItems);
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
    __param(1, (0, typeorm_1.InjectRepository)(serverchat_entity_1.ServerChatEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        typeorm_2.Repository,
        fetch_data_service_1.FetchDataService, Object])
], UserSendServerchatMsgController);
exports.UserSendServerchatMsgController = UserSendServerchatMsgController;
let RemoveAllUserServerChatContentController = class RemoveAllUserServerChatContentController {
    constructor(serverChatRepository, cacheManager) {
        this.serverChatRepository = serverChatRepository;
        this.cacheManager = cacheManager;
    }
    async remove_all_user_serverchat_content(req, body) {
        await this.serverChatRepository.delete({
            user_ID: req.user.user_id
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_serverChatItems);
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
    __param(0, (0, typeorm_1.InjectRepository)(serverchat_entity_1.ServerChatEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], RemoveAllUserServerChatContentController);
exports.RemoveAllUserServerChatContentController = RemoveAllUserServerChatContentController;
let Upload_QandA_ImageByFileController = class Upload_QandA_ImageByFileController {
    constructor(basictools, mediarepository, questionMarketService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.questionMarketService = questionMarketService;
        this.cacheManager = cacheManager;
    }
    uploadqandaimgbyimgfile(req, query) {
        let path_to_save = config.QA_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.questionMarketService.getusertempmediafiles(req.user).then(() => {
                return this.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user);
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
                await this.mediarepository.save(mediapayload);
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
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
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], Upload_QandA_ImageByFileController);
exports.Upload_QandA_ImageByFileController = Upload_QandA_ImageByFileController;
let Upload_QandA_ImageByUrlController = class Upload_QandA_ImageByUrlController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadqandaimgbyurl(req, body) {
        return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
            return this.basictools.uploadimgbyurl(body.img_url, config.QA_IMG_PATH, req.user);
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
            await this.mediarepository.save(mediapayload);
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
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
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], Upload_QandA_ImageByUrlController);
exports.Upload_QandA_ImageByUrlController = Upload_QandA_ImageByUrlController;
let DeleteTemp_QandA_ImageController = class DeleteTemp_QandA_ImageController {
    constructor(basictools, mediarepository, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.cacheManager = cacheManager;
    }
    async deletetemporary_qanda_img(req, body) {
        let _file = await this.mediarepository.findOne({
            media_name: body.img_name,
            user_ID: req.user.user_id
        });
        if (_file) {
            await this.basictools.deleteunusedcdn([_file.media_path], req.user);
            let _result = await this.mediarepository.delete({
                media_name: body.img_name,
                user_ID: req.user.user_id
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_QA_images);
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
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
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository, Object])
], DeleteTemp_QandA_ImageController);
exports.DeleteTemp_QandA_ImageController = DeleteTemp_QandA_ImageController;
//# sourceMappingURL=fetch-data.controller.js.map