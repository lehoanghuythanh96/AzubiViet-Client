import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { postTypes } from "../post/post.entity";

@Entity('Azubi_post_Comments')
@ObjectType()
export class PostCommentEntity {
    
    @Field({nullable: true})
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field({nullable: true})
    @Column({ type: "text"})
    comment_content: string;

    @Field({nullable: true})
    @Column({ type: "integer"})
    user_id: string;

    @Field({nullable: true})
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    comment_date: Date;

    @Field({nullable: true})
    @Column({ type: "integer"})
    parent_ID: string;

    @Field({nullable: true})
    @Column({ type: "text"})
    post_type: postTypes;

    @Field(() => [Int], {nullable: true})
    @Column({ type: "integer", array: true, default: []})
    liked_users: number[];

    @Field({nullable: true})
    @Column({ type: "text", default: "publish"})
    comment_status: "trash" | "publish";
    
}

export interface PostCommentInput {
    comment_content: string
    user_id: number
    parent_ID: number
    post_type: postTypes
}