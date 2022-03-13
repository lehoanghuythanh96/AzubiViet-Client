import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppCache, _cacheKey } from 'src/models/cacheKeys/cacheKeys.entity';
import { SystemDefaultConfig } from 'src/models/config/nestconfig.interface';
import { LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { FormUploadMediaInput, MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity, postTypes } from 'src/models/post/post.entity';
import { PostInput } from 'src/models/post/post.interface';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { In, Repository } from 'typeorm';

let config = SystemDefaultConfig;

@Injectable()
export class LessonHandlerService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postrepository: Repository<PostEntity>,
        @InjectRepository(MediaListEntity)
        private readonly mediarepository: Repository<MediaListEntity>,
        private basictools: BasicToolsService,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache,
        @InjectRepository(LessonCategoryEntity)
        private readonly lessoncategoryrepository: Repository<LessonCategoryEntity>,
    ) { }

    async getallpubliclesson() {
        let _cache: PostEntity[] = await this.cacheManager.store.get(_cacheKey.public_lessons);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.postrepository.find({
            post_type: postTypes.lesson,
            post_status: "publish"
        })

        await this.cacheManager.store.set(_cacheKey.public_lessons, _data)

        return [..._data];
    }

    async getall_lessoncategory() {
        let _cache: LessonCategoryEntity[] = await this.cacheManager.store.get(_cacheKey.lessoncategory_all);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.lessoncategoryrepository.find();
        await this.cacheManager.store.set(_cacheKey.lessoncategory_all, _data)
        return [..._data];
    }

    async getalllessonavatar() {

        let _cache: MediaListEntity[] = await this.cacheManager.store.get(_cacheKey.all_lessonavatar);

        if (_cache) {
            return [..._cache]
        }

        let _data = await this.mediarepository.find({
            media_category: config.LESSON_AVT_CAT
        });
        await this.cacheManager.store.set(_cacheKey.all_lessonavatar, _data)
        return [..._data];

    }

    async publishlesson(newlesson: PostInput, imgarr: Array<LessonImgArr>, lesson_avatar: string, user: userJWTpayload) {
        let _add = await this.postrepository.save(newlesson);
        if (_add.ID) {
            await this.mediarepository.update(
                { media_name: lesson_avatar },
                {
                    parent_ID: _add.ID,
                    media_status: "publish"
                }
            )
            for (let i = 0; i < imgarr.length; i++) {
                if (imgarr[i].isOrigin == true) {
                    let extension = imgarr[i].name.split('.').pop();
                    let _tempimg = await this.mediarepository.findOne({
                        media_name: imgarr[i].name
                    })
                    newlesson.post_content = newlesson.post_content.replace(imgarr[i].link, _tempimg.media_path)
                    await this.mediarepository.update(
                        { media_name: imgarr[i].name },
                        {
                            media_type: extension,
                            parent_ID: _add.ID,
                            media_status: "publish"
                        }
                    )
                } else {
                    await this.basictools.uploadimgbyurl(
                        imgarr[i].link,
                        config.POST_IMG_PATH,
                        user
                    ).then(
                        async (result: any) => {
                            let mediapayload: FormUploadMediaInput = {
                                media_name: result.newFilename,
                                media_type: result.format,
                                media_path: result.newFilepath,
                                user_ID: user.user_id,
                                parent_ID: _add.ID,
                                media_category: config.LESSON_IMG_CAT,
                                media_status: 'publish'
                            }
                            await this.mediarepository.save(mediapayload);
                            newlesson.post_content = newlesson.post_content.replace(imgarr[i].link, mediapayload.media_path)
                            // Must return result from ConvertWebPandMove Fn
                            return result;
                        }
                    ).catch(
                        (error) => {
                            throw error;
                        }
                    )
                }
            }
            await this.cacheManager.store.del(_cacheKey.all_trash_medias)
            await this.cacheManager.store.del(_cacheKey.all_lessonavatar)
            let _result = await this.postrepository.update(
                {
                    ID: _add.ID
                },
                {
                    post_content: newlesson.post_content
                }
            );
            await this.cacheManager.store.del(_cacheKey.public_lessons)

            return _result;
        } else {
            return null;
        }
    }

    async editlesson(ID: number, newlesson: PostInput, imgarr: Array<LessonImgArr>, lesson_avatar: string, user: userJWTpayload) {
        await this.mediarepository.update(
            {
                parent_ID: ID,
                media_category: In([config.LESSON_IMG_CAT, config.LESSON_AVT_CAT])
            },
            {
                media_status: "trash"
            }
        )
        await this.mediarepository.update(
            {
                media_name: lesson_avatar
            },
            {
                parent_ID: ID,
                media_status: "publish"
            }
        )

        for (let i = 0; i < imgarr.length; i++) {
            if (imgarr[i].isOrigin == true) {
                let extension = imgarr[i].name.split('.').pop();
                let _tempimg = await this.mediarepository.findOne({
                    media_name: imgarr[i].name
                })
                newlesson.post_content = newlesson.post_content.replace(imgarr[i].link, _tempimg.media_path)
                await this.mediarepository.update(
                    { media_name: imgarr[i].name },
                    {
                        media_type: extension,
                        parent_ID: ID,
                        media_status: "publish"
                    }
                )
            } else {
                await this.basictools.uploadimgbyurl(
                    imgarr[i].link,
                    config.POST_IMG_PATH,
                    user
                ).then(
                    async (result: any) => {
                        let mediapayload: FormUploadMediaInput = {
                            media_name: result.newFilename,
                            media_type: result.format,
                            media_path: result.newFilepath,
                            user_ID: user.user_id,
                            parent_ID: ID,
                            media_category: config.LESSON_IMG_CAT,
                            media_status: 'publish'
                        }
                        await this.mediarepository.save(mediapayload);
                        newlesson.post_content = newlesson.post_content.replace(imgarr[i].link, mediapayload.media_path)
                        // Must return result from ConvertWebPandMove Fn
                        return result;
                    }
                ).catch(
                    (error) => {
                        throw error;
                    }
                )
            }
        }
        
        await this.cacheManager.store.del(_cacheKey.all_lessonavatar)
        await this.cacheManager.store.del(_cacheKey.all_trash_medias)
        let _update = await this.postrepository.update(
            {
                ID: ID
            },
            newlesson
        )

        await this.cacheManager.store.del(_cacheKey.public_lessons)

        return _update;
    }
}

export interface LessonImgArr {
    name: string
    link: string
    isOrigin: boolean
}
