import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('azuBi_ServerChat')
@ObjectType()
export class ServerChatEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ length: 500 })
    message_content: string;

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    message_date: Date;

    @Field()
    @Column({ type: "text" })
    server_name: ChatServerNames;

    @Field()
    @Column({ type: "integer" })
    user_ID: number;

    @Field()
    @Column({ type: "text" })
    user_email: string;

    @Field()
    @Column({ type: "text" })
    user_name: string;

}

export interface ServerChatInput {
    message_content: string
    server_name: ChatServerNames
    user_ID: number
    user_email: string
    user_name: string
} 

export enum ChatServerNames {
    justDoIt = "Just Do It",
    workHardPlayHard = "Work Hard Play Hard",
    beYourSelf = "Be Your Self",
    nothingMatters = "Nothing Matters"
}