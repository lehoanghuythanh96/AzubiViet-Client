export interface ReportLoggerEntity {
    ID: number
  report_notes: string
  report_date: Date
  report_sender: number
  report_controllers: number[]
  parent_ID: number
  report_type: string
  finished: boolean
}

export enum ReportLoggerTypes {
    questionMarketUserAnswer = "questionMarketUserAnswer",
    questionMarket_UserAnswerReview = "questionMarket_UserAnswerReview",
    questionProduct_Invalid = "questionProduct_Invalid",
    QA_Question_ItemInvalid = "QA_Question_ItemInvalid",
    QA_Answer_ItemInvalid = "QA_Answer_ItemInvalid",
    useranswer_expired = "useranswer_expired",
}