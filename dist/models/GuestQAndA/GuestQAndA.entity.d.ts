import { MediaListEntity } from "../media/media.entity";
export declare class GuestQAndAEntity {
    ID: number;
    item_content: string;
    user_email: string;
    user_ID: number;
    question_date: Date;
    parent_ID: number;
    item_type: "question" | "answer";
    item_status: "trash" | "publish";
    QA_status: "Waiting" | "Answered" | "Closed";
    like_arr: number[];
    is_reported: boolean;
    report_notes: string;
    report_sender: number;
    report_counter: number;
    reported_date: Date;
    report_controllers: number[];
    author_isBlocked: boolean;
    QA_imgs: MediaListEntity[];
    QA_img_path: string;
}
export interface GuestQAndAInput {
    item_content: string;
    user_email: string;
    item_type: "question" | "answer";
    parent_ID: number;
    user_ID: number;
}
