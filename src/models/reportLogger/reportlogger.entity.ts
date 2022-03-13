import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('azubi_ReportLogger')
@ObjectType()
export class ReportLoggerEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "text" })
    report_notes: string;

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    report_date: Date;

    @Field()
    @Column({ type: "integer" })
    report_sender: number;

    @Field(() => [Int])
    @Column({ type: "integer", array: true })
    report_controllers: number[];

    @Field()
    @Column({ type: "integer" })
    parent_ID: number;

    @Field()
    @Column({ type: "text" })
    report_type: ReportLoggerTypes;

    @Field()
    @Column({ type: "boolean", default: false })
    finished: boolean;

}

export interface ReportLoggerInput {
    report_notes: string
    report_sender: number
    report_controllers: number[]
    parent_ID: number
    report_type: ReportLoggerTypes
    finished?: boolean
}

export enum ReportLoggerTypes {
    questionMarketUserAnswer = "questionMarketUserAnswer",
    questionMarket_UserAnswerReview = "questionMarket_UserAnswerReview",
    questionProduct_Invalid = "questionProduct_Invalid",
    QA_Question_ItemInvalid = "QA_Question_ItemInvalid",
    QA_Answer_ItemInvalid = "QA_Answer_ItemInvalid",
    useranswer_expired = "useranswer_expired",
}