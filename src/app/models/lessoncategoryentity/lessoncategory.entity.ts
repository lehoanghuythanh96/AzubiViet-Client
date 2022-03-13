import { PostEntity } from "../postentity/post.entity";

export interface LessonCategoryEntity {
    ID: number,
    category_name: string,
    area_ID: number,
    child_lessons: [PostEntity]
}

export interface AddCategoryBody {
    category_name: string,
    area_ID: number
}