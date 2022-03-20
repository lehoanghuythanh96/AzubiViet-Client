import { MediaListEntity } from "../media/media.entity";
export declare class QuestionMarket_UserAnswerEntity {
    ID: number;
    answer_content: string;
    parent_ID: number;
    user_ID: number;
    is_reviewed: boolean;
    answer_date: Date;
    answer_is_outdated: boolean;
    review_ID: number;
    waiting_reviewers: number[];
    answer_imgs: MediaListEntity[];
    is_reported: boolean;
    report_notes: string;
    report_sender: number;
    report_counter: number;
    reported_date: Date;
    report_controllers: number[];
    answer_status: "publish" | "trash";
    author_isBlocked: boolean;
}
export interface QuestionMarket_UserAnswerInput {
    answer_content: string;
    parent_ID: number;
    user_ID: number;
}
