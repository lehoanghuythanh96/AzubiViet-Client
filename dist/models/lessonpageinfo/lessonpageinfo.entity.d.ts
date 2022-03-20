import { AreaListEntity } from "../arealist/arealist.entity";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { PostEntity } from "../post/post.entity";
export declare class LessonGuestPageEntity {
    ID: number;
    lesson_tree: [AreaListEntity];
    all_lessons: PostEntity[];
    defaultconfig: DefaultConfigEntity;
}
