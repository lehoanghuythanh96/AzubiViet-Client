import { BadRequestException, Body, CACHE_MANAGER, Controller, ForbiddenException, Get, Inject, PayloadTooLargeException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { AreaListEntity } from 'src/models/arealist/arealist.entity';
import { JwtAuthGuard, JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { Repository } from 'typeorm';
import Joi = require('joi');
import nodemailer = require('nodemailer');
import { GuestQAndAEntity, GuestQAndAInput } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { AppCache, _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';
import { FetchDataService } from './fetch-data.service';
import { JwtService } from '@nestjs/jwt';
import { NestConfig, SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { PostLikeEntity, PostLikeInput, PostLikeTypes } from 'src/models/postLikes/postlike.entity';
import { ReportLoggerEntity, ReportLoggerInput, ReportLoggerTypes } from 'src/models/reportLogger/reportlogger.entity';
import { UserNotificationEntity, UserNotificationInput, UserNotification_Types } from 'src/models/usernotifications/usernotifications.entity';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { ChatServerNames, ServerChatEntity, ServerChatInput } from 'src/models/serverChat/serverchat.entity';
import { ShopItemCodes } from 'src/models/ShopItem/shopitem.entity';
import { MediaListEntity, FormUploadMediaInput, UpdateFormUploadMediaInput } from 'src/models/media/media.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { QuestionMarketService } from '../question-market/question-market.service';

let nestconfig: NestConfig = <any>process.env;
let config = SystemDefaultConfig;

@Controller('fetch-data')
export class FetchDataController { }

@Controller('addsinglearea')
export class AddSingleAreaController {
    constructor(
        private fetchDataService: FetchDataService,
    ) { }

    uploadschema = Joi.object({
        area_name: Joi.string().required(),
    });

    @UseGuards(JwtAuthGuard)
    @Post()
    addsinglearea(@Request() req: JwtAuthGuardReq, @Body() body: { area_name: string }): Observable<any> {
        if (req.user.user_role == 'admin') {
            if (this.uploadschema.validate(body).error) {
                throw new ForbiddenException({ message: this.uploadschema.validate(body).error?.message });
            }
            return from(
                this.fetchDataService.arealistrepository.save({
                    area_name: body.area_name
                })
            )
        } else {
            return null;
        }
    }
}

@Controller('user_submit_QA')
export class UserSubmitQandAController {
    constructor(
        private fetchDataService: FetchDataService
    ) { }

    uploadschema = Joi.object({
        item_content: Joi.string().required(),
        img_arr: Joi.array().required()
    });

    @UseGuards(JwtAuthGuard)
    @Post()
    async user_submit_QA(@Request() req: JwtAuthGuardReq, @Body() body: {
        item_content: string,
        img_arr: string[]
    }) {

        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new ForbiddenException({ message: _checker.error?.message });
        }

        let newQA: GuestQAndAInput = {
            item_content: body.item_content,
            user_email: req.user.user_email,
            item_type: 'question',
            parent_ID: 0,
            user_ID: req.user.user_id
        }

        let _result = await this.fetchDataService.guestQandARepository.save(newQA)
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_guestQandAItems)
        
        for (let i = 0; i < body.img_arr.length; i++) {
            var _updateinfo: UpdateFormUploadMediaInput = {
                parent_ID: _result.ID,
                media_status: "publish"
            }
            await this.fetchDataService.mediarepository.update(
                {
                    media_name: body.img_arr[i]
                },
                _updateinfo
            )
        }

        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_questionIMG)

        return

    }
}

@Controller('user_submit_QA_answer')
export class UserSubmitQandA_AnswerController {
    constructor(
        private fetchDataService: FetchDataService,
        private jwt: JwtService
    ) { }

    uploadschema = Joi.object({
        QA_ID: Joi.number().required(),
        item_content: Joi.string().required(),
    });

    @UseGuards(JwtAuthGuard)
    @Post()
    async user_submit_QA_answer(@Request() req: JwtAuthGuardReq, @Body() body: {
        QA_ID: number,
        item_content: string
    }) {

        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new ForbiddenException({ message: _checker.error?.message });
        }

        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA = allQAs.find(
            y => y.ID == body.QA_ID
        )

        let foundAnswer = allQAs.find(
            y => y.parent_ID == body.QA_ID && y.user_email == req.user.user_email && y.item_status == "publish"
        )

        if (foundAnswer) {
            throw new BadRequestException({ message: "You've already answered this question, please delete your old answer before submitting a new one" })
        }

        if (!foundQA || foundQA.QA_status == "Closed" || foundQA.item_status != "publish" || foundQA.item_type != "question") {
            throw new BadRequestException({ message: "This Q&A is closed or not exist anymore" })
        }

        let newQA: GuestQAndAInput = {
            item_content: body.item_content,
            user_email: req.user.user_email,
            item_type: "answer",
            parent_ID: body.QA_ID,
            user_ID: req.user.user_id
        }

        let _resultAnswer = await this.fetchDataService.guestQandARepository.save(newQA)
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        let _jwtstr = this.jwt.sign(
            {
                QA_ID: body.QA_ID
            },
            {
                expiresIn: '999 days'
            }
        );

        let _url = JSON.parse(nestconfig.MAIL_DOMAIN).MY_DOMAIN + "/userlockqaitem?secretkey=" + _jwtstr;

        let _thankyouJWT = this.jwt.sign(
            {
                QA_ID: _resultAnswer.ID,
                user_ID: foundQA.user_ID
            },
            {
                expiresIn: '999 days'
            }
        );
        let _thankUrl = JSON.parse(nestconfig.MAIL_DOMAIN).MY_DOMAIN + "/userthankyou_qa_answer?secretkey=" + _thankyouJWT;

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

        return

    }
}

@Controller('userlike_qaanswer')
export class UserLikeQA_AnswerController {
    constructor(
        private fetchDataService: FetchDataService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async userlikeqaanswer(@Request() req: JwtAuthGuardReq, @Body() body: {
        answer_ID: number
    }) {

        return await this.fetchDataService.likeQAAnswer(
            req.user.user_id,
            body.answer_ID,
            false
        )

    }
}

@Controller('userthankyou_qa_answer')
export class UserThankyou_QAAnswerController {

    constructor(
        private jwt: JwtService,
        private fetchDataService: FetchDataService,
    ) { }

    @Get()
    async userthankyou_qa_answer(@Query() query: { secretkey: string }) {

        try {

            let _decoded = this.jwt.verify(query.secretkey)

            if (_decoded) {

                if (
                    !_decoded.QA_ID ||
                    !_decoded.user_ID
                ) {
                    throw new BadRequestException({ message: "Token invalid" })
                }
    
                await this.fetchDataService.likeQAAnswer(
                    _decoded.user_ID,
                    _decoded.QA_ID,
                    true
                )
    
                return `Your thanks have been sent to the answer author successfully`;
    
            } else {
                throw new BadRequestException({ message: "Invalid token" })
            }

        } catch (error) {
            return new BadRequestException({ message: error.message });
        }

    }

}

@Controller('userdeleteqa_answer')
export class UserDeleteQA_AnswerController {
    constructor(
        private fetchDataService: FetchDataService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async userdeleteqa_answer(@Request() req: JwtAuthGuardReq, @Body() body: {
        answer_ID: number
    }) {

        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA = allQAs.find(
            y => y.ID == body.answer_ID && y.user_email == req.user.user_email
        )

        if (!foundQA) {
            throw new BadRequestException({ message: "Answer not found or you are not allowed to access it" })
        }

        await this.fetchDataService.guestQandARepository.update(
            {
                ID: foundQA.ID
            },
            {
                item_status: "trash"
            }
        )
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        return

    }
}

@Controller('userlockqaitem')
export class UserLockQAItemController {
    constructor(
        private fetchDataService: FetchDataService,
        private jwt: JwtService
    ) { }

    @Get()
    async userdeleteqa_answer(@Request() req: JwtAuthGuardReq, @Query() query: { secretkey: string }) {
        try {
            let _decoded = this.jwt.verify(query.secretkey)
            if (_decoded.QA_ID) {
                let allQAs = await this.fetchDataService.getAllguestQandA_items();
                let foundQA = allQAs.find(
                    y => y.ID == _decoded.QA_ID && y.QA_status == "Closed"
                )
                if (foundQA) {
                    return "Q&A is locked successfully, you won't get any answer in the future. If you want to unlock it, please go to our Homepage for further information"
                }
                await this.fetchDataService.guestQandARepository.update(
                    {
                        ID: _decoded.QA_ID
                    },
                    {
                        QA_status: "Closed"
                    }
                )
                await this.fetchDataService.cacheManager.store.del(_cacheKey.all_guestQandAItems)
                return "Q&A is locked successfully, you won't get any answer in the future. If you want to unlock it, please go to our Homepage for further information"
            } else {
                throw new BadRequestException({ message: "Invalid token" })
            }
        } catch (error) {
            throw new BadRequestException({ message: error.message })
        }
    }
}

@Controller('report_invalid_QA_Question')
export class ReportInvalidQAController {

    constructor(
        private _userSevice: UserAuthenticationService,
        private fetchDataService: FetchDataService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async report_invalid_QA_Question(@Request() req: JwtAuthGuardReq, @Body() body: {
        QA_ID: number,
        report_notes: string
    }) {

        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA_Question = allQAs.find(
            y => y.ID == body.QA_ID && y.item_status == "publish"
        )

        if (
            !foundQA_Question
        ) {
            throw new ForbiddenException({ message: "[User Authentication Controller] This question is not available anymore" })
        }

        let selectedUsers: number[] = [];
        let blacklist = [req.user.user_id, foundQA_Question.user_ID]

        let _allUsers = [...await this.fetchDataService.getallusers()];
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

        await this.fetchDataService.guestQandARepository.update(
            {
                ID: body.QA_ID
            },
            {
                is_reported: true,
                report_sender: req.user.user_id,
                report_controllers: selectedUsers,
                reported_date: new Date(),
                report_notes: body.report_notes
            }
        )

        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        let _newReportLogger: ReportLoggerInput = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.QA_ID,
            report_type: ReportLoggerTypes.QA_Question_ItemInvalid
        }

        await this.fetchDataService.reportLoggerRepository.save(_newReportLogger)
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_ReportLogger)

        let _newNoti: UserNotificationInput = {
            type: UserNotification_Types.QA_QuestionItem_isReported,
            data: {
                QA_ID: foundQA_Question.ID,
                reporter_punish_count: 0
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: []
        }
        await this.fetchDataService.userNotificationRepository.save(_newNoti)
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_usernotifications)

        return {
            selectedUsers: selectedUsers
        }

    }
}

@Controller('confirm_report_invalid_qa_question')
export class ConfirmReportInvalidQA_QuestionController {

    constructor(
        private _userSevice: UserAuthenticationService,
        private fetchDataService: FetchDataService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async confirm_report_invalid_qa_question(@Request() req: JwtAuthGuardReq, @Body() body: {
        notification_ID: number,
        QA_ID: number,
        report_result: boolean
    }) {

        let allUsers = await this.fetchDataService.getallusers();
        let allQAs = await this.fetchDataService.getAllguestQandA_items();

        let foundQA = allQAs.find(
            y => y.ID == body.QA_ID && y.item_type == "question"
        )

        if (
            !foundQA.report_controllers.includes(req.user.user_id)
        ) {
            throw new BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this answer'" })
        }

        if (
            !foundQA ||
            foundQA.is_reported == false
        ) {
            await this.fetchDataService.userNotificationRepository.delete({
                ID: body.notification_ID
            })
            await this.fetchDataService.cacheManager.store.del(_cacheKey.all_usernotifications)
            throw new BadRequestException({ message: "[User Authentication Controller] This report is not available anymore" })
        }

        let author = allUsers.find(
            y => y.ID == foundQA.user_ID
        )

        let reporter = allUsers.find(
            y => y.ID == foundQA.report_sender
        )

        if (!reporter || !author) {
            throw new ForbiddenException({ message: "[User Authentication Controller] Reporter's or answerer's account is deleted" })
        }

        if (body.report_result == true) {

            return await this.fetchDataService.countQAQuestionPunishPoint(
                body.QA_ID,
                req.user.user_id,
                body.notification_ID
            );

        } else {

            return await this.fetchDataService.countQA_Question_ReporterPunishPoints(
                body.QA_ID,
                req.user.user_id,
                body.notification_ID
            )

        }

    }
}

@Controller('report_invalid_QA_Answer')
export class ReportInvalidQA_AnswerController {

    constructor(
        private _userSevice: UserAuthenticationService,
        private fetchDataService: FetchDataService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async report_invalid_QA_Answer(@Request() req: JwtAuthGuardReq, @Body() body: {
        QA_ID: number,
        report_notes: string
    }) {

        let allQAs = await this.fetchDataService.getAllguestQandA_items();
        let foundQA_Answer = allQAs.find(
            y => y.ID == body.QA_ID && y.item_status == "publish"
        )

        if (
            !foundQA_Answer
        ) {
            throw new ForbiddenException({ message: "[User Authentication Controller] This answer is not available anymore" })
        }

        let foundQAQuestion = allQAs.find(
            y => y.ID == foundQA_Answer.parent_ID && y.item_status == "publish"
        )

        if (
            !foundQAQuestion
        ) {
            throw new ForbiddenException({ message: "[User Authentication Controller] This Q&A item is not available anymore" })
        }

        let selectedUsers: number[] = [];
        let blacklist = [req.user.user_id]

        let _allUsers = [...await this.fetchDataService.getallusers()];
        let _foundAnswerer = _allUsers.find(
            y => y.user_email == foundQA_Answer.user_email
        )
        if (_foundAnswerer) {
            blacklist.push(_foundAnswerer.ID)
        }
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

        await this.fetchDataService.guestQandARepository.update(
            {
                ID: body.QA_ID
            },
            {
                is_reported: true,
                report_sender: req.user.user_id,
                report_controllers: selectedUsers,
                reported_date: new Date(),
                report_notes: body.report_notes
            }
        )

        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_guestQandAItems)

        let _newReportLogger: ReportLoggerInput = {
            report_notes: body.report_notes,
            report_sender: req.user.user_id,
            report_controllers: selectedUsers,
            parent_ID: body.QA_ID,
            report_type: ReportLoggerTypes.QA_Answer_ItemInvalid
        }

        await this.fetchDataService.reportLoggerRepository.save(_newReportLogger)
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_ReportLogger)

        let _newNoti: UserNotificationInput = {
            type: UserNotification_Types.QA_AnswerItem_isReported,
            data: {
                QA_Question_ID: foundQAQuestion.ID,
                QA_ID: foundQA_Answer.ID,
                reporter_punish_count: 0
            },
            secret: {},
            user_IDs: selectedUsers,
            deletion_allowed: []
        }
        await this.fetchDataService.userNotificationRepository.save(_newNoti)
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_usernotifications)

        return {
            selectedUsers: selectedUsers
        }

    }
}

@Controller('confirm_report_invalid_qa_answer')
export class ConfirmReportInvalidQA_AnswerController {

    constructor(
        private _userSevice: UserAuthenticationService,
        private fetchDataService: FetchDataService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async confirm_report_invalid_qa_answer(@Request() req: JwtAuthGuardReq, @Body() body: {
        notification_ID: number,
        QA_ID: number,
        report_result: boolean
    }) {

        let allUsers = await this.fetchDataService.getallusers();
        let allQAs = await this.fetchDataService.getAllguestQandA_items();

        let foundQA = allQAs.find(
            y => y.ID == body.QA_ID && y.item_type == "answer"
        )

        if (
            !foundQA ||
            !foundQA.report_controllers.includes(req.user.user_id)
        ) {
            throw new BadRequestException({ message: "[User Authentication Controller] You don't have the permission to report this answer'" })
        }

        if (
            !foundQA ||
            foundQA.is_reported == false
        ) {
            await this.fetchDataService.userNotificationRepository.delete({
                ID: body.notification_ID
            })
            await this.fetchDataService.cacheManager.store.del(_cacheKey.all_usernotifications)
            throw new BadRequestException({ message: "[User Authentication Controller] This report is not available anymore" })
        }

        let answerer = allUsers.find(
            y => y.ID == foundQA.user_ID
        )

        let reporter = allUsers.find(
            y => y.ID == foundQA.report_sender
        )

        if (!reporter || !answerer) {
            throw new ForbiddenException({ message: "[User Authentication Controller] Reporter's or answerer's account is deleted" })
        }

        if (body.report_result == true) {

            return await this.fetchDataService.countQAAnswerPunishPoint(
                body.QA_ID,
                req.user.user_id,
                body.notification_ID
            );

        } else {

            return await this.fetchDataService.countQA_Answer_ReporterPunishPoints(
                body.QA_ID,
                req.user.user_id,
                body.notification_ID
            )

        }

    }
}

@Controller('user_send_serverchat_msg')
export class UserSendServerchatMsgController {

    constructor(
        private fetchDataService: FetchDataService,
    ) { }

    uploadschema = Joi.object({
        server_name: Joi.string().required(),
        message_content: Joi.string().max(500)
    })

    @UseGuards(JwtAuthGuard)
    @Post()
    async user_send_serverchat_msg(@Request() req: JwtAuthGuardReq, @Body() body: {
        server_name: ChatServerNames,
        message_content: string
    }) {

        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new ForbiddenException({ message: _checker.error?.message });
        }

        let checker = await this.fetchDataService.checkStrContent(
            body.message_content,
            body.server_name,
            req.user.user_id
        )

        if (!checker) {
            throw new BadRequestException({ message: "This message content is against our community policies"})
        }

        let _newMsg: ServerChatInput = {
            message_content: body.message_content,
            server_name: body.server_name,
            user_ID: req.user.user_id,
            user_email: req.user.user_email,
            user_name: req.user.user_name
        }

        await this.fetchDataService.serverChatRepository.save(_newMsg)
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_serverChatItems)

        return

    }
}

@Controller('remove_all_user_serverchat_content')
export class RemoveAllUserServerChatContentController{

    constructor(
        private fetchDataService: FetchDataService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async remove_all_user_serverchat_content(@Request() req: JwtAuthGuardReq, @Body() body: {}) {
        await this.fetchDataService.serverChatRepository.delete({
            user_ID: req.user.user_id
        })
        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_serverChatItems)
        return
    }

}


@Controller('uploadqandaimgbyimgfile')
export class Upload_QandA_ImageByFileController {
    constructor(
        private readonly questionMarketService: QuestionMarketService,
        private fetchDataService: FetchDataService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    uploadqandaimgbyimgfile(@Request() req: any, @Query() query: FileUploadbyFormQuery): Observable<any> {
        let path_to_save = config.QA_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return from(
                this.questionMarketService.getusertempmediafiles(req.user).then(
                    () => {
                        return this.fetchDataService.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user)
                    }
                ).then(
                    async (result: any) => {
                        let mediapayload: FormUploadMediaInput = {
                            media_name: result.newFilename,
                            media_type: result.format,
                            media_path: result.newFilepath,
                            user_ID: req.user.user_id,
                            parent_ID: 0,
                            media_category: config.QA_IMG_CAT,
                            media_status: "trash"
                        }
                        await this.fetchDataService.mediarepository.save(mediapayload);
                        await this.fetchDataService.cacheManager.store.del(_cacheKey.all_trash_medias)
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

@Controller('uploadqandaimgbyurl')
export class Upload_QandA_ImageByUrlController {

    constructor(
        private fetchDataService: FetchDataService,
        private readonly localService: QuestionMarketService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    uploadqandaimgbyurl(@Request() req: any, @Body() body: { img_url: string }): Observable<any> {
        return from(
            this.localService.getusertempmediafiles(req.user).then(
                () => {
                    return this.fetchDataService.basictools.uploadimgbyurl(
                        body.img_url,
                        config.QA_IMG_PATH,
                        req.user
                    )
                }
            ).then(
                async (result: any) => {
                    let mediapayload: FormUploadMediaInput = {
                        media_name: result.newFilename,
                        media_type: result.format,
                        media_path: result.newFilepath,
                        user_ID: req.user.user_id,
                        parent_ID: 0,
                        media_category: config.QA_IMG_CAT,
                        media_status: "trash"
                    }
                    await this.fetchDataService.mediarepository.save(mediapayload);
                    await this.fetchDataService.cacheManager.store.del(_cacheKey.all_trash_medias)
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

/* ----------------------------- delete temp question img ---------------------------- */
@Controller('deletetemporary_qanda_img')
export class DeleteTemp_QandA_ImageController {

    constructor(
        private fetchDataService: FetchDataService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async deletetemporary_qanda_img(@Request() req: JwtAuthGuardReq, @Body() body: { img_name: string }) {
        let _file = await this.fetchDataService.mediarepository.findOne({
            media_name: body.img_name,
            user_ID: req.user.user_id
        })
        if (_file) {
            await this.fetchDataService.basictools.deleteunusedcdn([_file.media_path], req.user);
            let _result = await this.fetchDataService.mediarepository.delete({
                media_name: body.img_name,
                user_ID: req.user.user_id
            })

            await this.fetchDataService.cacheManager.store.del(_cacheKey.all_QA_images)
            await this.fetchDataService.cacheManager.store.del(_cacheKey.all_trash_medias)

            return _result;

        } else {
            return null;
        }
    }
}

@Controller('testapi')
export class TestController {

    @Get()
    result(){
        return {message: "Success"}
    }

}