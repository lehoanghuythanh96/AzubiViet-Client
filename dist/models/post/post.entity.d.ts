import { MediaListEntity } from "../media/media.entity";
import { QuestionMarketAnswerEntity } from "../questionmarketanswer/questionmarketanswer.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { UserEntity } from "../userauthentication/userauth.entity";
export declare class PostEntity {
    ID: number;
    post_title: string;
    post_content: string;
    post_author: number;
    post_date: Date;
    post_type: postTypes;
    post_category: number[];
    question_experience: number;
    post_status: "trash" | "draft" | "publish";
    post_avatar: MediaListEntity;
    question_answer: QuestionMarketAnswerEntity;
    question_imgs: MediaListEntity[];
    question_avatar: MediaListEntity;
    lesson_avatar: MediaListEntity;
    author_info: UserEntity;
    questionmarket_user_answer: QuestionMarket_UserAnswerEntity[];
    is_reported: boolean;
    report_notes: string;
    report_sender: number;
    report_counter: number;
    reported_date: Date;
    report_controllers: number[];
    author_isBlocked: boolean;
}
export declare enum postTypes {
    post = "post",
    lesson = "lesson",
    question_product = "question_product"
}
