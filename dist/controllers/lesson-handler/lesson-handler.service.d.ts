import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
import { LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { PostInput } from 'src/models/post/post.interface';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
export declare class LessonHandlerService {
    private readonly postrepository;
    private readonly mediarepository;
    private basictools;
    private cacheManager;
    private readonly lessoncategoryrepository;
    constructor(postrepository: Repository<PostEntity>, mediarepository: Repository<MediaListEntity>, basictools: BasicToolsService, cacheManager: AppCache, lessoncategoryrepository: Repository<LessonCategoryEntity>);
    getallpubliclesson(): Promise<PostEntity[]>;
    getall_lessoncategory(): Promise<LessonCategoryEntity[]>;
    getalllessonavatar(): Promise<MediaListEntity[]>;
    publishlesson(newlesson: PostInput, imgarr: Array<LessonImgArr>, lesson_avatar: string, user: userJWTpayload): Promise<import("typeorm").UpdateResult>;
    editlesson(ID: number, newlesson: PostInput, imgarr: Array<LessonImgArr>, lesson_avatar: string, user: userJWTpayload): Promise<import("typeorm").UpdateResult>;
}
export interface LessonImgArr {
    name: string;
    link: string;
    isOrigin: boolean;
}
