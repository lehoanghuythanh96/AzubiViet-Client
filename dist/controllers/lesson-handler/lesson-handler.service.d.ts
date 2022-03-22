import { LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { PostInput } from 'src/models/post/post.interface';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { FetchDataService } from '../fetch-data/fetch-data.service';
export declare class LessonHandlerService {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
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
