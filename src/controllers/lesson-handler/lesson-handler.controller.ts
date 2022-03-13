import { Body, CACHE_MANAGER, Controller, ForbiddenException, Inject, PayloadTooLargeException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { FormUploadMediaInput, MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity, postTypes } from 'src/models/post/post.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import { JwtAuthGuard, JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
import { LessonHandlerService } from './lesson-handler.service';

import Joi = require('joi');
import { EditSingleLessonBody, PostInput, PublishLessonBody } from 'src/models/post/post.interface';
import { AddCategoryInput, LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { AppCache, _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';

let config = SystemDefaultConfig;

@Controller('lesson-handler')
export class LessonHandlerController { }

@Controller('addlessoncategory')
export class AddLessonCategoryController {
    constructor(
        @InjectRepository(LessonCategoryEntity)
        private readonly LessonCategoryRepository: Repository<LessonCategoryEntity>,
        @Inject(CACHE_MANAGER) private readonly CacheManager: AppCache
    ) { }

    uploadschema = Joi.object({
        category_name: Joi.string().required(),
        area_ID: Joi.number().min(1).required()
    });

    @UseGuards(JwtAuthGuard)
    @Post()
    async addlessoncategory(@Request() req: JwtAuthGuardReq, @Body() body: AddCategoryInput) {
        if (req.user.user_role == 'admin') {
            if (this.uploadschema.validate(body).error) {
                throw new ForbiddenException({ message: this.uploadschema.validate(body).error?.message });
            }
            let _result = await this.LessonCategoryRepository.save(<LessonCategoryEntity>{
                category_name: body.category_name,
                area_ID: body.area_ID
            })

            await this.CacheManager.store.del(_cacheKey.lessoncategory_all)

            return _result

        } else {
            return null;
        }
    }
}

@Controller('uploadlessonimage')
export class UploadLessonImageController {
    constructor(
        private basictools: BasicToolsService,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) private readonly CacheManager: AppCache
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    uploadlessonimage(@Request() req: any, @Query() query: FileUploadbyFormQuery): Observable<any> {
        let path_to_save = config.POST_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return from(
                this.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user).then(
                    async (result: any) => {
                        let mediapayload: FormUploadMediaInput = {
                            media_name: result.newFilename,
                            media_type: result.format,
                            media_path: result.newFilepath,
                            user_ID: req.user.user_id,
                            parent_ID: 0,
                            media_category: config.LESSON_IMG_CAT,
                            media_status: 'trash'
                        }
                        await this.mediarepository.save(mediapayload);
                        await this.CacheManager.store.del(_cacheKey.all_trash_medias)
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

@Controller('publishnewlesson')
export class PublishNewLessonController {
    constructor(
        private _lessonservice: LessonHandlerService
    ) { }

    uploadschema = Joi.object({
        post_title: Joi.string().max(255).required(),
        post_content: Joi.string().required(),
        post_category: Joi.array().required(),
        post_imgarr: Joi.array().required(),
        post_avatar: Joi.string().required()
    })

    @UseGuards(JwtAuthGuard)
    @Post()
    publishnewlesson(@Request() req: JwtAuthGuardReq, @Body() body: PublishLessonBody): Observable<any> {

        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new ForbiddenException({ message: _checker.error?.message });
        }

        let _lesson: PostInput = {
            post_title: body.post_title,
            post_content: body.post_content,
            post_author: req.user.user_id,
            post_type: postTypes.lesson,
            post_category: body.post_category,
            post_status: 'publish'
        }
        if (req.user.user_role === 'admin') {
            return from(this._lessonservice.publishlesson(_lesson, body.post_imgarr, body.post_avatar, req.user));
        } else { return null; }
    }
}

@Controller('editsinglelesson')
export class EditSingleLessonController {
    constructor(
        private _lessonservice: LessonHandlerService
    ) { }

    uploadschema = Joi.object({
        ID: Joi.number().required(),
        post_title: Joi.string().max(255).required(),
        post_content: Joi.string().required(),
        post_category: Joi.array().required(),
        post_imgarr: Joi.array().required(),
        post_avatar: Joi.string().required()
    })

    @UseGuards(JwtAuthGuard)
    @Post()
    editsinglelesson(@Request() req: JwtAuthGuardReq, @Body() body: EditSingleLessonBody): Observable<any> {

        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new ForbiddenException({ message: _checker.error?.message });
        }

        let _lesson: PostInput = {
            post_title: body.post_title,
            post_content: body.post_content,
            post_author: req.user.user_id,
            post_type: postTypes.lesson,
            post_category: body.post_category,
            post_status: 'publish'
        }

        if (req.user.user_role === 'admin') {
            return from(this._lessonservice.editlesson(body.ID, _lesson, body.post_imgarr, body.post_avatar, req.user));
        } else {
            return null
        }

    }
}

@Controller('uploadlessonavatarbyimgfile')
export class UploadLessonAvatarByimgFileController {
    constructor(
        private basictools: BasicToolsService,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) private readonly CacheManager: AppCache
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    uploadlessonavatarbyimgfile(@Request() req: any, @Query() query: FileUploadbyFormQuery): Observable<any> {
        let path_to_save = config.POST_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return from(
                this.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user).then(
                    async (result: any) => {
                        let mediapayload: FormUploadMediaInput = {
                            media_name: result.newFilename,
                            media_type: result.format,
                            media_path: result.newFilepath,
                            user_ID: req.user.user_id,
                            parent_ID: 0,
                            media_category: config.LESSON_AVT_CAT,
                            media_status: 'trash'
                        }
                        await this.mediarepository.save(mediapayload);
                        await this.CacheManager.store.del(_cacheKey.all_trash_medias)
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

@Controller('uploadlessonavatarbyurl')
export class UploadLessonAvatarByUrlController {

    constructor(
        private readonly basictools: BasicToolsService,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) private readonly CacheManager: AppCache
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    uploadlessonavatarbyurl(@Request() req: any, @Body() body: { img_url: string }): Observable<any> {
        return from(
            this.basictools.uploadimgbyurl(
                body.img_url,
                config.POST_IMG_PATH,
                req.user
            ).then(
                async (result: any) => {
                    let mediapayload: FormUploadMediaInput = {
                        media_name: result.newFilename,
                        media_type: result.format,
                        media_path: result.newFilepath,
                        user_ID: req.user.user_id,
                        parent_ID: 0,
                        media_category: config.LESSON_AVT_CAT,
                        media_status: 'trash'
                    }
                    await this.mediarepository.save(mediapayload);
                    await this.CacheManager.store.del(_cacheKey.all_trash_medias)

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

@Controller('deletesinglelesson')
export class DeletesinglelessonController {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postrepository: Repository<PostEntity>,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) private readonly CacheManager: AppCache
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async deletesinglelesson(@Request() req: any, @Body() body: { post_ID: number }) {
        await this.mediarepository.update(
            {
                parent_ID: body.post_ID
            },
            {
                media_status: "trash"
            }
        )
        await this.CacheManager.store.del(_cacheKey.all_trash_medias)
        let _result = await this.postrepository.delete({
            ID: body.post_ID
        })
        await this.CacheManager.store.del(_cacheKey.public_lessons)
        return _result
    }
}
