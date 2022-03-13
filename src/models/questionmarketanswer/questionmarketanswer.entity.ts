import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MediaListEntity } from "../media/media.entity";

@Entity('questionmarket_answers')
@ObjectType()
export class QuestionMarketAnswerEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "text" })
    answer_content: string;

    @Field()
    @Column({ type: "integer" })
    parent_ID: number;

    @Field()
    @Column({ type: "integer" })
    user_ID: number;

    @Field(() => [MediaListEntity], {nullable: true})
    answer_imgs: MediaListEntity[];
}

export interface QuestionMarketAnswerInput {

    answer_content: string
    parent_ID: number
    user_ID: number

}