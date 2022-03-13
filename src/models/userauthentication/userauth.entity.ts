import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { MediaListEntity } from "../media/media.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { UserInventoryEntity } from "../userinventory/userinventory.entity";

@Entity('azubivie_users')
@ObjectType()
export class UserEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ length: 32 })
    user_name: string;

    @Field()
    @Column({ length: 255 })
    user_password: string;

    @Field()
    @Column({ length: 255 , default: ""})
    user_secretcode: string;

    @Field()
    @Column({ length: 255 })
    user_email: string;

    @Field()
    @Column({ default: "subscriber", length: 32 })
    user_role: UserRoles;

    @Field(() => Int)
    user_level: number;

    @Field(() => Int)
    levelup_points: number;

    @Field()
    @Column({ default: 0, type: "integer" })
    user_experience: number;

    @Field()
    @Column({ default: 0, type: "integer" })
    user_abicoin: number;

    @Field()
    @Column({ default: "", length: 255 })
    user_stat: string;

    @Field()
    user_avatar: MediaListEntity;

    @Field()
    @Column({ default: "Male", length: 10 })
    gender: UserGenders

    @Field()
    @Column({ default: false, type: "boolean" })
    is_blocked: boolean;

    @Field()
    @Column({ default: 0, type: "integer" })
    punish_point: number;

    @Field(() => [QuestionMarket_UserAnswerEntity], {nullable: true})
    user_private_answers: QuestionMarket_UserAnswerEntity[];

    @Field()
    defaultconfig: DefaultConfigEntity

    @Field(() => [UserInventoryEntity], { nullable: true })
    user_inventory: UserInventoryEntity[];

}

export interface _UserRegisterDataInput{
    user_name: string | undefined
    user_password: string | undefined
    user_email: string | undefined
}

export enum UserRoles {
    subscriber = "subscriber",
    admin = "admin"
}

export enum UserGenders {
    male = "male",
    female = "female"
}