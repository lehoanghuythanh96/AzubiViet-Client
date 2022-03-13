import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('azubivie_postLikes')
@ObjectType()
export class PostLikeEntity {

    @Field({nullable: true})
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field({nullable: true})
    @Column({ type: "text" })
    type: PostLikeTypes;

    @Field({nullable: true})
    @Column({ type: "integer" })
    parent_ID: number;

    @Field(() => [Int], {nullable: true})
    @Column({ type: "integer", array: true})
    user_array: number[];

}

export interface PostLikeInput {
    type: PostLikeTypes
    parent_ID: number
    user_array: number[]
}

export enum PostLikeTypes {
    QA_Answer = "QA_Answer"
}