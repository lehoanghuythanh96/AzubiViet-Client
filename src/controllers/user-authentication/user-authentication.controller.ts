import { BadRequestException, Body, CACHE_MANAGER, Controller, ForbiddenException, Get, Inject, PayloadTooLargeException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'google-auth-library';
import { Observable, from } from 'rxjs';
import { GGLoginauthBody } from 'src/models/login/logininfo.interface';
import { UserEntity, UserGenders, UserRoles, _UserRegisterDataInput } from 'src/models/userauthentication/userauth.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { UserAuthenticationService } from './user-authentication.service';
import * as crypto from 'crypto';
import { NestConfig, SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import nodemailer = require('nodemailer');
import { AppCache, _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard, JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { Repository } from 'typeorm';
import { QuestionMarketService } from '../question-market/question-market.service';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserNotificationEntity, UserNotificationInput, UserNotification_Types } from 'src/models/usernotifications/usernotifications.entity';
import { ReportLoggerEntity, ReportLoggerInput, ReportLoggerTypes } from 'src/models/reportLogger/reportlogger.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { BlackListEntity, BlackListInput, BlackListTypes } from 'src/models/blacklist/blacklist.entity';
import { UserPrivateMessageEntity } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserInventoryEntity, UserInventoryInput } from 'src/models/userinventory/userinventory.entity';
import { query } from 'express';
import { FormUploadMediaInput, MediaListEntity } from 'src/models/media/media.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import Joi = require('joi');

let nestconfig: NestConfig = <any>process.env;
let config = SystemDefaultConfig;

@Controller('user-authentication')
export class UserAuthenticationController { }

@Controller('userGGlogin')
export class userGGloginController {

    constructor(
        private basictools: BasicToolsService,
        private _userauth: UserAuthenticationService,
        private jwt: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    @Post()
    async userAuthGoogle(@Body() GGauthBody: GGLoginauthBody) {

        let _res = await this.basictools.verifyGGidtoken(GGauthBody);

        if (!_res.email) {
            return new BadRequestException({
                message: 'GG login failed, please contact admin'
            })
        }

        const _user = await this._userauth.finduserbyEmail(_res.email);

        if (_user) {
            let payload: userJWTpayload = {
                user_id: _user.ID,
                user_name: _user.user_name,
                user_email: _user.user_email,
                user_role: _user.user_role,
                access_token: null,
            }
            let _token = this.jwt.sign(payload);
            payload.access_token = _token;
            return payload;
        } else {
            let _tempname = _res.email.split('@')[0];
            let all_users = await this._userauth.getallusers();
            let _foundname = all_users.find(
                y => y.user_name == _tempname
            )
            if (_foundname) {
                _tempname = _tempname + crypto.randomBytes(2).toString("hex")
            }

            let __userinfo: _UserRegisterDataInput = {
                user_name: _res.name || _tempname,
                user_email: _res.email,
                user_password: crypto.randomBytes(20).toString("hex")
            }

            let _reg = await this.userRepository.save(__userinfo)
            await this.cacheManager.store.del(_cacheKey.all_users)

            let payload: userJWTpayload = {
                user_id: _reg.ID,
                user_name: _reg.user_name,
                user_email: _reg.user_email,
                user_role: _reg.user_role,
                access_token: null,
            }
            let _token = this.jwt.sign(payload);
            payload.access_token = _token;

            return payload;
        }
    }
}

@Controller('newuserregister')
export class NewUserRegisterController {

    constructor(
        private basictools: BasicToolsService,
        private jwt: JwtService,
        private authService: UserAuthenticationService,
        @Inject(CACHE_MANAGER)
        private cacheManager: AppCache
    ) { }

    @Post()
    async newuserregister(@Body() body: {
        user_email: string,
        user_password: string
    }) {

        let _allusers = await this.authService.getallusers();

        let _found = _allusers.find(
            y => y.user_email == body.user_email
        )

        if (_found) {
            throw new BadRequestException({ message: "This email is already used" })
        }

        let _registeredEmail = await this.cacheManager.get(body.user_email)

        if (_registeredEmail) {
            throw new BadRequestException({ message: "Email này đã được dùng để đăng ký, nếu bạn chưa nhận được Email xác nhận, vui lòng chờ 2 phút sau đó thử đăng ký lại." })
        }

        await this.cacheManager.set(body.user_email, body.user_email, {
            ttl: 120
        });

        let _newpass = await this.basictools.genBcrypt(body.user_password)

        body.user_password = _newpass;

        let _jwtstr = this.jwt.sign(body, {
            expiresIn: '24h'
        });

        let _url = JSON.parse(nestconfig.MAIL_DOMAIN).MY_DOMAIN + "/confirmuser?secretkey=" + _jwtstr;

        let transporter = nodemailer.createTransport({
            host: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            port: 587,
            secure: false, // true for 465, false for other ports
            requireTLS: true,
            auth: {
                user: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_USERNAME, // generated ethereal user
                pass: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_PASSWORD, // generated ethereal password
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            }
        });

        let mailOptions = {
            from: "admin@" + JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            to: body.user_email,
            subject: "Registration confirmation with AzubiViet",
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
}

@Controller('userlogin')
export class UserLoginController {

    constructor(
        private basictools: BasicToolsService,
        private jwt: JwtService,
        private authService: UserAuthenticationService) { }

    @Post()
    async userlogin(@Body() body: {
        user_email: string,
        user_password: string
    }) {

        let _allusers = await this.authService.getallusers();

        let _found = _allusers.find(
            y => y.user_email == body.user_email
        )

        if (!_found) {
            throw new BadRequestException({ message: "The account with this email doesn't exist" })
        }

        let _hashedpw = _found.user_password;

        let _matched = await this.basictools.matchbcrypt(body.user_password, _hashedpw)

        if (!_matched) {
            throw new BadRequestException({ message: "Wrong password" })
        }

        let payload: userJWTpayload = {
            user_id: _found.ID,
            user_name: _found.user_name,
            user_email: _found.user_email,
            user_role: _found.user_role,
            access_token: null,
        }
        let _token = this.jwt.sign(payload);
        payload.access_token = _token;
        return payload;

    }
}

@Controller('confirmuser')
export class ConfirmUserController {

    constructor(
        private jwt: JwtService,
        private _authService: UserAuthenticationService,
        @Inject(CACHE_MANAGER)
        private cacheManager: AppCache,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    @Get()
    async confirmuser(@Query() query: { secretkey: string }) {

        let _decoded = this.jwt.verify(query.secretkey)

        if (_decoded) {

            if (
                !_decoded.user_email ||
                !_decoded.user_password
            ) {
                throw new BadRequestException({ message: "Token invalid" })
            }

            let useremail = _decoded.user_email
            let password = _decoded.user_password

            let _allusers = await this._authService.getallusers();

            let _found = _allusers.find(
                y => y.user_email == useremail
            )

            if (_found) {
                throw new BadRequestException({ message: "Email is already confirmed" })
            }

            let _username = useremail.split('@')[0]

            let all_users = await this._authService.getallusers();
            let _foundname = all_users.find(
                y => y.user_name == _username
            )
            if (_foundname) {
                _username = _username + crypto.randomBytes(2).toString("hex")
            }

            await this.userRepository.save({
                user_name: _username,
                user_email: useremail,
                user_password: password
            })

            await this.cacheManager.store.del(_cacheKey.all_users)

            return "Đã xác nhận thành công, bạn bây giờ có thể dùng email này để đăng nhập.";

        } else {
            throw new BadRequestException({ message: "Invalid token" })
        }

    }

}

@Controller('report_user_answer_review_invalid')
export class ReportUserAnswerReviewInvalidControllerInvalidController {

    constructor(
        private questionmarketService: QuestionMarketService,
        private _userSevice: UserAuthenticationService,
        @Inject(CACHE_MANAGER)
        private cacheManager: AppCache,
        @InjectRepository(UserAnswerReviewEntity)
        private userAnswerReviewRepository: Repository<UserAnswerReviewEntity>,
        @InjectRepository(UserNotificationEntity)
        private userNotificationRepository: Repository<UserNotificationEntity>,
        @InjectRepository(ReportLoggerEntity)
        private reportLoggerRepository: Repository<ReportLoggerEntity>
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async report_user_answer_review_invalid(@Request() req: JwtAuthGuardReq, @Body() body: {
        notification_ID: number,
        user_answer_review_ID: number,
        report_notes: string
    }) {

        let allUserAnswerReviews = await this.questionmarketService.getAllUserAnswerReviews();
        let foundUserAnswerReview = allUserAnswerReviews.find(
            y => y.ID == body.user_answer_review_ID && y.review_status == "publish"
        )

        if (
            !foundUserAnswerReview ||
            foundUserAnswerReview.review_confirmed == true ||
            foundUserAnswerReview.is_reported == true
        ) {
            throw new ForbiddenException({ message: "[User Authentication Controller] This review is not available anymore" })
        }

        if (foundUserAnswerReview.answerer_ID != req.user.user_id) {
            throw new ForbiddenException({ message: "[User Authentication Controller] You are not allowed to access this answer" })
        }

        let selectedUsers: number[] = [];
        let blacklist = [req.user.user_id, foundUserAnswerReview.review_author]

        let _allUsers = [...await this._userSevice.getallusers()];
        let filteredUsers = _allUsers.filter(
            y => !blacklist.includes(y.ID) && y.is_blocked == false
        )

        for (let i = 0; i < 5; i++) {

            if (filteredUsers.length > 0) {
                let random = Math.floor(Math.random() * filteredUsers.length);
                let _tempID = filteredUsers[random].ID;
                if (!selectedUsers.includes(_tempID)) {
                    selectedUsers.push(_tempID)
                }
                filteredUsers.splice(random, 1)
            }
        }

        await this.userAnswerReviewRepository.update(
            {
                ID: body.user_answer_review_ID
            },
            {
                is_reported: true,
                report_sender: req.user.user_id,
                report_controllers: selectedUsers,
                reported_date: new Date(),
                report_notes: body.report_notes
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerReview)

        let _newReportLogger: ReportLoggerInput = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: foundUserAnswerReview.user_answer_ID,
            report_type: ReportLoggerTypes.questionMarket_UserAnswerReview
        }

        await this.reportLoggerRepository.save(_newReportLogger)
        await this.cacheManager.store.del(_cacheKey.all_ReportLogger)

        let _newNoti: UserNotificationInput = {
            type: UserNotification_Types.useranswer_review_isReported,
            data: {
                question_ID: foundUserAnswerReview.question_ID,
                user_answer_ID: foundUserAnswerReview.user_answer_ID,
                user_answer_review_ID: foundUserAnswerReview.ID,
                reporter_punish_count: 0
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: []
        }
        await this.userNotificationRepository.save(_newNoti)
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)

        await this.userNotificationRepository.delete({
            ID: body.notification_ID
        })
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)

        let allNotis = await this._userSevice.getallusernotifications();
        let foundUserAnswerReviewNoti = allNotis.find(
            y => y.type == UserNotification_Types.answer_isReviewed && y.data.review_ID == body.user_answer_review_ID
        )

        if (foundUserAnswerReviewNoti) {
            selectedUsers = selectedUsers.concat(foundUserAnswerReviewNoti.user_IDs)
            await this.userNotificationRepository.delete({
                ID: foundUserAnswerReviewNoti.ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        }

        return {
            selectedUsers: selectedUsers
        }

    }
}

@Controller('confirm_report_invalid_answer_review')
export class ConfirmReportInvalidAnswerReviewController {

    constructor(
        private questionmarketService: QuestionMarketService,
        private _userSevice: UserAuthenticationService,
        @InjectRepository(UserNotificationEntity)
        private userNotificationRepository: Repository<UserNotificationEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async confirm_report_invalid_answer_review(@Request() req: JwtAuthGuardReq, @Body() body: {
        notification_ID: number,
        user_answer_review_ID: number,
        report_result: boolean
    }) {
        let allUsers = await this._userSevice.getallusers();
        let allUserAnswerReviews = await this.questionmarketService.getAllUserAnswerReviews();

        let foundAnswerReview = allUserAnswerReviews.find(
            y => y.ID == body.user_answer_review_ID
        )

        if (
            !foundAnswerReview.report_controllers.includes(req.user.user_id)
        ) {
            throw new BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this review'" })
        }

        if (
            !foundAnswerReview ||
            foundAnswerReview.is_reported == false
        ) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
            throw new BadRequestException({ message: "[User Authentication Controller] This report is not available anymore" })
        }

        let reviewer = allUsers.find(
            y => y.ID == foundAnswerReview.review_author
        )

        let reporter = allUsers.find(
            y => y.ID == foundAnswerReview.report_sender
        )

        if (!reporter || !reviewer) {
            throw new ForbiddenException({ message: "[User Authentication Controller] Reporter's or reviewer's account is deleted" })
        }

        if (body.report_result == true) {

            return await this.questionmarketService.countAnswerReviewPunishPoint(
                body.user_answer_review_ID,
                req.user.user_id,
                body.notification_ID
            );

        } else {

            return await this.questionmarketService.countUserAnswerReview_ReporterPunishPoints(
                body.user_answer_review_ID,
                req.user.user_id,
                body.notification_ID
            )

        }
    }
}

@Controller('report_user_answer_invalid')
export class ReportUserAnswerReviewInvalidController {

    constructor(
        private questionmarketService: QuestionMarketService,
        private _userSevice: UserAuthenticationService,
        @Inject(CACHE_MANAGER)
        private cacheManager: AppCache,
        @InjectRepository(QuestionMarket_UserAnswerEntity)
        private userAnswerRepository: Repository<QuestionMarket_UserAnswerEntity>,
        @InjectRepository(UserNotificationEntity)
        private userNotificationRepository: Repository<UserNotificationEntity>,
        @InjectRepository(ReportLoggerEntity)
        private reportLoggerRepository: Repository<ReportLoggerEntity>
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async report_user_answer_invalid(@Request() req: JwtAuthGuardReq, @Body() body: {
        notification_ID: number,
        user_answer_ID: number,
        report_notes: string
    }) {

        let allUserAnswer = await this.questionmarketService.getalluseranswerinmarket();
        let foundUserAnswer = allUserAnswer.find(
            y => y.ID == body.user_answer_ID && y.answer_status == "publish"
        )

        if (
            !foundUserAnswer ||
            foundUserAnswer.is_reviewed == true
        ) {
            throw new ForbiddenException({ message: "[User Authentication Controller] This answer is not available anymore" })
        }

        if (!foundUserAnswer.waiting_reviewers.includes(req.user.user_id)) {
            throw new ForbiddenException({ message: "[User Authentication Controller] You are not allowed to access this answer" })
        }

        let selectedUsers: number[] = [];
        let blacklist = [req.user.user_id, foundUserAnswer.user_ID]

        let _allUsers = [...await this._userSevice.getallusers()];
        let filteredUsers = _allUsers.filter(
            y => !blacklist.includes(y.ID) && y.is_blocked == false
        )

        for (let i = 0; i < 5; i++) {

            if (filteredUsers.length > 0) {
                let random = Math.floor(Math.random() * filteredUsers.length);
                let _tempID = filteredUsers[random].ID;
                if (!selectedUsers.includes(_tempID)) {
                    selectedUsers.push(_tempID)
                }
                filteredUsers.splice(random, 1)
            }
        }

        await this.userAnswerRepository.update(
            {
                ID: body.user_answer_ID
            },
            {
                is_reported: true,
                report_sender: req.user.user_id,
                report_controllers: selectedUsers,
                reported_date: new Date(),
                report_notes: body.report_notes
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_userAnswerinMarket)

        let _newReportLogger: ReportLoggerInput = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.user_answer_ID,
            report_type: ReportLoggerTypes.questionMarketUserAnswer
        }

        await this.reportLoggerRepository.save(_newReportLogger)
        await this.cacheManager.store.del(_cacheKey.all_ReportLogger)

        let _newNoti: UserNotificationInput = {
            type: UserNotification_Types.answer_isReported,
            data: {
                question_ID: foundUserAnswer.parent_ID,
                user_answer_ID: body.user_answer_ID,
                reporter_punish_count: 0
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: []
        }
        await this.userNotificationRepository.save(_newNoti)
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)

        await this.userNotificationRepository.delete({
            ID: body.notification_ID
        })
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)

        let allNotis = await this._userSevice.getallusernotifications();
        let foundUserAnswerNoti = allNotis.find(
            y => y.type == UserNotification_Types.user_answer && y.data.user_answer_ID == body.user_answer_ID
        )

        if (foundUserAnswerNoti) {
            selectedUsers = selectedUsers.concat(foundUserAnswerNoti.user_IDs)
            await this.userNotificationRepository.delete({
                ID: foundUserAnswerNoti.ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
        }

        return {
            selectedUsers: selectedUsers
        }

    }
}

@Controller('confirm_report_invalid_answer')
export class ConfirmReportInvalidAnswerController {

    constructor(
        private questionmarketService: QuestionMarketService,
        private _userSevice: UserAuthenticationService,
        @InjectRepository(UserNotificationEntity)
        private userNotificationRepository: Repository<UserNotificationEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async confirm_report_invalid_answer(@Request() req: JwtAuthGuardReq, @Body() body: {
        notification_ID: number,
        user_answer_ID: number,
        report_result: boolean
    }) {

        let allUsers = await this._userSevice.getallusers();
        let allUserAnswers = await this.questionmarketService.getalluseranswerinmarket();

        let foundAnswer = allUserAnswers.find(
            y => y.ID == body.user_answer_ID
        )

        if (
            !foundAnswer.report_controllers.includes(req.user.user_id)
        ) {
            throw new BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this answer'" })
        }

        if (
            !foundAnswer ||
            foundAnswer.is_reported == false
        ) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
            throw new BadRequestException({ message: "[User Authentication Controller] This report is not available anymore" })
        }

        let answerer = allUsers.find(
            y => y.ID == foundAnswer.user_ID
        )

        let reporter = allUsers.find(
            y => y.ID == foundAnswer.report_sender
        )

        if (!reporter || !answerer) {
            throw new ForbiddenException({ message: "[User Authentication Controller] Reporter's or answerer's account is deleted" })
        }

        if (body.report_result == true) {

            return await this.questionmarketService.countAnswerPunishPoint(
                body.user_answer_ID,
                req.user.user_id,
                body.notification_ID
            );

        } else {

            return await this.questionmarketService.countUserAnswer_ReporterPunishPoints(
                body.user_answer_ID,
                req.user.user_id,
                body.notification_ID
            )

        }

    }
}

@Controller('report_invalid_question')
export class ReportInvalidQuestionController {

    constructor(
        private questionmarketService: QuestionMarketService,
        private _userSevice: UserAuthenticationService,
        @Inject(CACHE_MANAGER)
        private cacheManager: AppCache,
        @InjectRepository(UserNotificationEntity)
        private userNotificationRepository: Repository<UserNotificationEntity>,
        @InjectRepository(ReportLoggerEntity)
        private reportLoggerRepository: Repository<ReportLoggerEntity>,
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async report_invalid_question(@Request() req: JwtAuthGuardReq, @Body() body: {
        question_ID: number,
        report_notes: string
    }) {

        let allQuestionProduct = await this.questionmarketService.getall_questionproduct();
        let foundQuestion = allQuestionProduct.find(
            y => y.ID == body.question_ID
        )

        if (
            !foundQuestion ||
            foundQuestion.post_status != "publish"
        ) {
            throw new ForbiddenException({ message: "[User Authentication Controller] This question is not available anymore" })
        }

        let selectedUsers: number[] = [];
        let blacklist = [req.user.user_id, foundQuestion.post_author]

        let _allUsers = [...await this._userSevice.getallusers()];
        let filteredUsers = _allUsers.filter(
            y => !blacklist.includes(y.ID) && y.is_blocked == false
        )

        for (let i = 0; i < 5; i++) {

            if (filteredUsers.length > 0) {
                let random = Math.floor(Math.random() * filteredUsers.length);
                let _tempID = filteredUsers[random].ID;
                if (!selectedUsers.includes(_tempID)) {
                    selectedUsers.push(_tempID)
                }
                filteredUsers.splice(random, 1)
            }
        }

        await this.postRepository.update(
            {
                ID: body.question_ID
            },
            {
                is_reported: true,
                report_sender: req.user.user_id,
                report_controllers: selectedUsers,
                reported_date: new Date(),
                report_notes: body.report_notes
            }
        )

        await this.cacheManager.store.del(_cacheKey.all_question_products)

        let _newReportLogger: ReportLoggerInput = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.question_ID,
            report_type: ReportLoggerTypes.questionProduct_Invalid
        }

        await this.reportLoggerRepository.save(_newReportLogger)
        await this.cacheManager.store.del(_cacheKey.all_ReportLogger)

        let _newNoti: UserNotificationInput = {
            type: UserNotification_Types.questionProduct_isReported,
            data: {
                question_ID: foundQuestion.ID,
                reporter_punish_count: 0
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: []
        }
        await this.userNotificationRepository.save(_newNoti)
        await this.cacheManager.store.del(_cacheKey.all_usernotifications)

        return {
            selectedUsers: selectedUsers
        }

    }
}

@Controller('confirm_report_invalid_question')
export class ConfirmReportInvalidQuestionController {

    constructor(
        private questionmarketService: QuestionMarketService,
        private _userSevice: UserAuthenticationService,
        @InjectRepository(UserNotificationEntity)
        private userNotificationRepository: Repository<UserNotificationEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async confirm_report_invalid_question(@Request() req: JwtAuthGuardReq, @Body() body: {
        notification_ID: number,
        question_ID: number,
        report_result: boolean
    }) {

        let allUsers = await this._userSevice.getallusers();
        let allQuestions = await this.questionmarketService.getall_questionproduct();

        let foundQuestion = allQuestions.find(
            y => y.ID == body.question_ID
        )

        if (
            !foundQuestion.report_controllers.includes(req.user.user_id)
        ) {
            throw new BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this answer'" })
        }

        if (
            !foundQuestion ||
            foundQuestion.is_reported == false
        ) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            })
            await this.cacheManager.store.del(_cacheKey.all_usernotifications)
            throw new BadRequestException({ message: "[User Authentication Controller] This report is not available anymore" })
        }

        let post_author = allUsers.find(
            y => y.ID == foundQuestion.post_author
        )

        let reporter = allUsers.find(
            y => y.ID == foundQuestion.report_sender
        )

        if (!reporter || !post_author) {
            throw new ForbiddenException({ message: "[User Authentication Controller] Reporter's or answerer's account is deleted" })
        }

        if (body.report_result == true) {

            return await this.questionmarketService.countQuestionPunishPoint(
                body.question_ID,
                req.user.user_id,
                body.notification_ID
            );

        } else {

            return await this.questionmarketService.countQuestion_ReporterPunishPoints(
                body.question_ID,
                req.user.user_id,
                body.notification_ID
            )

        }

    }
}

@Controller('userblockemailfromprivatemessage')
export class UserBlockEmailFromPrivateMessageController {

    constructor(
        private _userSevice: UserAuthenticationService,
        @Inject(CACHE_MANAGER)
        private cacheManager: AppCache,
        @InjectRepository(BlackListEntity)
        private blackListRepository: Repository<BlackListEntity>,
        @InjectRepository(UserPrivateMessageEntity)
        private userPrivateMessageRepository: Repository<UserPrivateMessageEntity>
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async userblockemailfromprivatemessage(@Request() req: JwtAuthGuardReq, @Body() body: {
        msg_ID: number,
    }) {

        let _allmsgs = await this._userSevice.getAllUserPrivateMessages();
        let foundMsg = _allmsgs.find(
            y => y.ID == body.msg_ID
        )

        if (!foundMsg) {
            throw new BadRequestException({ message: 'This message is not a available anymore' })
        }

        let allBlacklist = await this._userSevice.getAllblackListItems();
        let foundUserBlacklist = allBlacklist.find(
            y => y.type == BlackListTypes.userPrivateMessage && y.user_ID == req.user.user_id
        )
        if (!foundUserBlacklist) {
            let newBlacklist: BlackListInput = {
                type: BlackListTypes.userPrivateMessage,
                user_ID: req.user.user_id,
                black_list: []
            }
            foundUserBlacklist = await this.blackListRepository.save(newBlacklist)
        }

        let blacklistarr = [...foundUserBlacklist.black_list]
        if (!blacklistarr.includes(foundMsg.sender_ID)) {
            blacklistarr.push(foundMsg.sender_ID)
        }

        await this.blackListRepository.update(
            {
                ID: foundUserBlacklist.ID
            },
            {
                black_list: blacklistarr
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_blackListItems)

        await this.userPrivateMessageRepository.delete({
            user_ID: req.user.user_id,
            sender_ID: foundMsg.sender_ID
        })
        await this.cacheManager.store.del(_cacheKey.all_userPrivateMessage)

        return

    }
}

@Controller('userbuyashopitem')
export class UserBuyASHOPitemController {

    constructor(
        private _userSevice: UserAuthenticationService,
        private fetchDataService: FetchDataService,
        @Inject(CACHE_MANAGER)
        private cacheManager: AppCache,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(UserInventoryEntity)
        private userInventoryRepository: Repository<UserInventoryEntity>) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async userbuyashopitem(@Request() req: JwtAuthGuardReq, @Body() body: {
        item_code: string,
        quantity: number
    }) {

        let allusers = await this._userSevice.getallusers();
        let foundUser = allusers.find(
            y => y.ID == req.user.user_id
        )
        if (!foundUser) {
            throw new BadRequestException({ message: "User not found" })
        }

        let currMoney = foundUser.user_abicoin;

        let itemPrice = await this.fetchDataService.getShopItemPricefromCode(body.item_code)
        let totalAmount = itemPrice * body.quantity;

        if (currMoney < totalAmount) {
            throw new BadRequestException({ message: "You don't have enough Abicoin to buy this item" })
        }

        let allInventories = await this._userSevice.getAll_UserInventories();
        let foundInventory = allInventories.find(
            y => y.item_code == body.item_code && y.user_ID == req.user.user_id
        )

        let currQuantity = await this.fetchDataService.getShopItemAmountfromCode(
            body.item_code,
            req.user.user_id
        );

        if (!foundInventory) {
            let _newItem: UserInventoryInput = {
                item_quantity: 0,
                item_code: body.item_code,
                user_ID: req.user.user_id
            }
            await this.userInventoryRepository.save(_newItem)
            await this.cacheManager.store.del(_cacheKey.all_userInventories)
            currQuantity = 0;
        }

        let newQuantity = currQuantity + body.quantity;

        let newMoney = currMoney - totalAmount;
        await this.userRepository.update(
            {
                ID: req.user.user_id
            },
            {
                user_abicoin: newMoney
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_users)

        await this.userInventoryRepository.update(
            {
                item_code: body.item_code,
                user_ID: req.user.user_id
            },
            {
                item_quantity: newQuantity
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_userInventories)

        return

    }
}

@Controller('userchangepassword')
export class UserChangePasswordController {

    constructor(
        private jwt: JwtService,
        private basicToolsService: BasicToolsService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async userchangepassword(@Request() req: JwtAuthGuardReq, @Body() body: {
        user_password: string,
    }) {

        let hashedpass = await this.basicToolsService.genBcrypt(body.user_password)
        let newhash = this.jwt.sign({
            user_ID: req.user.user_id,
            user_password: hashedpass
        }, {
            expiresIn: '24h'
        })

        let _url = JSON.parse(nestconfig.MAIL_DOMAIN).MY_DOMAIN + "/resetpassword?secretkey=" + newhash;

        let transporter = nodemailer.createTransport({
            host: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            port: 587,
            secure: false, // true for 465, false for other ports
            requireTLS: true,
            auth: {
                user: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_USERNAME, // generated ethereal user
                pass: JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_PASSWORD, // generated ethereal password
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            }
        });

        let mailOptions = {
            from: "admin@" + JSON.parse(nestconfig.MAIL_DOMAIN).MAIL_SMTP_DOMAIN,
            to: req.user.user_email,
            subject: "Reset password confirmation with AzubiViet",
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

        return

    }
}

@Controller('resetpassword')
export class ConfirmResetPasswordController {

    constructor(
        private jwt: JwtService,
        private basicToolsService: BasicToolsService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache
    ) { }

    @Get()
    async resetpassword(@Query() query: { secretkey: string }) {

        try {

            let _decoded: {
                user_ID: number,
                user_password: string
            } = this.jwt.verify(query.secretkey)
            if (!_decoded.user_ID || !_decoded.user_password) {
                return "Invalid token"
            }

            await this.userRepository.update(
                {
                    ID: _decoded.user_ID
                },
                {
                    user_password: _decoded.user_password
                }
            )
            await this.cacheManager.store.del(_cacheKey.all_users)

            return "Password updated successfully"

        } catch (error) {
            return error.message
        }

    }
}

@Controller('uploaduseravatarbyimgfile')
export class UploadQuestionProductAvatarByImgFileController {
    constructor(
        private basictools: BasicToolsService,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: AppCache
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    uploaduseravatarbyimgfile(@Request() req: any, @Query() query: FileUploadbyFormQuery): Observable<any> {
        let path_to_save = config.USER_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return from(
                this.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user).then(
                    async (result: any) => {
                        await this.mediarepository.update(
                            {
                                user_ID: req.user.user_id,
                                media_category: config.USER_AVT_CAT,
                                parent_ID: req.user.user_id
                            },
                            {
                                media_status: "trash"
                            }
                        );
                        await this.cacheManager.store.del(_cacheKey.all_trash_medias)

                        let mediapayload: FormUploadMediaInput = {
                            media_name: result.newFilename,
                            media_type: result.format,
                            media_path: result.newFilepath,
                            user_ID: req.user.user_id,
                            parent_ID: req.user.user_id,
                            media_category: config.USER_AVT_CAT,
                            media_status: "publish"
                        }
                        await this.mediarepository.save(mediapayload);
                        await this.cacheManager.store.del(_cacheKey.all_useravatars)
                        // Must return result from ConvertWebPandMove Fn
                        return result;
                    }
                ).catch(
                    (error) => {
                        throw error;
                    }
                )
            );
        } else {
            throw new PayloadTooLargeException({ message: 'File is too large' });
        }
    }
}

@Controller('uploaduseravatarbyurl')
export class UploadUserAvatarByUrlController {

    constructor(
        private readonly basictools: BasicToolsService,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: AppCache
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    uploaduseravatarbyurl(@Request() req: any, @Body() body: { img_url: string }): Observable<any> {
        return from(
            this.basictools.uploadimgbyurl(
                body.img_url,
                config.USER_IMG_PATH,
                req.user
            ).then(
                async (result: any) => {
                    await this.mediarepository.update(
                        {
                            user_ID: req.user.user_id,
                            media_category: config.USER_AVT_CAT,
                            parent_ID: req.user.user_id
                        },
                        {
                            media_status: "trash"
                        }
                    );
                    await this.cacheManager.store.del(_cacheKey.all_trash_medias)

                    let mediapayload: FormUploadMediaInput = {
                        media_name: result.newFilename,
                        media_type: result.format,
                        media_path: result.newFilepath,
                        user_ID: req.user.user_id,
                        parent_ID: req.user.user_id,
                        media_category: config.USER_AVT_CAT,
                        media_status: "publish"
                    }
                    await this.mediarepository.save(mediapayload);
                    await this.cacheManager.store.del(_cacheKey.all_useravatars)
                    // Must return result from ConvertWebPandMove Fn
                    return result;
                }
            ).catch(
                (error) => {
                    throw error;
                }
            )
        )
    }
}

@Controller('userupdateprofile')
export class UserUpdateProfileController {

    constructor(
        private _userSevice: UserAuthenticationService,
        private fetchDataService: FetchDataService,
        private basictools: BasicToolsService,
        @Inject(CACHE_MANAGER)
        private cacheManager: AppCache,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(UserInventoryEntity)
        private userInventoryRepository: Repository<UserInventoryEntity>) { }
    
    uploadschema = Joi.object({
        user_name: Joi.string().required(),
        user_password: Joi.string().required(),
        gender: Joi.allow("Male","Female").required()
    })  

    @UseGuards(JwtAuthGuard)
    @Post()
    async userupdateprofile(@Request() req: JwtAuthGuardReq, @Body() body: {
        user_name: string,
        user_password: string,
        gender: UserGenders
    }) { 

        let _checker = this.uploadschema.validate(body)
        if (_checker.error) {
            throw new ForbiddenException({ message: _checker.error.message });
        }

        let allUsers = await this._userSevice.getallusers()
        let foundUser = allUsers.find(
            y => y.ID == req.user.user_id
        )

        if (!foundUser) {
            throw new ForbiddenException({ message: "No user found"})
        }

        let matched = await this.basictools.matchbcrypt(body.user_password, foundUser.user_password)
        
        if (!matched) {
            throw new BadRequestException({ message: "Password incorrect"})
        }

        await this.userRepository.update(
            {
                ID: foundUser.ID
            },
            {
                user_name: body.user_name,
                gender: body.gender
            }
        )
        await this.cacheManager.store.del(_cacheKey.all_users)

        return

    }
}