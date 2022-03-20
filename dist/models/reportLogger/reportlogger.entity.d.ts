export declare class ReportLoggerEntity {
    ID: number;
    report_notes: string;
    report_date: Date;
    report_sender: number;
    report_controllers: number[];
    parent_ID: number;
    report_type: ReportLoggerTypes;
    finished: boolean;
}
export interface ReportLoggerInput {
    report_notes: string;
    report_sender: number;
    report_controllers: number[];
    parent_ID: number;
    report_type: ReportLoggerTypes;
    finished?: boolean;
}
export declare enum ReportLoggerTypes {
    questionMarketUserAnswer = "questionMarketUserAnswer",
    questionMarket_UserAnswerReview = "questionMarket_UserAnswerReview",
    questionProduct_Invalid = "questionProduct_Invalid",
    QA_Question_ItemInvalid = "QA_Question_ItemInvalid",
    QA_Answer_ItemInvalid = "QA_Answer_ItemInvalid",
    useranswer_expired = "useranswer_expired"
}
