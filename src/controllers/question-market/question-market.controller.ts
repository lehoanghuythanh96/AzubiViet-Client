import {
  Body,
  Controller,
  ForbiddenException,
  PayloadTooLargeException,
  Post,
  Request,
  UseGuards,
  Query,
  Inject,
  CACHE_MANAGER,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Joi = require('joi');
import { Observable, from } from 'rxjs';
import { AppCache, _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';
import { SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { AddCategoryInput } from 'src/models/lessoncategory/lessoncategory.entity';
import {
  FormUploadMediaInput,
  MediaListEntity,
  UpdateFormUploadMediaInput,
} from 'src/models/media/media.entity';
import { postTypes } from 'src/models/post/post.entity';
import {
  AddNewQuestionProducPostBody,
  EditQuestionProducPostBody,
  PostInput,
} from 'src/models/post/post.interface';
import {
  QuestionMarketAnswerInput,
} from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import {
  ReportLoggerInput,
  ReportLoggerTypes,
} from 'src/models/reportLogger/reportlogger.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import {
  UserAnswerReviewInput,
} from 'src/models/useranswer_review/useranswer_review.entity';
import {
  UserNotificationInput,
  UserNotification_Types,
} from 'src/models/usernotifications/usernotifications.entity';
import {
  UserPrivateMessageInput,
} from 'src/models/userprivatemessage/userprivatemessage.entity';
import {
  JwtAuthGuard,
  JwtAuthGuardReq,
} from 'src/tools/auth-tools/jwt-auth.guard';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { QuestionMarketService } from './question-market.service';

let config = SystemDefaultConfig;

@Controller('question-market')
export class QuestionMarketController {}

/* --------------------------------- Add Cat -------------------------------- */
@Controller('addquestionproductcategory')
export class AddQuestionProductCategoryController {
  constructor(private fetchDataService: FetchDataService) {}

  uploadschema = Joi.object({
    category_name: Joi.string().required(),
    area_ID: Joi.number().min(1).required(),
  });

  @UseGuards(JwtAuthGuard)
  @Post()
  async addquestionproductcategory(
    @Request() req: JwtAuthGuardReq,
    @Body() body: AddCategoryInput,
  ) {
    if (this.uploadschema.validate(body).error) {
      throw new ForbiddenException({
        message: this.uploadschema.validate(body).error?.message,
      });
    }

    let _result =
      await this.fetchDataService.questionproductcategoryRepository.save({
        category_name: body.category_name,
        area_ID: body.area_ID,
        user_ID: req.user.user_id,
      });

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionproduct_category,
    );

    return _result;
  }
}

/* ------------------------------ Prod Img File ----------------------------- */
@Controller('uploadquestionproductimgbyimgfile')
export class UploadQuestionProductImageByFileController {
  constructor(
    private readonly localService: QuestionMarketService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadquestionproductimgbyimgfile(
    @Request() req: any,
    @Query() query: FileUploadbyFormQuery,
  ): Observable<any> {
    let path_to_save = config.POST_IMG_PATH;
    if (query.file_size && query.file_size < 25000000) {
      return from(
        this.localService
          .getusertempmediafiles(req.user)
          .then(() => {
            return this.fetchDataService.basictools.formuploadIMG(
              req,
              query.file_obj_name,
              path_to_save,
              req.user,
            );
          })
          .then(async (result: any) => {
            let mediapayload: FormUploadMediaInput = {
              media_name: result.newFilename,
              media_type: result.format,
              media_path: result.newFilepath,
              user_ID: req.user.user_id,
              parent_ID: 0,
              media_category: config.QUESTION_PRODUCT_IMG_CAT,
              media_status: 'trash',
            };
            await this.fetchDataService.mediarepository.save(mediapayload);
            await this.fetchDataService.cacheManager.store.del(
              _cacheKey.all_trash_medias,
            );
            // Must return result from ConvertWebPandMove Fn
            return result;
          })
          .catch((error) => {
            throw error;
          }),
      );
    } else {
      throw new PayloadTooLargeException({ message: 'File is too large' });
    }
  }
}

/* ------------------------------ Prod Img Url ------------------------------ */
@Controller('uploadquestionproductimgbyurl')
export class UploadQuestionProductImageByUrlController {
  constructor(
    private readonly localService: QuestionMarketService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadquestionproductimgbyurl(
    @Request() req: any,
    @Body() body: { img_url: string },
  ): Observable<any> {
    return from(
      this.localService
        .getusertempmediafiles(req.user)
        .then(() => {
          return this.fetchDataService.basictools.uploadimgbyurl(
            body.img_url,
            config.POST_IMG_PATH,
            req.user,
          );
        })
        .then(async (result: any) => {
          let mediapayload: FormUploadMediaInput = {
            media_name: result.newFilename,
            media_type: result.format,
            media_path: result.newFilepath,
            user_ID: req.user.user_id,
            parent_ID: 0,
            media_category: config.QUESTION_PRODUCT_IMG_CAT,
            media_status: 'trash',
          };
          await this.fetchDataService.mediarepository.save(mediapayload);
          await this.fetchDataService.cacheManager.store.del(
            _cacheKey.all_trash_medias,
          );
          // Must return result from ConvertWebPandMove Fn
          return result;
        })
        .catch((error) => {
          throw error;
        }),
    );
  }
}

/* ----------------------------- answer img file ---------------------------- */
@Controller('uploadquestionproductanswerimgbyimgfile')
export class UploadQuestionProductAnswerImageByFileController {
  constructor(
    private readonly localService: QuestionMarketService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadquestionproductanswerimgbyimgfile(
    @Request() req: any,
    @Query() query: FileUploadbyFormQuery,
  ): Observable<any> {
    let path_to_save = config.POST_IMG_PATH;
    if (query.file_size && query.file_size < 25000000) {
      return from(
        this.localService
          .getusertempmediafiles(req.user)
          .then(() => {
            return this.fetchDataService.basictools.formuploadIMG(
              req,
              query.file_obj_name,
              path_to_save,
              req.user,
            );
          })
          .then(async (result: any) => {
            let mediapayload: FormUploadMediaInput = {
              media_name: result.newFilename,
              media_type: result.format,
              media_path: result.newFilepath,
              user_ID: req.user.user_id,
              parent_ID: 0,
              media_category: config.QUESTION_PRODUCT_ANSWER_IMG_CAT,
              media_status: 'trash',
            };
            await this.fetchDataService.mediarepository.save(mediapayload);
            await this.fetchDataService.cacheManager.store.del(
              _cacheKey.all_trash_medias,
            );
            // Must return result from ConvertWebPandMove Fn
            return result;
          })
          .catch((error) => {
            throw error;
          }),
      );
    } else {
      throw new PayloadTooLargeException({ message: 'File is too large' });
    }
  }
}

/* ----------------------------- answer img url ----------------------------- */
@Controller('uploadquestionproductanswerimgbyurl')
export class UploadQuestionProductAnswerImageByUrlController {
  constructor(
    private readonly localService: QuestionMarketService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadquestionproductanswerimgbyurl(
    @Request() req: any,
    @Body() body: { img_url: string },
  ): Observable<any> {
    return from(
      this.localService
        .getusertempmediafiles(req.user)
        .then(() => {
          return this.fetchDataService.basictools.uploadimgbyurl(
            body.img_url,
            config.POST_IMG_PATH,
            req.user,
          );
        })
        .then(async (result: any) => {
          let mediapayload: FormUploadMediaInput = {
            media_name: result.newFilename,
            media_type: result.format,
            media_path: result.newFilepath,
            user_ID: req.user.user_id,
            parent_ID: 0,
            media_category: config.QUESTION_PRODUCT_ANSWER_IMG_CAT,
            media_status: 'trash',
          };
          await this.fetchDataService.mediarepository.save(mediapayload);
          await this.fetchDataService.cacheManager.store.del(
            _cacheKey.all_trash_medias,
          );
          // Must return result from ConvertWebPandMove Fn
          return result;
        })
        .catch((error) => {
          throw error;
        }),
    );
  }
}

/* ----------------------------- delete temp question img ---------------------------- */
@Controller('deletetemporaryquestionproductimg')
export class DeleteTempQuestionProductImageController {
  constructor(private fetchDataService: FetchDataService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async deletetemporaryquestionproductimg(
    @Request() req: JwtAuthGuardReq,
    @Body() body: { img_name: string },
  ) {
    let _file = await this.fetchDataService.mediarepository.findOne({
      media_name: body.img_name,
      user_ID: req.user.user_id,
    });
    if (_file) {
      await this.fetchDataService.basictools.deleteunusedcdn(
        [_file.media_path],
        req.user,
      );
      let _result = await this.fetchDataService.mediarepository.delete({
        media_name: body.img_name,
        user_ID: req.user.user_id,
      });

      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_questionIMG,
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_questionanswer_IMG,
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_questionproduct_avatar,
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_trash_medias,
      );

      return _result;
    } else {
      return null;
    }
  }
}

/* ----------------------------- delete temp user answer img ---------------------------- */
@Controller('deletetemporaryquestionuseranswerimg')
export class DeleteTempQuestionUserAnswerImageController {
  constructor(private fetchDataService: FetchDataService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async deletetemporaryquestionuseranswerimg(
    @Request() req: JwtAuthGuardReq,
    @Body() body: { img_name: string },
  ) {
    let _file = await this.fetchDataService.mediarepository.findOne({
      media_name: body.img_name,
      user_ID: req.user.user_id,
    });
    if (_file) {
      await this.fetchDataService.basictools.deleteunusedcdn(
        [_file.media_path],
        req.user,
      );
      let _result = await this.fetchDataService.mediarepository.delete({
        media_name: body.img_name,
        user_ID: req.user.user_id,
        media_category: config.QUESTION_USER_ANSWER_IMG_CAT,
      });

      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_useranswerIMG,
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_trash_medias,
      );

      return _result;
    } else {
      return null;
    }
  }
}

/* -------------------------------- New Prod -------------------------------- */
@Controller('createnewquestionproduct')
export class CreateNewQuestionProductController {
  constructor(private fetchDataService: FetchDataService) {}

  uploadschema = Joi.object({
    post_title: Joi.string().max(155).required(),
    post_category: Joi.array().required(),
    post_content: Joi.string().required(),
    answer_content: Joi.string().required(),
    questionimgs: Joi.array().required(),
    answerimgs: Joi.array().required(),
    question_avatar: Joi.string().required(),
  });

  @UseGuards(JwtAuthGuard)
  @Post()
  async createnewquestionproduct(
    @Request() req: JwtAuthGuardReq,
    @Body() body: AddNewQuestionProducPostBody,
  ) {
    if (this.uploadschema.validate(body).error) {
      throw new ForbiddenException({
        message: this.uploadschema.validate(body).error?.message,
      });
    }

    let _newPost: PostInput = {
      post_title: body.post_title,
      post_content: body.post_content,
      post_author: req.user.user_id,
      post_type: postTypes.question_product,
      post_category: body.post_category,
      post_status: 'publish',
    };
    let _postresult = await this.fetchDataService.postrepository.save(_newPost);

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_question_products,
    );

    let _newAnswer: QuestionMarketAnswerInput = {
      answer_content: body.answer_content,
      parent_ID: _postresult.ID,
      user_ID: req.user.user_id,
    };
    let _answerresult =
      await this.fetchDataService.questionmarketanswerrepository.save(
        _newAnswer,
      );

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionanswer,
    );

    let _avtupdate: UpdateFormUploadMediaInput = {
      parent_ID: _postresult.ID,
      media_status: 'publish',
    };
    await this.fetchDataService.mediarepository.update(
      {
        media_name: body.question_avatar,
      },
      _avtupdate,
    );

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionproduct_avatar,
    );

    for (let i = 0; i < body.questionimgs.length; i++) {
      var _updateinfo: UpdateFormUploadMediaInput = {
        parent_ID: _postresult.ID,
        media_status: 'publish',
      };
      await this.fetchDataService.mediarepository.update(
        {
          media_name: body.questionimgs[i],
        },
        _updateinfo,
      );
    }

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionIMG,
    );

    for (let i = 0; i < body.answerimgs.length; i++) {
      var _updateinfo: UpdateFormUploadMediaInput = {
        parent_ID: _answerresult.ID,
        media_status: 'publish',
      };
      await this.fetchDataService.mediarepository.update(
        {
          media_name: body.answerimgs[i],
        },
        _updateinfo,
      );
    }

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_trash_medias,
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionanswer_IMG,
    );

    return _postresult;
  }
}

/* -------------------------------- Edit Prod -------------------------------- */
@Controller('editprivatequestionproduct')
export class EditPrivateQuestionProductController {
  constructor(private fetchDataService: FetchDataService) {}

  uploadschema = Joi.object({
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async editprivatequestionproduct(
    @Request() req: JwtAuthGuardReq,
    @Body() body: EditQuestionProducPostBody,
  ) {
    if (this.uploadschema.validate(body).error) {
      throw new ForbiddenException({
        message: this.uploadschema.validate(body).error?.message,
      });
    }

    let _newPost: PostInput = {
      post_title: body.post_title,
      post_content: body.post_content,
      post_author: req.user.user_id,
      post_type: postTypes.question_product,
      post_category: body.post_category,
      post_status: 'publish',
    };
    let _postresult = await this.fetchDataService.postrepository.update(
      {
        ID: body.question_ID,
      },
      _newPost,
    );

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_question_products,
    );

    let _newAnswer: QuestionMarketAnswerInput = {
      answer_content: body.answer_content,
      parent_ID: body.question_ID,
      user_ID: req.user.user_id,
    };
    await this.fetchDataService.questionmarketanswerrepository.update(
      {
        ID: body.answer_ID,
      },
      _newAnswer,
    );

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionanswer,
    );

    await this.fetchDataService.mediarepository
      .createQueryBuilder()
      .update({
        media_status: 'trash',
      })
      .where('parent_ID = :q_ID::integer OR parent_ID = :a_ID::integer', {
        q_ID: body.question_ID,
        a_ID: body.answer_ID,
      })
      .execute();

    let _avtupdate: UpdateFormUploadMediaInput = {
      parent_ID: body.question_ID,
      media_status: 'publish',
    };
    await this.fetchDataService.mediarepository.update(
      {
        media_name: body.question_avatar,
      },
      _avtupdate,
    );

    for (let i = 0; i < body.questionimgs.length; i++) {
      var _updateinfo: UpdateFormUploadMediaInput = {
        parent_ID: body.question_ID,
        media_status: 'publish',
      };
      await this.fetchDataService.mediarepository.update(
        {
          media_name: body.questionimgs[i],
        },
        _updateinfo,
      );
    }

    for (let i = 0; i < body.answerimgs.length; i++) {
      var _updateinfo: UpdateFormUploadMediaInput = {
        parent_ID: body.answer_ID,
        media_status: 'publish',
      };
      await this.fetchDataService.mediarepository.update(
        {
          media_name: body.answerimgs[i],
        },
        _updateinfo,
      );
    }

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionIMG,
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionanswer_IMG,
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionproduct_avatar,
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_trash_medias,
    );

    /* -------------------------------------------------------------------------- */
    /*                           Update related reviews                           */
    /* -------------------------------------------------------------------------- */

    await this.fetchDataService.userAnswerReviewRepository.update(
      {
        question_ID: body.question_ID,
        review_fixed: false,
      },
      {
        review_updated: false,
      },
    );

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_userAnswerReview,
    );

    return _postresult;
  }
}

/* ------------------------------ update Review ----------------------------- */
@Controller('userrequiredreviewupdate')
export class UserRequiredReviewUpdateController {
  constructor(
    private _questionmarketService: QuestionMarketService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async userrequiredreviewupdate(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      question_ID: number;
    },
  ) {
    let _allQuestions =
      await this._questionmarketService.getall_questionproduct();
    let _foundQuestion = _allQuestions.find((y) => y.ID == body.question_ID);

    if (!_foundQuestion) {
      await this.fetchDataService.userAnswerReviewRepository.update(
        {
          answerer_ID: req.user.user_id,
          question_ID: body.question_ID,
        },
        {
          review_updated: true,
          review_fixed: true,
        },
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_userAnswerReview,
      );
      throw new ForbiddenException({
        message:
          '[Question Market Controller] Original question not found, the state of this review will be changed to updated and fixed',
      });
    }

    let _allOriginalAnswers =
      await this._questionmarketService.getallquestionanswer();
    let _foundOriginalAnswer = _allOriginalAnswers.find(
      (y) => y.parent_ID == body.question_ID,
    );

    if (!_foundOriginalAnswer) {
      await this.fetchDataService.userAnswerReviewRepository.update(
        {
          answerer_ID: req.user.user_id,
          question_ID: body.question_ID,
        },
        {
          review_updated: true,
          review_fixed: true,
        },
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_userAnswerReview,
      );
      throw new ForbiddenException({
        message:
          '[Question Market Controller] Original answer not found, the state of this review will be changed to updated and fixed',
      });
    }

    let _allQuestionAvatars =
      await this._questionmarketService.getallquestionproductavatar();
    let _allquestionIMGs =
      await this._questionmarketService.getallquestionIMG();
    let _allAnswerIMGs =
      await this._questionmarketService.getallquestionanswerIMG();

    let _result = await this._questionmarketService.updateAllPrivateReviewsInfo(
      req.user,
      body.question_ID,
      _foundQuestion,
      _foundOriginalAnswer,
      _allQuestionAvatars.find((y) => y.parent_ID == body.question_ID),
      _allquestionIMGs.filter((y) => y.parent_ID == body.question_ID),
      _allAnswerIMGs.filter((y) => y.parent_ID == _foundOriginalAnswer.ID),
    );

    return _result;
  }
}

/* --------------------------- Making review fixed -------------------------- */
@Controller('userrequiremakingreviewfixed')
export class UserRequireMakingReviewFixedController {
  constructor(private _questionmarketService: QuestionMarketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async userrequiremakingreviewfixed(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      question_ID: number;
    },
  ) {
    let _result = await this._questionmarketService.makeReviewFixed(
      body.question_ID,
      req.user,
    );

    return _result;
  }
}

/* --------------------------- Review skip update --------------------------- */
@Controller('userrequiremakingreviewupdated')
export class UserRequireSkipReviewUpdate {
  constructor(private _questionmarketService: QuestionMarketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async userrequiremakingreviewupdated(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      question_ID: number;
    },
  ) {
    let _result = await this._questionmarketService.makeReviewSkippingUpdate(
      body.question_ID,
      req.user,
    );

    return _result;
  }
}

/* ---------------------------- Prod Avatar File ---------------------------- */
@Controller('uploadquestionproductavatarbyimgfile')
export class UploadQuestionProductAvatarByImgFileController {
  constructor(
    private readonly localService: QuestionMarketService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadquestionproductavatarbyimgfile(
    @Request() req: any,
    @Query() query: FileUploadbyFormQuery,
  ): Observable<any> {
    let path_to_save = config.POST_IMG_PATH;
    if (query.file_size && query.file_size < 25000000) {
      return from(
        this.localService
          .getusertempmediafiles(req.user)
          .then(() => {
            return this.fetchDataService.basictools.formuploadIMG(
              req,
              query.file_obj_name,
              path_to_save,
              req.user,
            );
          })
          .then(async (result: any) => {
            let mediapayload: FormUploadMediaInput = {
              media_name: result.newFilename,
              media_type: result.format,
              media_path: result.newFilepath,
              user_ID: req.user.user_id,
              parent_ID: 0,
              media_category: config.QUESTION_PRODUCT_AVATAR_CAT,
              media_status: 'trash',
            };
            await this.fetchDataService.mediarepository.save(mediapayload);
            await this.fetchDataService.cacheManager.store.del(
              _cacheKey.all_trash_medias,
            );
            // Must return result from ConvertWebPandMove Fn
            return result;
          })
          .catch((error) => {
            throw error;
          }),
      );
    } else {
      throw new PayloadTooLargeException({ message: 'File is too large' });
    }
  }
}

/* ----------------------------- Prod Avatar Url ---------------------------- */
@Controller('uploadquestionproductavatarbyurl')
export class UploadQuestionProductAvatarByUrlController {
  constructor(
    private readonly basictools: BasicToolsService,
    @InjectRepository(MediaListEntity)
    private readonly mediarepository: Repository<MediaListEntity>,
    private readonly localService: QuestionMarketService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: AppCache,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadquestionproductavatarbyurl(
    @Request() req: any,
    @Body() body: { img_url: string },
  ): Observable<any> {
    return from(
      this.localService
        .getusertempmediafiles(req.user)
        .then(() => {
          return this.basictools.uploadimgbyurl(
            body.img_url,
            config.POST_IMG_PATH,
            req.user,
          );
        })
        .then(async (result: any) => {
          let mediapayload: FormUploadMediaInput = {
            media_name: result.newFilename,
            media_type: result.format,
            media_path: result.newFilepath,
            user_ID: req.user.user_id,
            parent_ID: 0,
            media_category: config.QUESTION_PRODUCT_AVATAR_CAT,
            media_status: 'trash',
          };
          await this.mediarepository.save(mediapayload);
          await this.cacheManager.store.del(_cacheKey.all_trash_medias);
          // Must return result from ConvertWebPandMove Fn
          return result;
        })
        .catch((error) => {
          throw error;
        }),
    );
  }
}

/* ----------------------------- answer img file ---------------------------- */
@Controller('uploadquestionmarketuseranswerimgbyimgfile')
export class UploadQuestionMarketUserAnswerImageByFileController {
  constructor(
    private basictools: BasicToolsService,
    @InjectRepository(MediaListEntity)
    private readonly mediarepository: Repository<MediaListEntity>,
    private readonly localService: QuestionMarketService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: AppCache,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadquestionmarketuseranswerimgbyimgfile(
    @Request() req: any,
    @Query() query: FileUploadbyFormQuery,
  ): Observable<any> {
    let path_to_save = config.POST_IMG_PATH;
    if (query.file_size && query.file_size < 25000000) {
      return from(
        this.localService
          .getusertempmediafiles(req.user)
          .then(() => {
            return this.basictools.formuploadIMG(
              req,
              query.file_obj_name,
              path_to_save,
              req.user,
            );
          })
          .then(async (result: any) => {
            let mediapayload: FormUploadMediaInput = {
              media_name: result.newFilename,
              media_type: result.format,
              media_path: result.newFilepath,
              user_ID: req.user.user_id,
              parent_ID: 0,
              media_category: config.QUESTION_USER_ANSWER_IMG_CAT,
              media_status: 'trash',
            };
            await this.mediarepository.save(mediapayload);
            await this.cacheManager.store.del(_cacheKey.all_trash_medias);
            // Must return result from ConvertWebPandMove Fn
            return result;
          })
          .catch((error) => {
            throw error;
          }),
      );
    } else {
      throw new PayloadTooLargeException({ message: 'File is too large' });
    }
  }
}

/* ----------------------------- answer img url ----------------------------- */
@Controller('uploadquestionmarketuseranswerimgbyurl')
export class UploadQuestionMarketUserAnswerImageByUrlController {
  constructor(
    private fetchDataService: FetchDataService,
    private readonly localService: QuestionMarketService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  uploadquestionmarketuseranswerimgbyurl(
    @Request() req: any,
    @Body() body: { img_url: string },
  ): Observable<any> {
    return from(
      this.localService
        .getusertempmediafiles(req.user)
        .then(() => {
          return this.fetchDataService.basictools.uploadimgbyurl(
            body.img_url,
            config.POST_IMG_PATH,
            req.user,
          );
        })
        .then(async (result: any) => {
          let mediapayload: FormUploadMediaInput = {
            media_name: result.newFilename,
            media_type: result.format,
            media_path: result.newFilepath,
            user_ID: req.user.user_id,
            parent_ID: 0,
            media_category: config.QUESTION_USER_ANSWER_IMG_CAT,
            media_status: 'trash',
          };
          await this.fetchDataService.mediarepository.save(mediapayload);
          await this.fetchDataService.cacheManager.store.del(
            _cacheKey.all_trash_medias,
          );
          // Must return result from ConvertWebPandMove Fn
          return result;
        })
        .catch((error) => {
          throw error;
        }),
    );
  }
}

/* -------------------------- user question answer -------------------------- */
@Controller('usersubmitquestionanswer')
export class UsersubmitQuestionAnswerController {
  constructor(private questionMarketService: QuestionMarketService) {}

  uploadschema = Joi.object({
    answer_content: Joi.string().required(),
    answer_imgs: Joi.array().required(),
    question_ID: Joi.number().required(),
  });

  @UseGuards(JwtAuthGuard)
  @Post()
  async usersubmitquestionanswer(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      answer_content: string;
      answer_imgs: string[];
      question_ID: number;
    },
  ) {
    let _checker = this.uploadschema.validate(body);
    if (_checker.error) {
      throw new ForbiddenException({ message: _checker.error.message });
    }

    return this.questionMarketService.userSubmitNewQuestionAnswer(
      body.answer_content,
      body.answer_imgs,
      body.question_ID,
      req.user.user_id,
      true,
    );
  }
}

/* -------------------- Return original answer for Review ------------------- */
@Controller('getreviewquestionanswer')
export class GetReviewQuestionAnswerController {
  constructor(
    private questionMarketService: QuestionMarketService,
    private userService: UserAuthenticationService,
    private jwt: JwtService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async getreviewquestionanswer(@Body() body: { token: string }) {
    try {
      let _decode: {
        question_ID: number;
        notification_ID: number;
        user_answer_ID: number;
      } = this.jwt.verify(body.token);

      if (!_decode) {
        throw new BadRequestException({
          message:
            '[Question Market Controller] Notification token is not valid',
        });
      }

      let _allNotifications = await this.fetchDataService.getallusernotifications();

      let _foundNotification = _allNotifications.find(
        (y) => y.ID == _decode.notification_ID,
      );

      if (!_foundNotification) {
        throw new ForbiddenException({
          message: '[Question Market Controller] Notification item not found',
        });
      }

      let allQuestions =
        await this.questionMarketService.getall_questionproduct();
      let foundQuestion = allQuestions.find((y) => y.ID == _decode.question_ID);

      if (!foundQuestion) {
        throw new ForbiddenException({
          message: '[Question Market Controller] Question item not found',
        });
      }

      let allUserAnswer =
        await this.questionMarketService.getalluseranswerinmarket();
      let _foundUserAnswer = allUserAnswer.find(
        (item) => item.ID == _decode.user_answer_ID,
      );

      if (!_foundUserAnswer) {
        await this.fetchDataService.userNotificationRepository.delete({
          ID: _decode.notification_ID,
        });
        await this.fetchDataService.cacheManager.store.del(
          _cacheKey.all_usernotifications,
        );
        throw new ForbiddenException({
          message:
            '[Question Market Controller] User answer item not found, this notification is removed',
        });
      }

      if (foundQuestion.post_status != 'publish') {
        let _childAnswers = [
          ...allUserAnswer.filter((y) => y.parent_ID == foundQuestion.ID),
        ];
        _childAnswers.forEach(async (single) => {
          if (single.is_reviewed == false) {
            await this.fetchDataService.questionmarketuseranswerRepository.update(
              {
                ID: single.ID,
              },
              {
                is_reviewed: true,
              },
            );
            let _newMsg: UserPrivateMessageInput = {
              message_content: `Your answer #${single.ID} will not be reviewed anymore because the question has been reported as invalid`,
              sender_email: 'admin@azubiviet.com',
              user_ID: single.user_ID,
              sender_ID: 0,
            };
            await this.fetchDataService.userPrivateMessageRepository.save(
              _newMsg,
            );
          }
        });
        await this.fetchDataService.cacheManager.store.del(
          _cacheKey.all_userPrivateMessage,
        );
        await this.fetchDataService.cacheManager.store.del(
          _cacheKey.all_userAnswerinMarket,
        );
        await this.fetchDataService.userNotificationRepository.delete({
          ID: _decode.notification_ID,
        });
        await this.fetchDataService.cacheManager.store.del(
          _cacheKey.all_usernotifications,
        );

        throw new BadRequestException({
          message:
            "[Question Market Controller] The question of this answer has been reported as invalid, you don't have to review this answer anymore",
        });
      }

      let _allAnswers = await this.questionMarketService.getallquestionanswer();

      let answer = {
        ..._allAnswers.find((y) => y.parent_ID == _decode.question_ID),
      };

      let _cacheMedia =
        await this.questionMarketService.getallquestionanswerIMG();

      let _foundMedia = _cacheMedia.filter((y) => y.parent_ID == answer.ID);

      answer.answer_imgs = _foundMedia;

      return [answer, _decode.notification_ID];
    } catch (error) {
      throw new BadRequestException({ message: error.message });
    }
  }
}

/* ------------------------ User submit answer review ----------------------- */
@Controller('usersubmitanswerreview')
export class UserSubmitAnswerReviewController {
  constructor(
    private _questionmarketService: QuestionMarketService,
    private _userauthService: UserAuthenticationService,
    private fetchDataService: FetchDataService,
  ) {}

  uploadschema = Joi.object({
    correctness: Joi.boolean().required(),
    review_content: Joi.string(),
    notification_ID: Joi.number().required(),
  });

  @UseGuards(JwtAuthGuard)
  @Post()
  async usersubmitanswerreview(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      correctness: boolean;
      review_content: string;
      notification_ID: number;
    },
  ) {
    let _checker = this.uploadschema.validate(body);
    if (_checker.error) {
      throw new ForbiddenException({ message: _checker.error.message });
    }

    let _selectedUsers: number[] = [];

    let _allNotis = await this.fetchDataService.getallusernotifications();
    let _foundNotis = _allNotis.find((item) => item.ID == body.notification_ID);

    if (!_foundNotis) {
      throw new ForbiddenException({
        message:
          "[Question Market Controller] This answer is already reviewed by others, you don't have to review it anymore",
      });
    }

    if (!_foundNotis.user_IDs.includes(req.user.user_id)) {
      throw new ForbiddenException({
        message:
          "[Question Market Controller] You don't have the right to review this answer, please contact admin for more information",
      });
    }

    _selectedUsers = _selectedUsers.concat(_foundNotis.user_IDs);

    let _allUserAnswer =
      await this._questionmarketService.getalluseranswerinmarket();
    let _UserAnswerItem = _allUserAnswer.find(
      (y) => y.ID == _foundNotis.data.user_answer_ID,
    );

    if (!_UserAnswerItem || _UserAnswerItem.is_reported == true) {
      await this.fetchDataService.userNotificationRepository.delete({
        ID: body.notification_ID,
      });
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_usernotifications,
      );
      throw new ForbiddenException({
        message:
          '[Question Market Controller] User answer not found, this notification will be deleted right away',
      });
    }

    if (!_UserAnswerItem.waiting_reviewers.includes(req.user.user_id)) {
      throw new ForbiddenException({
        message:
          "[Question Market Controller] You don't have the right to review this answer, please contact admin for more information",
      });
    }

    let _allUsers = await this.fetchDataService.getallusers();
    let _answerer = _allUsers.find((y) => y.ID == _UserAnswerItem.user_ID);

    if (!_answerer) {
      await this.fetchDataService.userNotificationRepository.delete({
        ID: body.notification_ID,
      });
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_usernotifications,
      );
      throw new ForbiddenException({
        message:
          '[Question Market Controller] The answerer not found, this notification will be deleted right away',
      });
    }

    let _allQuestion =
      await this._questionmarketService.getall_questionproduct();
    let _targetQuestion = {
      ..._allQuestion.find((y) => y.ID == _foundNotis.data.question_ID),
    };

    if (!_allQuestion.find((y) => y.ID == _foundNotis.data.question_ID)) {
      await this.fetchDataService.userNotificationRepository.delete({
        ID: body.notification_ID,
      });
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_usernotifications,
      );
      throw new ForbiddenException({
        message:
          '[Question Market Controller] The original question not found, this notification will be deleted right away',
      });
    }

    let _allOriginalAnswers =
      await this._questionmarketService.getallquestionanswer();
    let _foundOriginalAnswer = _allOriginalAnswers.find(
      (y) => y.parent_ID == _targetQuestion.ID,
    );

    if (!_foundOriginalAnswer) {
      await this.fetchDataService.userNotificationRepository.delete({
        ID: body.notification_ID,
      });
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_usernotifications,
      );
      throw new ForbiddenException({
        message:
          '[Question Market Controller] The original answer not found, this notification will be deleted right away',
      });
    }

    if (body.correctness == true) {
      let _singleexp = _targetQuestion.question_experience;
      let _newExp = _answerer.user_experience + _singleexp;
      await this.fetchDataService.userRepository.update(
        {
          ID: _answerer.ID,
        },
        {
          user_experience: _newExp,
        },
      );
      await this.fetchDataService.cacheManager.store.del(_cacheKey.all_users);
    }

    let _allQuestionAvatars =
      await this._questionmarketService.getallquestionproductavatar();
    let _foundQuestionAvatar = _allQuestionAvatars.find(
      (y) => y.parent_ID == _targetQuestion.ID,
    );

    let _allQuestionIMGs =
      await this._questionmarketService.getallquestionIMG();
    let _foundQuestionIMGs = _allQuestionIMGs.filter(
      (y) => y.parent_ID == _targetQuestion.ID,
    );
    let _allOriginalAnswerIMGs =
      await this._questionmarketService.getallquestionanswerIMG();
    let _foundOriginalAnswerIMGs = _allOriginalAnswerIMGs.filter(
      (y) => y.parent_ID == _foundOriginalAnswer.ID,
    );

    _targetQuestion.question_imgs = _foundQuestionIMGs;
    _targetQuestion.question_avatar = _foundQuestionAvatar;
    _foundOriginalAnswer.answer_imgs = _foundOriginalAnswerIMGs;

    let _reviewItem: UserAnswerReviewInput = {
      correctness: body.correctness,
      review_content: body.review_content,
      answerer_ID: _answerer.ID,
      user_answer_ID: _UserAnswerItem.ID,
      review_author: req.user.user_id,
      question_ID: _targetQuestion.ID,
      question_info: _targetQuestion,
      original_answer_ID: _foundOriginalAnswer.ID,
      original_answer_info: _foundOriginalAnswer,
    };

    let _result = await this.fetchDataService.userAnswerReviewRepository.save(
      _reviewItem,
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_userAnswerReview,
    );
    await this.fetchDataService.userNotificationRepository.delete({
      ID: body.notification_ID,
    });
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_usernotifications,
    );

    let _reviewerMoney = _allUsers.find(
      (y) => y.ID == req.user.user_id,
    )!.user_abicoin;
    let _increasedmoney = 1;
    await this.fetchDataService.userRepository.update(
      {
        ID: req.user.user_id,
      },
      {
        user_abicoin: _reviewerMoney + _increasedmoney,
      },
    );
    await this.fetchDataService.cacheManager.store.del(_cacheKey.all_users);

    await this.fetchDataService.questionmarketuseranswerRepository.update(
      {
        ID: _UserAnswerItem.ID,
      },
      {
        review_ID: _result.ID,
        is_reviewed: true,
      },
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_userAnswerinMarket,
    );

    let _answererNoti: UserNotificationInput = {
      type: UserNotification_Types.answer_isReviewed,
      data: {
        review_ID: _result.ID,
      },
      secret: {},
      user_IDs: [_answerer.ID],
      deletion_allowed: [],
    };
    await this.fetchDataService.userNotificationRepository.save(_answererNoti);
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_usernotifications,
    );

    _selectedUsers.push(_answerer.ID);

    return {
      selectedUsers: _selectedUsers,
      reviewer_increased_money: _increasedmoney,
    };
  }
}

/* --------------------------- User confirm review -------------------------- */
@Controller('userconfirmreview')
export class UserConfirmReviewController {
  constructor(
    private _questionmarketService: QuestionMarketService,
    private _userauthService: UserAuthenticationService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async userconfirmreview(
    @Body()
    body: {
      review_ID: number;
      isLiked: boolean;
      notification_ID: number;
    },
  ) {
    let allUsers = await this.fetchDataService.getallusers();
    let allanswerReviews =
      await this._questionmarketService.getAllUserAnswerReviews();

    let foundReview = allanswerReviews.find((y) => y.ID == body.review_ID);

    let foundReviewer = allUsers.find((y) => y.ID == foundReview.review_author);

    if (!foundReview || !foundReviewer) {
      await this.fetchDataService.userAnswerReviewRepository.update(
        {
          ID: body.review_ID,
        },
        {
          review_confirmed: true,
        },
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_userAnswerReview,
      );
      await this.fetchDataService.userNotificationRepository.delete({
        ID: body.notification_ID,
      });
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_usernotifications,
      );
      throw new BadRequestException({
        message:
          "[Question Market Controller] Review or reviewer doesn't exist, notification is deleted",
      });
    }

    if (body.isLiked == true) {
      let _newMoney = foundReviewer.user_abicoin + 1;

      await this.fetchDataService.userRepository.update(
        {
          ID: foundReviewer.ID,
        },
        {
          user_abicoin: _newMoney,
        },
      );

      await this.fetchDataService.cacheManager.store.del(_cacheKey.all_users);

      let _newNoti: UserNotificationInput = {
        type: UserNotification_Types.review_isLiked,
        data: {
          coin_received: 1,
          current_coin: _newMoney,
        },
        secret: {},
        user_IDs: [foundReviewer.ID],
        deletion_allowed: [foundReviewer.ID],
      };

      await this.fetchDataService.userNotificationRepository.save(_newNoti);
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_usernotifications,
      );

      await this.fetchDataService.userAnswerReviewRepository.update(
        {
          ID: body.review_ID,
        },
        {
          review_confirmed: true,
          review_isLiked: true,
        },
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_userAnswerReview,
      );

      await this.fetchDataService.userNotificationRepository.delete({
        ID: body.notification_ID,
      });
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_usernotifications,
      );

      return foundReviewer.ID;
    } else {
      await this.fetchDataService.userAnswerReviewRepository.update(
        {
          ID: body.review_ID,
        },
        {
          review_confirmed: true,
        },
      );
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_userAnswerReview,
      );

      await this.fetchDataService.userNotificationRepository.delete({
        ID: body.notification_ID,
      });
      await this.fetchDataService.cacheManager.store.del(
        _cacheKey.all_usernotifications,
      );

      return null;
    }
  }
}

@Controller('useranswer_reportedReviewerRequireOriginalAnswer')
export class useranswer_reportedReviewerRequireOriginalAnswerController {
  constructor(
    private _questionmarketService: QuestionMarketService,
    private fetchDataService: FetchDataService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async useranswer_reportedReviewerRequireOriginalAnswer(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      user_answer_ID: number;
    },
  ) {
    let allReportLogs = await this.fetchDataService.getallReportLogger();
    let foundReportLog = allReportLogs.find(
      (y) =>
        y.report_type == ReportLoggerTypes.questionMarketUserAnswer &&
        y.report_sender == req.user.user_id &&
        y.parent_ID == body.user_answer_ID,
    );

    if (!foundReportLog) {
      throw new ForbiddenException({
        message:
          'You are not allowed to see the original answer of this report',
      });
    }

    let allUserAnswer =
      await this._questionmarketService.getalluseranswerinmarket();
    let foundUserAnswer = allUserAnswer.find(
      (y) => y.ID == body.user_answer_ID,
    );

    if (!foundUserAnswer) {
      throw new ForbiddenException({ message: "User's answer not found" });
    }

    let allQuestionAnswer =
      await this._questionmarketService.getallquestionanswer();
    let foundAnswer = allQuestionAnswer.find(
      (y) => y.parent_ID == foundUserAnswer.parent_ID,
    );

    if (!foundAnswer) {
      throw new ForbiddenException({ message: 'Original answer not found' });
    }

    let allQuestionAnswerIMGs =
      await this._questionmarketService.getallquestionanswerIMG();
    foundAnswer.answer_imgs = allQuestionAnswerIMGs.filter(
      (y) =>
        y.media_category == config.QUESTION_PRODUCT_ANSWER_IMG_CAT &&
        y.parent_ID == foundAnswer.ID,
    );

    return foundAnswer;
  }
}

@Controller('reportedquestion_authorrequiredata')
export class ReportedQuestionAuthorRequiredDataController {
  constructor(private _questionmarketService: QuestionMarketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async reportedquestion_authorrequiredata(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      question_ID: number;
    },
  ) {
    let allQuestions =
      await this._questionmarketService.getall_questionproduct();
    let foundQuestion = allQuestions.find(
      (y) => y.ID == body.question_ID && y.post_author == req.user.user_id,
    );

    if (!foundQuestion) {
      throw new BadRequestException({
        message:
          "[Question Market Controller] You don't have access to this question",
      });
    }

    let Avatar = {
      ...[
        ...(await this._questionmarketService.getallquestionproductavatar()),
      ].find((y) => y.parent_ID == foundQuestion.ID),
    };

    let imgs = [
      ...(await this._questionmarketService.getallquestionIMG()),
    ].filter((y) => y.parent_ID == foundQuestion.ID);

    foundQuestion.question_avatar = Avatar;
    foundQuestion.question_imgs = imgs;

    return foundQuestion;
  }
}

@Controller('sendprivatemessagetoquestionauthor')
export class SendPrivateMessageToQuestionAuthorController {
  constructor(
    private _questionmarketService: QuestionMarketService,
    private fetchDataService: FetchDataService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendprivatemessagetoquestionauthor(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      question_ID: number;
      message_content: string;
    },
  ) {
    let allQuestions =
      await this._questionmarketService.getall_questionproduct();
    let foundQuestion = allQuestions.find((y) => y.ID == body.question_ID);

    if (!foundQuestion || foundQuestion.post_status != 'publish') {
      throw new ForbiddenException({
        message: "Question doesn't exist anymore",
      });
    }

    let _newMsg: UserPrivateMessageInput = {
      message_content: body.message_content,
      sender_email: req.user.user_email,
      sender_ID: req.user.user_id,
      user_ID: foundQuestion.post_author,
    };

    await this.fetchDataService.sendprivateMsgtoUser(
      foundQuestion.post_author,
      req.user.user_id,
      _newMsg,
    );

    return {
      selectedUsers: [foundQuestion.post_author],
    };
  }
}

@Controller('userconfirmclearanswerreport')
export class UserConfirmClearAnswerReportController {
  constructor(private _questionmarketService: QuestionMarketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async userconfirmclearanswerreport(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      user_answer_ID: number;
    },
  ) {
    return await this._questionmarketService.userconfirmClearAnswerReport(
      req.user,
      body.user_answer_ID,
    );
  }
}

@Controller('userreportexpiredanswer')
export class UserReportExpiredAnswerController {
  constructor(
    private _questionmarketService: QuestionMarketService,
    private _userauthService: UserAuthenticationService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async userreportexpiredanswer(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      user_answer_ID: number;
    },
  ) {
    let allUserAnswers =
      await this._questionmarketService.getalluseranswerinmarket();
    let foundAnswer = allUserAnswers.find(
      (y) => y.ID == body.user_answer_ID && y.author_isBlocked == false,
    );

    if (!foundAnswer) {
      throw new ForbiddenException({
        message: `Answer #${body.user_answer_ID} doesn't exist`,
      });
    }

    if (foundAnswer.is_reported || foundAnswer.is_reviewed) {
      throw new ForbiddenException({
        message: `Your answer is already reported or reviewed, please check the status of this answer again by refreshing page.`,
      });
    }

    let now = new Date().getTime();
    let answerDate = new Date(foundAnswer.answer_date).getTime();

    if (now - answerDate <= 5 * 86400 * 1000) {
      throw new ForbiddenException({
        message: `This report action is not allowed, it is now not longer than 5 days since the time this answer was sent`,
      });
    }

    let allUsers = await this.fetchDataService.getallusers();
    let foundUser = allUsers.find((y) => y.ID == req.user.user_id);

    if (!foundUser) {
      throw new ForbiddenException({ message: `User information not found` });
    }

    let newCoin = foundUser.user_abicoin + 1;

    await this.fetchDataService.userRepository.update(
      {
        ID: req.user.user_id,
      },
      {
        user_abicoin: newCoin,
      },
    );
    await this.fetchDataService.cacheManager.store.del(_cacheKey.all_users);

    foundAnswer.waiting_reviewers.forEach(async (y) => {
      await this.fetchDataService.punishUserByPoint(1, y);
    });

    await this._questionmarketService.resetReporteduserAnswer(foundAnswer.ID);

    let _repeatAnswer =
      await this._questionmarketService.userSubmitNewQuestionAnswer(
        '',
        [],
        foundAnswer.parent_ID,
        foundAnswer.user_ID,
        false,
        foundAnswer.ID,
      );

    let _newReportLogger: ReportLoggerInput = {
      report_notes: 'Report expired answer',
      report_sender: req.user.user_id,
      report_controllers: [],
      parent_ID: foundAnswer.ID,
      report_type: ReportLoggerTypes.useranswer_expired,
      finished: true,
    };

    await this.fetchDataService.reportLoggerRepository.save(_newReportLogger);
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_ReportLogger,
    );

    return {
      selectedUsers: _repeatAnswer,
    };
  }
}

@Controller('userdeletesinglequestionproduct')
export class UserDeleteSingleQuestionProductController {
  constructor(
    private _questionmarketService: QuestionMarketService,
    private _userauthService: UserAuthenticationService,
    private fetchDataService: FetchDataService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async userdeletesinglequestionproduct(
    @Request() req: JwtAuthGuardReq,
    @Body()
    body: {
      question_ID: number;
    },
  ) {
    let allQuestions =
      await this._questionmarketService.getall_questionproduct();
    let foundQuestion = allQuestions.find(
      (y) => y.post_author == req.user.user_id && y.ID == body.question_ID,
    );

    if (!foundQuestion) {
      throw new BadRequestException({
        message: '[Question Market Controller] Question not found',
      });
    }

    await this.fetchDataService.postrepository.update(
      {
        ID: body.question_ID,
      },
      {
        post_status: 'trash',
      },
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_question_products,
    );

    let allQuestionAnswer =
      await this._questionmarketService.getalluseranswerinmarket();
    let foundAnswer = allQuestionAnswer.find(
      (y) => y.parent_ID == body.question_ID,
    );

    let allMedias = await this.fetchDataService.getall_Medias();

    let foundMedias = [
      ...allMedias.filter(
        (y) =>
          y.parent_ID == body.question_ID &&
          [
            config.QUESTION_PRODUCT_AVATAR_CAT,
            config.QUESTION_PRODUCT_IMG_CAT,
          ].includes(y.media_category),
      ),
    ];

    if (foundAnswer) {
      let _answerMedias = [
        ...allMedias.filter(
          (y) =>
            y.parent_ID == foundAnswer.ID &&
            [config.QUESTION_PRODUCT_ANSWER_IMG_CAT].includes(y.media_category),
        ),
      ];

      foundMedias = foundMedias.concat(_answerMedias);
    }

    foundMedias.forEach(async (y) => {
      await this.fetchDataService.mediarepository.update(
        {
          ID: y.ID,
        },
        {
          media_status: 'draft',
        },
      );
    });

    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionproduct_avatar,
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionIMG,
    );
    await this.fetchDataService.cacheManager.store.del(
      _cacheKey.all_questionanswer_IMG,
    );

    return;
  }
}
