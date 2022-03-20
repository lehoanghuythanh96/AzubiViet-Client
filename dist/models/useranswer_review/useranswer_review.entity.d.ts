import { PostEntity } from "../post/post.entity";
export declare class UserAnswerReviewEntity {
    ID: number;
    correctness: boolean;
    review_content: string;
    answerer_ID: number;
    user_answer_ID: number;
    question_ID: number;
    question_info: PostEntity;
    review_date: Date;
    review_author: number;
    review_confirmation: boolean;
    original_answer_ID: number;
    original_answer_info: any;
    review_updated: boolean;
    review_fixed: boolean;
    is_reported: boolean;
    report_notes: string;
    report_sender: number;
    report_counter: number;
    reported_date: Date;
    report_controllers: number[];
    review_confirmed: boolean;
    review_isLiked: boolean;
    review_status: "publish" | "trash";
    author_isBlocked: boolean;
}
export interface UserAnswerReviewInput {
    correctness: boolean;
    review_content: string;
    answerer_ID: number;
    question_ID: number;
    question_info: any;
    original_answer_ID: number;
    original_answer_info: any;
    user_answer_ID: number;
    review_author: number;
}
