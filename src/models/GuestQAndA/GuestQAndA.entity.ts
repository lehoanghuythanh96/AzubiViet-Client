import { Field, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { MediaListEntity } from "../media/media.entity";

let config = SystemDefaultConfig;

@Entity('Guest_QAndA_Items')
@ObjectType()
export class GuestQAndAEntity {

    @Field({nullable: true})
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field({nullable: true})
    @Column({ type: "text"})
    item_content: string;

    @Field({nullable: true})
    @Column({ type: "text"})
    user_email: string;

    @Field({nullable: true})
    @Column({ type: "integer" })
    user_ID: number;

    @Field({nullable: true})
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    question_date: Date;

    @Field({nullable: true})
    @Column({ type: "integer"})
    parent_ID: number;

    @Field({nullable: true})
    @Column({ type: "text"})
    item_type: "question" | "answer";

    @Field({nullable: true})
    @Column({ type: "text", default: "publish"})
    item_status: "trash" | "publish";

    @Field({nullable: true})
    @Column({ type: "text", default: "Waiting"})
    QA_status: "Waiting" | "Answered" | "Closed";

    @Field(() => [Int], { nullable: true })
    like_arr: number[];

    @Field()
    @Column({ type: "boolean", default: false })
    is_reported: boolean;

    @Field()
    @Column({ type: "text", default: "" })
    report_notes: string;

    @Field()
    @Column({ type: "integer", default: 0 })
    report_sender: number;

    @Field()
    @Column({ type: "integer", default: 0 })
    report_counter: number;

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    reported_date: Date;

    @Field(() => [Int])
    @Column({ type: "json", default: [] })
    report_controllers: number[];

    @Field()
    @Column({ type: "boolean", default: false })
    author_isBlocked: boolean;

    @Field(() => [MediaListEntity], {nullable: true})
    QA_imgs: MediaListEntity[];

    @Field(() => GraphQLString, {defaultValue: config.QA_IMG_PATH})
    QA_img_path: string;
    
}

export interface GuestQAndAInput {
    item_content: string
    user_email: string
    item_type: "question" | "answer"
    parent_ID: number
    user_ID: number
}