export interface NestConfig {
    DB_DATA: string,
    SECRET_TOKEN: string
    GG_CLIENT_ID_1: string
    GG_CLIENT_SECRET_1: string
    MAIL_DOMAIN: string
    FRONTEND_WHITELIST: string
}

interface SystemDefaultConfig {
    POST_IMG_PATH: string
    USER_IMG_PATH: string
    QA_IMG_PATH: string
    POST_AVT_CAT: string
    USER_AVT_CAT: string
    SHOPITEM_IMG_PATH: string
    LESSON_AVT_CAT: string
    DEFAULT_USER_AVATAR: string
    DEFAULT_POST_AVATAR: string
    DEFAULT_LESSON_AVATAR: string
    POST_IMG_CAT: string
    LESSON_IMG_CAT: string
    QA_IMG_CAT: string
    QUESTION_PRODUCT_IMG_CAT: string
    QUESTION_USER_ANSWER_IMG_CAT: string
    QUESTION_PRODUCT_AVATAR_CAT: string
    QUESTION_PRODUCT_ANSWER_IMG_CAT: string
    CDN_PATH: string
}

export const SystemDefaultConfig: SystemDefaultConfig = {
    POST_IMG_PATH: "assets/images/post/",
    USER_IMG_PATH: "assets/images/user/",
    SHOPITEM_IMG_PATH: "assets/images/shop_item/",
    POST_AVT_CAT: "post_avatar",
    USER_AVT_CAT: "user_avatar",
    LESSON_AVT_CAT: "lesson_avatar",
    DEFAULT_POST_AVATAR: "default_post_avatar.webp",
    DEFAULT_LESSON_AVATAR: "default_post_avatar.webp",
    POST_IMG_CAT: "post_image",
    LESSON_IMG_CAT: "lesson_image",
    QUESTION_PRODUCT_IMG_CAT: "question_product_image",
    QUESTION_USER_ANSWER_IMG_CAT: "question_user_answer_image",
    QUESTION_PRODUCT_AVATAR_CAT: "question_product_avatar",
    QUESTION_PRODUCT_ANSWER_IMG_CAT: "question_product_answer_image",
    CDN_PATH: "cdn",
    DEFAULT_USER_AVATAR: "default_user_avatar.webp",
    QA_IMG_PATH: "assets/images/q_and_a/",
    QA_IMG_CAT: "QA_image"
}