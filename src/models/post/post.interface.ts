import { LessonImgArr } from "src/controllers/lesson-handler/lesson-handler.service";
import { postTypes } from "./post.entity";

export interface PublishLessonBody {
    post_title: string,
    post_content: string,
    post_category: number[],
    post_imgarr: Array<LessonImgArr>,
    post_avatar: string
}

export interface EditSingleLessonBody extends PublishLessonBody { 
    ID: number
}

export interface PostInput {
    post_title: string,
    post_content: string,
    post_author: number,
    post_type: postTypes,
    post_category: Array<number>,
    post_status: "trash" | "draft" | "publish"
}

export interface AddNewQuestionProducPostBody {
    post_title: string,
    post_category: Array<number>,
    post_content: string
    answer_content: string
    questionimgs: Array<string>
    answerimgs: Array<string>
    question_avatar: string
}

export interface EditQuestionProducPostBody extends AddNewQuestionProducPostBody {
    question_ID: number,
    answer_ID: number
}