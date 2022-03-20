import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { MediaListEntity } from "../media/media.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { UserInventoryEntity } from "../userinventory/userinventory.entity";
export declare class UserEntity {
    ID: number;
    user_name: string;
    user_password: string;
    user_secretcode: string;
    user_email: string;
    user_role: UserRoles;
    user_level: number;
    levelup_points: number;
    user_experience: number;
    user_abicoin: number;
    user_stat: string;
    user_avatar: MediaListEntity;
    gender: UserGenders;
    is_blocked: boolean;
    punish_point: number;
    user_private_answers: QuestionMarket_UserAnswerEntity[];
    defaultconfig: DefaultConfigEntity;
    user_inventory: UserInventoryEntity[];
}
export interface _UserRegisterDataInput {
    user_name: string | undefined;
    user_password: string | undefined;
    user_email: string | undefined;
}
export declare enum UserRoles {
    subscriber = "subscriber",
    admin = "admin"
}
export declare enum UserGenders {
    male = "male",
    female = "female"
}
