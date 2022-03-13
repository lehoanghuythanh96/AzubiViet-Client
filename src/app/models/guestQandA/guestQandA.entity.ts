import { MediaEntity } from "../mediaentity/media.entity";

export interface GuestQandAEntity {
    ID: number
    item_content: string
    user_email: string
    user_ID: number
    question_date: Date
    parent_ID: number
    item_type: "answer" | "question"
    item_status: "trash" | "publish"
    QA_status: "Waiting" | "Answered" | "Closed"
    like_arr: number[]
    is_reported: boolean
    report_notes: string
    report_sender: number
    report_counter: number
    reported_date: Date
    report_controllers: number[],
    QA_imgs: MediaEntity[],
    QA_img_path: string
}