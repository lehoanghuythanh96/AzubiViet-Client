import { Field, Int, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from "graphql-type-json";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ThankYouList')
@ObjectType()
export class ThankYouItemEntity {

    @Field({ nullable: true })
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field({ nullable: true })
    @Column({ type: "text" })
    type: ThankYouItemTypes;

    @Field({ nullable: true })
    @Column({ type: "integer" })
    user_ID: string;

    @Field(() => GraphQLJSON ,{ nullable: true })
    @Column({ type: "json" })
    thankyou_list: number[] | string[];

}

export enum ThankYouItemTypes {
    QA_Answer = "QA_Answer"
}