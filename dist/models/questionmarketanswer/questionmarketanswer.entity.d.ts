import { MediaListEntity } from "../media/media.entity";
export declare class QuestionMarketAnswerEntity {
    ID: number;
    answer_content: string;
    parent_ID: number;
    user_ID: number;
    answer_imgs: MediaListEntity[];
}
export interface QuestionMarketAnswerInput {
    answer_content: string;
    parent_ID: number;
    user_ID: number;
}
