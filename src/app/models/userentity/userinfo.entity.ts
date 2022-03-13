import { MediaEntity } from "../mediaentity/media.entity";
import { NestDefaultConfig } from "../nest_defaultconfig/nestdefaultconfig.entity";
import { QuestionMarket_UserAnswerEntity } from "../questionmarketuseranswer/questionmarketuseranswer.entity";
import { UserInventoryEntity } from "../userinventory/userinventory.entity";

export interface UserEntity {
    ID: number,
    user_name: string,
    user_password: string,
    user_secretcode: string,
    user_email: string,
    user_role: string,
    user_level: number,
    user_abicoin: number,
    levelup_points: number,
    user_experience: number,
    user_stat: string,
    user_avatar: MediaEntity | null,
    gender: "Male" | "Female",
    user_private_answers: QuestionMarket_UserAnswerEntity[]
    is_blocked: boolean,
    punish_point: number,
    user_inventory: UserInventoryEntity[],
    defaultconfig: NestDefaultConfig | null,
}