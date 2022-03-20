export interface NestConfig {
    DB_DATA: string;
    SECRET_TOKEN: string;
    GG_CLIENT_ID_1: string;
    GG_CLIENT_SECRET_1: string;
    MAIL_DOMAIN: string;
    FRONTEND_WHITELIST: string;
}
interface SystemDefaultConfig {
    POST_IMG_PATH: string;
    USER_IMG_PATH: string;
    QA_IMG_PATH: string;
    POST_AVT_CAT: string;
    USER_AVT_CAT: string;
    SHOPITEM_IMG_PATH: string;
    LESSON_AVT_CAT: string;
    DEFAULT_USER_AVATAR: string;
    DEFAULT_POST_AVATAR: string;
    DEFAULT_LESSON_AVATAR: string;
    POST_IMG_CAT: string;
    LESSON_IMG_CAT: string;
    QA_IMG_CAT: string;
    QUESTION_PRODUCT_IMG_CAT: string;
    QUESTION_USER_ANSWER_IMG_CAT: string;
    QUESTION_PRODUCT_AVATAR_CAT: string;
    QUESTION_PRODUCT_ANSWER_IMG_CAT: string;
    CDN_PATH: string;
}
export declare const SystemDefaultConfig: SystemDefaultConfig;
export {};
