import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user_private_messages')
@ObjectType()
export class UserPrivateMessageEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "text" })
    message_content: string

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    message_date: Date

    @Field()
    @Column({ type: "text" })
    sender_email: string

    @Field()
    @Column({ type: "integer" })
    sender_ID: number

    @Field()
    @Column({ type: "integer" })
    user_ID: number

}

export interface UserPrivateMessageInput {
    message_content: string
    sender_email: string
    sender_ID: number
    user_ID: number
}