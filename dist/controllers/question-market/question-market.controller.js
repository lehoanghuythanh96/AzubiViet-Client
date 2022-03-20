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
exports.UserDeleteSingleQuestionProductController = exports.UserReportExpiredAnswerController = exports.UserConfirmClearAnswerReportController = exports.SendPrivateMessageToQuestionAuthorController = exports.ReportedQuestionAuthorRequiredDataController = exports.useranswer_reportedReviewerRequireOriginalAnswerController = exports.UserConfirmReviewController = exports.UserSubmitAnswerReviewController = exports.GetReviewQuestionAnswerController = exports.UsersubmitQuestionAnswerController = exports.UploadQuestionMarketUserAnswerImageByUrlController = exports.UploadQuestionMarketUserAnswerImageByFileController = exports.UploadQuestionProductAvatarByUrlController = exports.UploadQuestionProductAvatarByImgFileController = exports.UserRequireSkipReviewUpdate = exports.UserRequireMakingReviewFixedController = exports.UserRequiredReviewUpdateController = exports.EditPrivateQuestionProductController = exports.CreateNewQuestionProductController = exports.DeleteTempQuestionUserAnswerImageController = exports.DeleteTempQuestionProductImageController = exports.UploadQuestionProductAnswerImageByUrlController = exports.UploadQuestionProductAnswerImageByFileController = exports.UploadQuestionProductImageByUrlController = exports.UploadQuestionProductImageByFileController = exports.AddQuestionProductCategoryController = exports.QuestionMarketController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const Joi = require("joi");
const rxjs_1 = require("rxjs");
const cacheKeys_entity_1 = require("../../models/cacheKeys/cacheKeys.entity");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const media_entity_1 = require("../../models/media/media.entity");
const post_entity_1 = require("../../models/post/post.entity");
const questionmarketanswer_entity_1 = require("../../models/questionmarketanswer/questionmarketanswer.entity");
const questionmarket_useranswer_entity_1 = require("../../models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const questionproductcategory_entity_1 = require("../../models/questionproductcategory/questionproductcategory.entity");
const reportlogger_entity_1 = require("../../models/reportLogger/reportlogger.entity");
const useranswer_review_entity_1 = require("../../models/useranswer_review/useranswer_review.entity");
const userauth_entity_1 = require("../../models/userauthentication/userauth.entity");
const usernotifications_entity_1 = require("../../models/usernotifications/usernotifications.entity");
const userprivatemessage_entity_1 = require("../../models/userprivatemessage/userprivatemessage.entity");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const basic_tools_service_1 = require("../../tools/basic-tools/basic-tools.service");
const typeorm_2 = require("typeorm");
const fetch_data_service_1 = require("../fetch-data/fetch-data.service");
const user_authentication_service_1 = require("../user-authentication/user-authentication.service");
const question_market_service_1 = require("./question-market.service");
let config = nestconfig_interface_1.SystemDefaultConfig;
let QuestionMarketController = class QuestionMarketController {
};
QuestionMarketController = __decorate([
    (0, common_1.Controller)('question-market')
], QuestionMarketController);
exports.QuestionMarketController = QuestionMarketController;
let AddQuestionProductCategoryController = class AddQuestionProductCategoryController {
    constructor(QuestionProductCategoryRepository, CacheManager) {
        this.QuestionProductCategoryRepository = QuestionProductCategoryRepository;
        this.CacheManager = CacheManager;
        this.uploadschema = Joi.object({
            category_name: Joi.string().required(),
            area_ID: Joi.number().min(1).required()
        });
    }
    async addquestionproductcategory(req, body) {
        var _a;
        if (this.uploadschema.validate(body).error) {
            throw new common_1.ForbiddenException({ message: (_a = this.uploadschema.validate(body).error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let _result = await this.QuestionProductCategoryRepository.save({
            category_name: body.category_name,
            area_ID: body.area_ID,
            user_ID: req.user.user_id
        });
        await this.CacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionproduct_category);
        return _result;
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
], AddQuestionProductCategoryController.prototype, "addquestionproductcategory", null);
AddQuestionProductCategoryController = __decorate([
    (0, common_1.Controller)('addquestionproductcategory'),
    __param(0, (0, typeorm_1.InjectRepository)(questionproductcategory_entity_1.QuestionProductCategoryEntity)),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], AddQuestionProductCategoryController);
exports.AddQuestionProductCategoryController = AddQuestionProductCategoryController;
let UploadQuestionProductImageByFileController = class UploadQuestionProductImageByFileController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadquestionproductimgbyimgfile(req, query) {
        let path_to_save = config.POST_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
                return this.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user);
            }).then(async (result) => {
                let mediapayload = {
                    media_name: result.newFilename,
                    media_type: result.format,
                    media_path: result.newFilepath,
                    user_ID: req.user.user_id,
                    parent_ID: 0,
                    media_category: config.QUESTION_PRODUCT_IMG_CAT,
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
], UploadQuestionProductImageByFileController.prototype, "uploadquestionproductimgbyimgfile", null);
UploadQuestionProductImageByFileController = __decorate([
    (0, common_1.Controller)('uploadquestionproductimgbyimgfile'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], UploadQuestionProductImageByFileController);
exports.UploadQuestionProductImageByFileController = UploadQuestionProductImageByFileController;
let UploadQuestionProductImageByUrlController = class UploadQuestionProductImageByUrlController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadquestionproductimgbyurl(req, body) {
        return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
            return this.basictools.uploadimgbyurl(body.img_url, config.POST_IMG_PATH, req.user);
        }).then(async (result) => {
            let mediapayload = {
                media_name: result.newFilename,
                media_type: result.format,
                media_path: result.newFilepath,
                user_ID: req.user.user_id,
                parent_ID: 0,
                media_category: config.QUESTION_PRODUCT_IMG_CAT,
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
], UploadQuestionProductImageByUrlController.prototype, "uploadquestionproductimgbyurl", null);
UploadQuestionProductImageByUrlController = __decorate([
    (0, common_1.Controller)('uploadquestionproductimgbyurl'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], UploadQuestionProductImageByUrlController);
exports.UploadQuestionProductImageByUrlController = UploadQuestionProductImageByUrlController;
let UploadQuestionProductAnswerImageByFileController = class UploadQuestionProductAnswerImageByFileController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadquestionproductanswerimgbyimgfile(req, query) {
        let path_to_save = config.POST_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
                return this.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user);
            }).then(async (result) => {
                let mediapayload = {
                    media_name: result.newFilename,
                    media_type: result.format,
                    media_path: result.newFilepath,
                    user_ID: req.user.user_id,
                    parent_ID: 0,
                    media_category: config.QUESTION_PRODUCT_ANSWER_IMG_CAT,
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
], UploadQuestionProductAnswerImageByFileController.prototype, "uploadquestionproductanswerimgbyimgfile", null);
UploadQuestionProductAnswerImageByFileController = __decorate([
    (0, common_1.Controller)('uploadquestionproductanswerimgbyimgfile'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], UploadQuestionProductAnswerImageByFileController);
exports.UploadQuestionProductAnswerImageByFileController = UploadQuestionProductAnswerImageByFileController;
let UploadQuestionProductAnswerImageByUrlController = class UploadQuestionProductAnswerImageByUrlController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadquestionproductanswerimgbyurl(req, body) {
        return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
            return this.basictools.uploadimgbyurl(body.img_url, config.POST_IMG_PATH, req.user);
        }).then(async (result) => {
            let mediapayload = {
                media_name: result.newFilename,
                media_type: result.format,
                media_path: result.newFilepath,
                user_ID: req.user.user_id,
                parent_ID: 0,
                media_category: config.QUESTION_PRODUCT_ANSWER_IMG_CAT,
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
], UploadQuestionProductAnswerImageByUrlController.prototype, "uploadquestionproductanswerimgbyurl", null);
UploadQuestionProductAnswerImageByUrlController = __decorate([
    (0, common_1.Controller)('uploadquestionproductanswerimgbyurl'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], UploadQuestionProductAnswerImageByUrlController);
exports.UploadQuestionProductAnswerImageByUrlController = UploadQuestionProductAnswerImageByUrlController;
let DeleteTempQuestionProductImageController = class DeleteTempQuestionProductImageController {
    constructor(basictools, mediarepository, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.cacheManager = cacheManager;
    }
    async deletetemporaryquestionproductimg(req, body) {
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
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionIMG);
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionanswer_IMG);
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionproduct_avatar);
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
], DeleteTempQuestionProductImageController.prototype, "deletetemporaryquestionproductimg", null);
DeleteTempQuestionProductImageController = __decorate([
    (0, common_1.Controller)('deletetemporaryquestionproductimg'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository, Object])
], DeleteTempQuestionProductImageController);
exports.DeleteTempQuestionProductImageController = DeleteTempQuestionProductImageController;
let DeleteTempQuestionUserAnswerImageController = class DeleteTempQuestionUserAnswerImageController {
    constructor(basictools, mediarepository, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.cacheManager = cacheManager;
    }
    async deletetemporaryquestionuseranswerimg(req, body) {
        let _file = await this.mediarepository.findOne({
            media_name: body.img_name,
            user_ID: req.user.user_id
        });
        if (_file) {
            await this.basictools.deleteunusedcdn([_file.media_path], req.user);
            let _result = await this.mediarepository.delete({
                media_name: body.img_name,
                user_ID: req.user.user_id,
                media_category: config.QUESTION_USER_ANSWER_IMG_CAT
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_useranswerIMG);
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
], DeleteTempQuestionUserAnswerImageController.prototype, "deletetemporaryquestionuseranswerimg", null);
DeleteTempQuestionUserAnswerImageController = __decorate([
    (0, common_1.Controller)('deletetemporaryquestionuseranswerimg'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository, Object])
], DeleteTempQuestionUserAnswerImageController);
exports.DeleteTempQuestionUserAnswerImageController = DeleteTempQuestionUserAnswerImageController;
let CreateNewQuestionProductController = class CreateNewQuestionProductController {
    constructor(questionmarketanswerRepository, postrepository, mediarepository, cacheManager) {
        this.questionmarketanswerRepository = questionmarketanswerRepository;
        this.postrepository = postrepository;
        this.mediarepository = mediarepository;
        this.cacheManager = cacheManager;
        this.uploadschema = Joi.object({
            post_title: Joi.string().max(155).required(),
            post_category: Joi.array().required(),
            post_content: Joi.string().required(),
            answer_content: Joi.string().required(),
            questionimgs: Joi.array().required(),
            answerimgs: Joi.array().required(),
            question_avatar: Joi.string().required()
        });
    }
    async createnewquestionproduct(req, body) {
        var _a;
        if (this.uploadschema.validate(body).error) {
            throw new common_1.ForbiddenException({ message: (_a = this.uploadschema.validate(body).error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let _newPost = {
            post_title: body.post_title,
            post_content: body.post_content,
            post_author: req.user.user_id,
            post_type: post_entity_1.postTypes.question_product,
            post_category: body.post_category,
            post_status: "publish"
        };
        let _postresult = await this.postrepository.save(_newPost);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
        let _newAnswer = {
            answer_content: body.answer_content,
            parent_ID: _postresult.ID,
            user_ID: req.user.user_id
        };
        let _answerresult = await this.questionmarketanswerRepository.save(_newAnswer);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionanswer);
        let _avtupdate = {
            parent_ID: _postresult.ID,
            media_status: "publish"
        };
        await this.mediarepository.update({
            media_name: body.question_avatar
        }, _avtupdate);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionproduct_avatar);
        for (let i = 0; i < body.questionimgs.length; i++) {
            var _updateinfo = {
                parent_ID: _postresult.ID,
                media_status: "publish"
            };
            await this.mediarepository.update({
                media_name: body.questionimgs[i]
            }, _updateinfo);
        }
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionIMG);
        for (let i = 0; i < body.answerimgs.length; i++) {
            var _updateinfo = {
                parent_ID: _answerresult.ID,
                media_status: "publish"
            };
            await this.mediarepository.update({
                media_name: body.answerimgs[i]
            }, _updateinfo);
        }
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionanswer_IMG);
        return _postresult;
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
], CreateNewQuestionProductController.prototype, "createnewquestionproduct", null);
CreateNewQuestionProductController = __decorate([
    (0, common_1.Controller)('createnewquestionproduct'),
    __param(0, (0, typeorm_1.InjectRepository)(questionmarketanswer_entity_1.QuestionMarketAnswerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], CreateNewQuestionProductController);
exports.CreateNewQuestionProductController = CreateNewQuestionProductController;
let EditPrivateQuestionProductController = class EditPrivateQuestionProductController {
    constructor(postrepository, mediarepository, questionmarketanswerRepository, useranswerreviewrepository, cacheManager) {
        this.postrepository = postrepository;
        this.mediarepository = mediarepository;
        this.questionmarketanswerRepository = questionmarketanswerRepository;
        this.useranswerreviewrepository = useranswerreviewrepository;
        this.cacheManager = cacheManager;
        this.uploadschema = Joi.object({
            post_title: Joi.string().max(155).required(),
            post_category: Joi.array().required(),
            post_content: Joi.string().required(),
            answer_content: Joi.string().required(),
            questionimgs: Joi.array().required(),
            answerimgs: Joi.array().required(),
            question_avatar: Joi.string().required(),
            question_ID: Joi.number().min(1).required(),
            answer_ID: Joi.number().min(1).required(),
        });
    }
    async editprivatequestionproduct(req, body) {
        var _a;
        if (this.uploadschema.validate(body).error) {
            throw new common_1.ForbiddenException({ message: (_a = this.uploadschema.validate(body).error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let _newPost = {
            post_title: body.post_title,
            post_content: body.post_content,
            post_author: req.user.user_id,
            post_type: post_entity_1.postTypes.question_product,
            post_category: body.post_category,
            post_status: "publish"
        };
        let _postresult = await this.postrepository.update({
            ID: body.question_ID
        }, _newPost);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
        let _newAnswer = {
            answer_content: body.answer_content,
            parent_ID: body.question_ID,
            user_ID: req.user.user_id
        };
        await this.questionmarketanswerRepository.update({
            ID: body.answer_ID
        }, _newAnswer);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionanswer);
        await this.mediarepository.createQueryBuilder().update({
            media_status: "trash"
        }).where('parent_ID = :q_ID::integer OR parent_ID = :a_ID::integer', {
            q_ID: body.question_ID,
            a_ID: body.answer_ID
        }).execute();
        let _avtupdate = {
            parent_ID: body.question_ID,
            media_status: "publish"
        };
        await this.mediarepository.update({
            media_name: body.question_avatar
        }, _avtupdate);
        for (let i = 0; i < body.questionimgs.length; i++) {
            var _updateinfo = {
                parent_ID: body.question_ID,
                media_status: "publish"
            };
            await this.mediarepository.update({
                media_name: body.questionimgs[i]
            }, _updateinfo);
        }
        for (let i = 0; i < body.answerimgs.length; i++) {
            var _updateinfo = {
                parent_ID: body.answer_ID,
                media_status: "publish"
            };
            await this.mediarepository.update({
                media_name: body.answerimgs[i]
            }, _updateinfo);
        }
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionIMG);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionanswer_IMG);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionproduct_avatar);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
        await this.useranswerreviewrepository.update({
            question_ID: body.question_ID,
            review_fixed: false
        }, {
            review_updated: false
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
        return _postresult;
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
], EditPrivateQuestionProductController.prototype, "editprivatequestionproduct", null);
EditPrivateQuestionProductController = __decorate([
    (0, common_1.Controller)('editprivatequestionproduct'),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(questionmarketanswer_entity_1.QuestionMarketAnswerEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(useranswer_review_entity_1.UserAnswerReviewEntity)),
    __param(4, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], EditPrivateQuestionProductController);
exports.EditPrivateQuestionProductController = EditPrivateQuestionProductController;
let UserRequiredReviewUpdateController = class UserRequiredReviewUpdateController {
    constructor(_questionmarketService, _userAnswerReviewRepository, cacheManager) {
        this._questionmarketService = _questionmarketService;
        this._userAnswerReviewRepository = _userAnswerReviewRepository;
        this.cacheManager = cacheManager;
    }
    async userrequiredreviewupdate(req, body) {
        let _allQuestions = await this._questionmarketService.getall_questionproduct();
        let _foundQuestion = _allQuestions.find(y => y.ID == body.question_ID);
        if (!_foundQuestion) {
            await this._userAnswerReviewRepository.update({
                answerer_ID: req.user.user_id,
                question_ID: body.question_ID
            }, {
                review_updated: true,
                review_fixed: true
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] Original question not found, the state of this review will be changed to updated and fixed" });
        }
        let _allOriginalAnswers = await this._questionmarketService.getallquestionanswer();
        let _foundOriginalAnswer = _allOriginalAnswers.find(y => y.parent_ID == body.question_ID);
        if (!_foundOriginalAnswer) {
            await this._userAnswerReviewRepository.update({
                answerer_ID: req.user.user_id,
                question_ID: body.question_ID
            }, {
                review_updated: true,
                review_fixed: true
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] Original answer not found, the state of this review will be changed to updated and fixed" });
        }
        let _allQuestionAvatars = await this._questionmarketService.getallquestionproductavatar();
        let _allquestionIMGs = await this._questionmarketService.getallquestionIMG();
        let _allAnswerIMGs = await this._questionmarketService.getallquestionanswerIMG();
        let _result = await this._questionmarketService.updateAllPrivateReviewsInfo(req.user, body.question_ID, _foundQuestion, _foundOriginalAnswer, _allQuestionAvatars.find(y => y.parent_ID == body.question_ID), _allquestionIMGs.filter(y => y.parent_ID == body.question_ID), _allAnswerIMGs.filter(y => y.parent_ID == _foundOriginalAnswer.ID));
        return _result;
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
], UserRequiredReviewUpdateController.prototype, "userrequiredreviewupdate", null);
UserRequiredReviewUpdateController = __decorate([
    (0, common_1.Controller)('userrequiredreviewupdate'),
    __param(1, (0, typeorm_1.InjectRepository)(useranswer_review_entity_1.UserAnswerReviewEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        typeorm_2.Repository, Object])
], UserRequiredReviewUpdateController);
exports.UserRequiredReviewUpdateController = UserRequiredReviewUpdateController;
let UserRequireMakingReviewFixedController = class UserRequireMakingReviewFixedController {
    constructor(_questionmarketService) {
        this._questionmarketService = _questionmarketService;
    }
    async userrequiremakingreviewfixed(req, body) {
        let _result = await this._questionmarketService.makeReviewFixed(body.question_ID, req.user);
        return _result;
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
], UserRequireMakingReviewFixedController.prototype, "userrequiremakingreviewfixed", null);
UserRequireMakingReviewFixedController = __decorate([
    (0, common_1.Controller)('userrequiremakingreviewfixed'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService])
], UserRequireMakingReviewFixedController);
exports.UserRequireMakingReviewFixedController = UserRequireMakingReviewFixedController;
let UserRequireSkipReviewUpdate = class UserRequireSkipReviewUpdate {
    constructor(_questionmarketService) {
        this._questionmarketService = _questionmarketService;
    }
    async userrequiremakingreviewupdated(req, body) {
        let _result = await this._questionmarketService.makeReviewSkippingUpdate(body.question_ID, req.user);
        return _result;
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
], UserRequireSkipReviewUpdate.prototype, "userrequiremakingreviewupdated", null);
UserRequireSkipReviewUpdate = __decorate([
    (0, common_1.Controller)('userrequiremakingreviewupdated'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService])
], UserRequireSkipReviewUpdate);
exports.UserRequireSkipReviewUpdate = UserRequireSkipReviewUpdate;
let UploadQuestionProductAvatarByImgFileController = class UploadQuestionProductAvatarByImgFileController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadquestionproductavatarbyimgfile(req, query) {
        let path_to_save = config.POST_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
                return this.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user);
            }).then(async (result) => {
                let mediapayload = {
                    media_name: result.newFilename,
                    media_type: result.format,
                    media_path: result.newFilepath,
                    user_ID: req.user.user_id,
                    parent_ID: 0,
                    media_category: config.QUESTION_PRODUCT_AVATAR_CAT,
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
], UploadQuestionProductAvatarByImgFileController.prototype, "uploadquestionproductavatarbyimgfile", null);
UploadQuestionProductAvatarByImgFileController = __decorate([
    (0, common_1.Controller)('uploadquestionproductavatarbyimgfile'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], UploadQuestionProductAvatarByImgFileController);
exports.UploadQuestionProductAvatarByImgFileController = UploadQuestionProductAvatarByImgFileController;
let UploadQuestionProductAvatarByUrlController = class UploadQuestionProductAvatarByUrlController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadquestionproductavatarbyurl(req, body) {
        return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
            return this.basictools.uploadimgbyurl(body.img_url, config.POST_IMG_PATH, req.user);
        }).then(async (result) => {
            let mediapayload = {
                media_name: result.newFilename,
                media_type: result.format,
                media_path: result.newFilepath,
                user_ID: req.user.user_id,
                parent_ID: 0,
                media_category: config.QUESTION_PRODUCT_AVATAR_CAT,
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
], UploadQuestionProductAvatarByUrlController.prototype, "uploadquestionproductavatarbyurl", null);
UploadQuestionProductAvatarByUrlController = __decorate([
    (0, common_1.Controller)('uploadquestionproductavatarbyurl'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], UploadQuestionProductAvatarByUrlController);
exports.UploadQuestionProductAvatarByUrlController = UploadQuestionProductAvatarByUrlController;
let UploadQuestionMarketUserAnswerImageByFileController = class UploadQuestionMarketUserAnswerImageByFileController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadquestionmarketuseranswerimgbyimgfile(req, query) {
        let path_to_save = config.POST_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
                return this.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user);
            }).then(async (result) => {
                let mediapayload = {
                    media_name: result.newFilename,
                    media_type: result.format,
                    media_path: result.newFilepath,
                    user_ID: req.user.user_id,
                    parent_ID: 0,
                    media_category: config.QUESTION_USER_ANSWER_IMG_CAT,
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
], UploadQuestionMarketUserAnswerImageByFileController.prototype, "uploadquestionmarketuseranswerimgbyimgfile", null);
UploadQuestionMarketUserAnswerImageByFileController = __decorate([
    (0, common_1.Controller)('uploadquestionmarketuseranswerimgbyimgfile'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], UploadQuestionMarketUserAnswerImageByFileController);
exports.UploadQuestionMarketUserAnswerImageByFileController = UploadQuestionMarketUserAnswerImageByFileController;
let UploadQuestionMarketUserAnswerImageByUrlController = class UploadQuestionMarketUserAnswerImageByUrlController {
    constructor(basictools, mediarepository, localService, cacheManager) {
        this.basictools = basictools;
        this.mediarepository = mediarepository;
        this.localService = localService;
        this.cacheManager = cacheManager;
    }
    uploadquestionmarketuseranswerimgbyurl(req, body) {
        return (0, rxjs_1.from)(this.localService.getusertempmediafiles(req.user).then(() => {
            return this.basictools.uploadimgbyurl(body.img_url, config.POST_IMG_PATH, req.user);
        }).then(async (result) => {
            let mediapayload = {
                media_name: result.newFilename,
                media_type: result.format,
                media_path: result.newFilepath,
                user_ID: req.user.user_id,
                parent_ID: 0,
                media_category: config.QUESTION_USER_ANSWER_IMG_CAT,
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
], UploadQuestionMarketUserAnswerImageByUrlController.prototype, "uploadquestionmarketuseranswerimgbyurl", null);
UploadQuestionMarketUserAnswerImageByUrlController = __decorate([
    (0, common_1.Controller)('uploadquestionmarketuseranswerimgbyurl'),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [basic_tools_service_1.BasicToolsService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService, Object])
], UploadQuestionMarketUserAnswerImageByUrlController);
exports.UploadQuestionMarketUserAnswerImageByUrlController = UploadQuestionMarketUserAnswerImageByUrlController;
let UsersubmitQuestionAnswerController = class UsersubmitQuestionAnswerController {
    constructor(questionMarketService) {
        this.questionMarketService = questionMarketService;
        this.uploadschema = Joi.object({
            answer_content: Joi.string().required(),
            answer_imgs: Joi.array().required(),
            question_ID: Joi.number().required()
        });
    }
    async usersubmitquestionanswer(req, body) {
        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new common_1.ForbiddenException({ message: _checker.error.message });
        }
        return this.questionMarketService.userSubmitNewQuestionAnswer(body.answer_content, body.answer_imgs, body.question_ID, req.user.user_id, true);
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
], UsersubmitQuestionAnswerController.prototype, "usersubmitquestionanswer", null);
UsersubmitQuestionAnswerController = __decorate([
    (0, common_1.Controller)('usersubmitquestionanswer'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService])
], UsersubmitQuestionAnswerController);
exports.UsersubmitQuestionAnswerController = UsersubmitQuestionAnswerController;
let GetReviewQuestionAnswerController = class GetReviewQuestionAnswerController {
    constructor(questionMarketService, userService, jwt, notificationRepository, userAnswerRepository, userPrivateMessageRepository, cacheManager) {
        this.questionMarketService = questionMarketService;
        this.userService = userService;
        this.jwt = jwt;
        this.notificationRepository = notificationRepository;
        this.userAnswerRepository = userAnswerRepository;
        this.userPrivateMessageRepository = userPrivateMessageRepository;
        this.cacheManager = cacheManager;
    }
    async getreviewquestionanswer(body) {
        try {
            let _decode = this.jwt.verify(body.token);
            if (!_decode) {
                throw new common_1.BadRequestException({ message: "[Question Market Controller] Notification token is not valid" });
            }
            let _allNotifications = await this.userService.getallusernotifications();
            let _foundNotification = _allNotifications.find(y => y.ID == _decode.notification_ID);
            if (!_foundNotification) {
                throw new common_1.ForbiddenException({ message: "[Question Market Controller] Notification item not found" });
            }
            let allQuestions = await this.questionMarketService.getall_questionproduct();
            let foundQuestion = allQuestions.find(y => y.ID == _decode.question_ID);
            if (!foundQuestion) {
                throw new common_1.ForbiddenException({ message: "[Question Market Controller] Question item not found" });
            }
            let allUserAnswer = await this.questionMarketService.getalluseranswerinmarket();
            let _foundUserAnswer = allUserAnswer.find(item => item.ID == _decode.user_answer_ID);
            if (!_foundUserAnswer) {
                await this.notificationRepository.delete({
                    ID: _decode.notification_ID
                });
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
                throw new common_1.ForbiddenException({ message: "[Question Market Controller] User answer item not found, this notification is removed" });
            }
            if (foundQuestion.post_status != "publish") {
                let _childAnswers = [...allUserAnswer.filter(y => y.parent_ID == foundQuestion.ID)];
                _childAnswers.forEach(async (single) => {
                    if (single.is_reviewed == false) {
                        await this.userAnswerRepository.update({
                            ID: single.ID
                        }, {
                            is_reviewed: true
                        });
                        let _newMsg = {
                            message_content: `Your answer #${single.ID} will not be reviewed anymore because the question has been reported as invalid`,
                            sender_email: 'admin@azubiviet.com',
                            user_ID: single.user_ID,
                            sender_ID: 0
                        };
                        await this.userPrivateMessageRepository.save(_newMsg);
                    }
                });
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userPrivateMessage);
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerinMarket);
                await this.notificationRepository.delete({
                    ID: _decode.notification_ID
                });
                await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
                throw new common_1.BadRequestException({ message: "[Question Market Controller] The question of this answer has been reported as invalid, you don't have to review this answer anymore" });
            }
            let _allAnswers = await this.questionMarketService.getallquestionanswer();
            let answer = Object.assign({}, _allAnswers.find(y => y.parent_ID == _decode.question_ID));
            let _cacheMedia = await this.questionMarketService.getallquestionanswerIMG();
            let _foundMedia = _cacheMedia.filter(y => y.parent_ID == answer.ID);
            answer.answer_imgs = _foundMedia;
            return [answer, _decode.notification_ID];
        }
        catch (error) {
            throw new common_1.BadRequestException({ message: error.message });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetReviewQuestionAnswerController.prototype, "getreviewquestionanswer", null);
GetReviewQuestionAnswerController = __decorate([
    (0, common_1.Controller)('getreviewquestionanswer'),
    __param(3, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(userprivatemessage_entity_1.UserPrivateMessageEntity)),
    __param(6, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        user_authentication_service_1.UserAuthenticationService,
        jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], GetReviewQuestionAnswerController);
exports.GetReviewQuestionAnswerController = GetReviewQuestionAnswerController;
let UserSubmitAnswerReviewController = class UserSubmitAnswerReviewController {
    constructor(_questionmarketService, _userauthService, userNotificationRepository, cacheManager, userRepository, userAnswerReviewRepository, questionMarketUserAnswerRepository) {
        this._questionmarketService = _questionmarketService;
        this._userauthService = _userauthService;
        this.userNotificationRepository = userNotificationRepository;
        this.cacheManager = cacheManager;
        this.userRepository = userRepository;
        this.userAnswerReviewRepository = userAnswerReviewRepository;
        this.questionMarketUserAnswerRepository = questionMarketUserAnswerRepository;
        this.uploadschema = Joi.object({
            correctness: Joi.boolean().required(),
            review_content: Joi.string(),
            notification_ID: Joi.number().required()
        });
    }
    async usersubmitanswerreview(req, body) {
        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new common_1.ForbiddenException({ message: _checker.error.message });
        }
        let _selectedUsers = [];
        let _allNotis = await this._userauthService.getallusernotifications();
        let _foundNotis = _allNotis.find(item => item.ID == body.notification_ID);
        if (!_foundNotis) {
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] This answer is already reviewed by others, you don't have to review it anymore" });
        }
        if (!_foundNotis.user_IDs.includes(req.user.user_id)) {
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] You don't have the right to review this answer, please contact admin for more information" });
        }
        _selectedUsers = _selectedUsers.concat(_foundNotis.user_IDs);
        let _allUserAnswer = await this._questionmarketService.getalluseranswerinmarket();
        let _UserAnswerItem = _allUserAnswer.find(y => y.ID == _foundNotis.data.user_answer_ID);
        if (!_UserAnswerItem ||
            _UserAnswerItem.is_reported == true) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] User answer not found, this notification will be deleted right away" });
        }
        if (!_UserAnswerItem.waiting_reviewers.includes(req.user.user_id)) {
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] You don't have the right to review this answer, please contact admin for more information" });
        }
        let _allUsers = await this._userauthService.getallusers();
        let _answerer = _allUsers.find(y => y.ID == _UserAnswerItem.user_ID);
        if (!_answerer) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] The answerer not found, this notification will be deleted right away" });
        }
        let _allQuestion = await this._questionmarketService.getall_questionproduct();
        let _targetQuestion = Object.assign({}, _allQuestion.find(y => y.ID == _foundNotis.data.question_ID));
        if (!_allQuestion.find(y => y.ID == _foundNotis.data.question_ID)) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] The original question not found, this notification will be deleted right away" });
        }
        let _allOriginalAnswers = await this._questionmarketService.getallquestionanswer();
        let _foundOriginalAnswer = _allOriginalAnswers.find(y => y.parent_ID == _targetQuestion.ID);
        if (!_foundOriginalAnswer) {
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.ForbiddenException({ message: "[Question Market Controller] The original answer not found, this notification will be deleted right away" });
        }
        if (body.correctness == true) {
            let _singleexp = _targetQuestion.question_experience;
            let _newExp = _answerer.user_experience + _singleexp;
            await this.userRepository.update({
                ID: _answerer.ID
            }, {
                user_experience: _newExp
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
        }
        let _allQuestionAvatars = await this._questionmarketService.getallquestionproductavatar();
        let _foundQuestionAvatar = _allQuestionAvatars.find(y => y.parent_ID == _targetQuestion.ID);
        let _allQuestionIMGs = await this._questionmarketService.getallquestionIMG();
        let _foundQuestionIMGs = _allQuestionIMGs.filter(y => y.parent_ID == _targetQuestion.ID);
        let _allOriginalAnswerIMGs = await this._questionmarketService.getallquestionanswerIMG();
        let _foundOriginalAnswerIMGs = _allOriginalAnswerIMGs.filter(y => y.parent_ID == _foundOriginalAnswer.ID);
        _targetQuestion.question_imgs = _foundQuestionIMGs;
        _targetQuestion.question_avatar = _foundQuestionAvatar;
        _foundOriginalAnswer.answer_imgs = _foundOriginalAnswerIMGs;
        let _reviewItem = {
            correctness: body.correctness,
            review_content: body.review_content,
            answerer_ID: _answerer.ID,
            user_answer_ID: _UserAnswerItem.ID,
            review_author: req.user.user_id,
            question_ID: _targetQuestion.ID,
            question_info: _targetQuestion,
            original_answer_ID: _foundOriginalAnswer.ID,
            original_answer_info: _foundOriginalAnswer
        };
        let _result = await this.userAnswerReviewRepository.save(_reviewItem);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
        await this.userNotificationRepository.delete({
            ID: body.notification_ID
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        let _reviewerMoney = _allUsers.find(y => y.ID == req.user.user_id).user_abicoin;
        let _increasedmoney = 1;
        await this.userRepository.update({
            ID: req.user.user_id
        }, {
            user_abicoin: _reviewerMoney + _increasedmoney
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
        await this.questionMarketUserAnswerRepository.update({
            ID: _UserAnswerItem.ID
        }, {
            review_ID: _result.ID,
            is_reviewed: true
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerinMarket);
        let _answererNoti = {
            type: usernotifications_entity_1.UserNotification_Types.answer_isReviewed,
            data: {
                review_ID: _result.ID
            },
            secret: {},
            user_IDs: [_answerer.ID],
            deletion_allowed: []
        };
        await this.userNotificationRepository.save(_answererNoti);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
        _selectedUsers.push(_answerer.ID);
        return {
            selectedUsers: _selectedUsers,
            reviewer_increased_money: _increasedmoney
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
], UserSubmitAnswerReviewController.prototype, "usersubmitanswerreview", null);
UserSubmitAnswerReviewController = __decorate([
    (0, common_1.Controller)('usersubmitanswerreview'),
    __param(2, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(4, (0, typeorm_1.InjectRepository)(userauth_entity_1.UserEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(useranswer_review_entity_1.UserAnswerReviewEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity)),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        user_authentication_service_1.UserAuthenticationService,
        typeorm_2.Repository, Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserSubmitAnswerReviewController);
exports.UserSubmitAnswerReviewController = UserSubmitAnswerReviewController;
let UserConfirmReviewController = class UserConfirmReviewController {
    constructor(_questionmarketService, _userauthService, _userAnswerReviewRepository, cacheManager, userRepository, userNotificationRepository) {
        this._questionmarketService = _questionmarketService;
        this._userauthService = _userauthService;
        this._userAnswerReviewRepository = _userAnswerReviewRepository;
        this.cacheManager = cacheManager;
        this.userRepository = userRepository;
        this.userNotificationRepository = userNotificationRepository;
    }
    async userconfirmreview(body) {
        let allUsers = await this._userauthService.getallusers();
        let allanswerReviews = await this._questionmarketService.getAllUserAnswerReviews();
        let foundReview = allanswerReviews.find(y => y.ID == body.review_ID);
        let foundReviewer = allUsers.find(y => y.ID == foundReview.review_author);
        if (!foundReview || !foundReviewer) {
            await this._userAnswerReviewRepository.update({
                ID: body.review_ID
            }, {
                review_confirmed: true
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            throw new common_1.BadRequestException({ message: "[Question Market Controller] Review or reviewer doesn't exist, notification is deleted" });
        }
        if (body.isLiked == true) {
            let _newMoney = foundReviewer.user_abicoin + 1;
            await this.userRepository.update({
                ID: foundReviewer.ID
            }, {
                user_abicoin: _newMoney
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
            let _newNoti = {
                type: usernotifications_entity_1.UserNotification_Types.review_isLiked,
                data: {
                    coin_received: 1,
                    current_coin: _newMoney
                },
                secret: {},
                user_IDs: [foundReviewer.ID],
                deletion_allowed: [foundReviewer.ID]
            };
            await this.userNotificationRepository.save(_newNoti);
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            await this._userAnswerReviewRepository.update({
                ID: body.review_ID
            }, {
                review_confirmed: true,
                review_isLiked: true
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            return foundReviewer.ID;
        }
        else {
            await this._userAnswerReviewRepository.update({
                ID: body.review_ID
            }, {
                review_confirmed: true
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_userAnswerReview);
            await this.userNotificationRepository.delete({
                ID: body.notification_ID
            });
            await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_usernotifications);
            return null;
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserConfirmReviewController.prototype, "userconfirmreview", null);
UserConfirmReviewController = __decorate([
    (0, common_1.Controller)('userconfirmreview'),
    __param(2, (0, typeorm_1.InjectRepository)(useranswer_review_entity_1.UserAnswerReviewEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(4, (0, typeorm_1.InjectRepository)(userauth_entity_1.UserEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        user_authentication_service_1.UserAuthenticationService,
        typeorm_2.Repository, Object, typeorm_2.Repository,
        typeorm_2.Repository])
], UserConfirmReviewController);
exports.UserConfirmReviewController = UserConfirmReviewController;
let useranswer_reportedReviewerRequireOriginalAnswerController = class useranswer_reportedReviewerRequireOriginalAnswerController {
    constructor(_questionmarketService, _userauthService) {
        this._questionmarketService = _questionmarketService;
        this._userauthService = _userauthService;
    }
    async useranswer_reportedReviewerRequireOriginalAnswer(req, body) {
        let allReportLogs = await this._userauthService.getallReportLogger();
        let foundReportLog = allReportLogs.find(y => y.report_type == reportlogger_entity_1.ReportLoggerTypes.questionMarketUserAnswer && y.report_sender == req.user.user_id && y.parent_ID == body.user_answer_ID);
        if (!foundReportLog) {
            throw new common_1.ForbiddenException({ message: "You are not allowed to see the original answer of this report" });
        }
        let allUserAnswer = await this._questionmarketService.getalluseranswerinmarket();
        let foundUserAnswer = allUserAnswer.find(y => y.ID == body.user_answer_ID);
        if (!foundUserAnswer) {
            throw new common_1.ForbiddenException({ message: "User's answer not found" });
        }
        let allQuestionAnswer = await this._questionmarketService.getallquestionanswer();
        let foundAnswer = allQuestionAnswer.find(y => y.parent_ID == foundUserAnswer.parent_ID);
        if (!foundAnswer) {
            throw new common_1.ForbiddenException({ message: "Original answer not found" });
        }
        let allQuestionAnswerIMGs = await this._questionmarketService.getallquestionanswerIMG();
        foundAnswer.answer_imgs = allQuestionAnswerIMGs.filter(y => y.media_category == config.QUESTION_PRODUCT_ANSWER_IMG_CAT && y.parent_ID == foundAnswer.ID);
        return foundAnswer;
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
], useranswer_reportedReviewerRequireOriginalAnswerController.prototype, "useranswer_reportedReviewerRequireOriginalAnswer", null);
useranswer_reportedReviewerRequireOriginalAnswerController = __decorate([
    (0, common_1.Controller)('useranswer_reportedReviewerRequireOriginalAnswer'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        user_authentication_service_1.UserAuthenticationService])
], useranswer_reportedReviewerRequireOriginalAnswerController);
exports.useranswer_reportedReviewerRequireOriginalAnswerController = useranswer_reportedReviewerRequireOriginalAnswerController;
let ReportedQuestionAuthorRequiredDataController = class ReportedQuestionAuthorRequiredDataController {
    constructor(_questionmarketService) {
        this._questionmarketService = _questionmarketService;
    }
    async reportedquestion_authorrequiredata(req, body) {
        let allQuestions = await this._questionmarketService.getall_questionproduct();
        let foundQuestion = allQuestions.find(y => y.ID == body.question_ID && y.post_author == req.user.user_id);
        if (!foundQuestion) {
            throw new common_1.BadRequestException({ message: "[Question Market Controller] You don't have access to this question" });
        }
        let Avatar = Object.assign({}, [...await this._questionmarketService.getallquestionproductavatar()].find(y => y.parent_ID == foundQuestion.ID));
        let imgs = [...await this._questionmarketService.getallquestionIMG()].filter(y => y.parent_ID == foundQuestion.ID);
        foundQuestion.question_avatar = Avatar;
        foundQuestion.question_imgs = imgs;
        return foundQuestion;
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
], ReportedQuestionAuthorRequiredDataController.prototype, "reportedquestion_authorrequiredata", null);
ReportedQuestionAuthorRequiredDataController = __decorate([
    (0, common_1.Controller)('reportedquestion_authorrequiredata'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService])
], ReportedQuestionAuthorRequiredDataController);
exports.ReportedQuestionAuthorRequiredDataController = ReportedQuestionAuthorRequiredDataController;
let SendPrivateMessageToQuestionAuthorController = class SendPrivateMessageToQuestionAuthorController {
    constructor(_questionmarketService, userAuthService) {
        this._questionmarketService = _questionmarketService;
        this.userAuthService = userAuthService;
    }
    async sendprivatemessagetoquestionauthor(req, body) {
        let allQuestions = await this._questionmarketService.getall_questionproduct();
        let foundQuestion = allQuestions.find(y => y.ID == body.question_ID);
        if (!foundQuestion || foundQuestion.post_status != 'publish') {
            throw new common_1.ForbiddenException({ message: "Question doesn't exist anymore" });
        }
        let _newMsg = {
            message_content: body.message_content,
            sender_email: req.user.user_email,
            sender_ID: req.user.user_id,
            user_ID: foundQuestion.post_author
        };
        await this.userAuthService.sendprivateMsgtoUser(foundQuestion.post_author, req.user.user_id, _newMsg);
        return {
            selectedUsers: [foundQuestion.post_author]
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
], SendPrivateMessageToQuestionAuthorController.prototype, "sendprivatemessagetoquestionauthor", null);
SendPrivateMessageToQuestionAuthorController = __decorate([
    (0, common_1.Controller)('sendprivatemessagetoquestionauthor'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        user_authentication_service_1.UserAuthenticationService])
], SendPrivateMessageToQuestionAuthorController);
exports.SendPrivateMessageToQuestionAuthorController = SendPrivateMessageToQuestionAuthorController;
let UserConfirmClearAnswerReportController = class UserConfirmClearAnswerReportController {
    constructor(_questionmarketService) {
        this._questionmarketService = _questionmarketService;
    }
    async userconfirmclearanswerreport(req, body) {
        return await this._questionmarketService.userconfirmClearAnswerReport(req.user, body.user_answer_ID);
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
], UserConfirmClearAnswerReportController.prototype, "userconfirmclearanswerreport", null);
UserConfirmClearAnswerReportController = __decorate([
    (0, common_1.Controller)('userconfirmclearanswerreport'),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService])
], UserConfirmClearAnswerReportController);
exports.UserConfirmClearAnswerReportController = UserConfirmClearAnswerReportController;
let UserReportExpiredAnswerController = class UserReportExpiredAnswerController {
    constructor(_questionmarketService, _userauthService, reportLoggerRepository, cacheManager, userRepository) {
        this._questionmarketService = _questionmarketService;
        this._userauthService = _userauthService;
        this.reportLoggerRepository = reportLoggerRepository;
        this.cacheManager = cacheManager;
        this.userRepository = userRepository;
    }
    async userreportexpiredanswer(req, body) {
        let allUserAnswers = await this._questionmarketService.getalluseranswerinmarket();
        let foundAnswer = allUserAnswers.find(y => y.ID == body.user_answer_ID && y.author_isBlocked == false);
        if (!foundAnswer) {
            throw new common_1.ForbiddenException({ message: `Answer #${body.user_answer_ID} doesn't exist` });
        }
        if (foundAnswer.is_reported ||
            foundAnswer.is_reviewed) {
            throw new common_1.ForbiddenException({ message: `Your answer is already reported or reviewed, please check the status of this answer again by refreshing page.` });
        }
        let now = new Date().getTime();
        let answerDate = new Date(foundAnswer.answer_date).getTime();
        if ((now - answerDate) <= (5 * 86400 * 1000)) {
            throw new common_1.ForbiddenException({ message: `This report action is not allowed, it is now not longer than 5 days since the time this answer was sent` });
        }
        let allUsers = await this._userauthService.getallusers();
        let foundUser = allUsers.find(y => y.ID == req.user.user_id);
        if (!foundUser) {
            throw new common_1.ForbiddenException({ message: `User information not found` });
        }
        let newCoin = foundUser.user_abicoin + 1;
        await this.userRepository.update({
            ID: req.user.user_id
        }, {
            user_abicoin: newCoin
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_users);
        foundAnswer.waiting_reviewers.forEach(async (y) => {
            await this._userauthService.punishUserByPoint(1, y);
        });
        await this._questionmarketService.resetReporteduserAnswer(foundAnswer.ID);
        let _repeatAnswer = await this._questionmarketService.userSubmitNewQuestionAnswer("", [], foundAnswer.parent_ID, foundAnswer.user_ID, false, foundAnswer.ID);
        let _newReportLogger = {
            report_notes: "Report expired answer",
            report_sender: req.user.user_id,
            report_controllers: [],
            parent_ID: foundAnswer.ID,
            report_type: reportlogger_entity_1.ReportLoggerTypes.useranswer_expired,
            finished: true
        };
        await this.reportLoggerRepository.save(_newReportLogger);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_ReportLogger);
        return {
            selectedUsers: _repeatAnswer
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
], UserReportExpiredAnswerController.prototype, "userreportexpiredanswer", null);
UserReportExpiredAnswerController = __decorate([
    (0, common_1.Controller)('userreportexpiredanswer'),
    __param(2, (0, typeorm_1.InjectRepository)(reportlogger_entity_1.ReportLoggerEntity)),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(4, (0, typeorm_1.InjectRepository)(userauth_entity_1.UserEntity)),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        user_authentication_service_1.UserAuthenticationService,
        typeorm_2.Repository, Object, typeorm_2.Repository])
], UserReportExpiredAnswerController);
exports.UserReportExpiredAnswerController = UserReportExpiredAnswerController;
let UserDeleteSingleQuestionProductController = class UserDeleteSingleQuestionProductController {
    constructor(_questionmarketService, _userauthService, _fetchdataService, postRepository, cacheManager, mediaListRepository) {
        this._questionmarketService = _questionmarketService;
        this._userauthService = _userauthService;
        this._fetchdataService = _fetchdataService;
        this.postRepository = postRepository;
        this.cacheManager = cacheManager;
        this.mediaListRepository = mediaListRepository;
    }
    async userdeletesinglequestionproduct(req, body) {
        let allQuestions = await this._questionmarketService.getall_questionproduct();
        let foundQuestion = allQuestions.find(y => y.post_author == req.user.user_id && y.ID == body.question_ID);
        if (!foundQuestion) {
            throw new common_1.BadRequestException({ message: "[Question Market Controller] Question not found" });
        }
        await this.postRepository.update({
            ID: body.question_ID
        }, {
            post_status: "trash"
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_question_products);
        let allQuestionAnswer = await this._questionmarketService.getalluseranswerinmarket();
        let foundAnswer = allQuestionAnswer.find(y => y.parent_ID == body.question_ID);
        let allMedias = await this._fetchdataService.getall_Medias();
        let foundMedias = [...allMedias.filter(y => y.parent_ID == body.question_ID && [config.QUESTION_PRODUCT_AVATAR_CAT, config.QUESTION_PRODUCT_IMG_CAT].includes(y.media_category))];
        if (foundAnswer) {
            let _answerMedias = [...allMedias.filter(y => y.parent_ID == foundAnswer.ID && [config.QUESTION_PRODUCT_ANSWER_IMG_CAT].includes(y.media_category))];
            foundMedias = foundMedias.concat(_answerMedias);
        }
        foundMedias.forEach(async (y) => {
            await this.mediaListRepository.update({
                ID: y.ID
            }, {
                media_status: "draft"
            });
        });
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionproduct_avatar);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionIMG);
        await this.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_questionanswer_IMG);
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
], UserDeleteSingleQuestionProductController.prototype, "userdeletesinglequestionproduct", null);
UserDeleteSingleQuestionProductController = __decorate([
    (0, common_1.Controller)('userdeletesinglequestionproduct'),
    __param(3, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __param(4, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(5, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        user_authentication_service_1.UserAuthenticationService,
        fetch_data_service_1.FetchDataService,
        typeorm_2.Repository, Object, typeorm_2.Repository])
], UserDeleteSingleQuestionProductController);
exports.UserDeleteSingleQuestionProductController = UserDeleteSingleQuestionProductController;
//# sourceMappingURL=question-market.controller.js.map