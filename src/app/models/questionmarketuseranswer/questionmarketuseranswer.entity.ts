import { MediaEntity } from "../mediaentity/media.entity";

export interface QuestionMarket_UserAnswerEntity {
    ID: number
    answer_content: string
    parent_ID: number
    user_ID: number
    is_reviewed: boolean
    answer_date: Date
    answer_is_outdated: boolean
    review_ID: number
    waiting_reviewers: number[]
    answer_imgs: MediaEntity[]
    is_reported: boolean
    report_notes: string
    report_sender: number
    reported_date: Date
    report_controllers: number[]
}