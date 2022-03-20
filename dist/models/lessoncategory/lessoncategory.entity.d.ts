import { PostEntity } from "../post/post.entity";
export declare class LessonCategoryEntity {
    ID: number;
    category_name: string;
    area_ID: number;
    child_lessons: [PostEntity];
}
export interface AddCategoryInput {
    category_name: string;
    area_ID: number;
}
