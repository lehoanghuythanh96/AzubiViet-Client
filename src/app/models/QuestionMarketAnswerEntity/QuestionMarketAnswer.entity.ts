import { MediaEntity } from "../mediaentity/media.entity";

export interface QuestionMarketAnswerEntity {
    ID: number
    answer_content: string
    parent_ID: number
    user_ID: number
    answer_imgs: MediaEntity[]
}