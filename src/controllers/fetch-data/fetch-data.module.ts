import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminInfoResolver } from "src/models/admininfo/admininfo.resolver";
import { AreaListEntity } from "src/models/arealist/arealist.entity";
import { BlackListEntity } from "src/models/blacklist/blacklist.entity";
import { DefaultConfigEntity } from "src/models/defaultconfig/defaultconfig.entity";
import { GuestQAndAEntity } from "src/models/GuestQAndA/GuestQAndA.entity";
import { GuestQAndAResolver } from "src/models/GuestQAndA/GuestQAndA.resolver";
import { LessonCategoryEntity } from "src/models/lessoncategory/lessoncategory.entity";
import { LessonGuestPageEntity } from "src/models/lessonpageinfo/lessonpageinfo.entity";
import { LevelTableEntity } from "src/models/leveltable/leveltable.entity";
import { MainLandingPageEntity } from "src/models/mainlandingpageInfo/mainLandingPageInfo.entity";
import { MainLandingPageInfoResolver } from "src/models/mainlandingpageInfo/mainLandingPageInfo.resolver";
import { MediaListEntity } from "src/models/media/media.entity";
import { PostEntity } from "src/models/post/post.entity";
import { PostEntityResolver } from "src/models/post/post.resolver";
import { PostCommentEntity } from "src/models/postComment/postComment.entity";
import { PostLikeEntity } from "src/models/postLikes/postlike.entity";
import { QuestionMarketAnswerEntity } from "src/models/questionmarketanswer/questionmarketanswer.entity";
import { QuestionMarketInfoEntity } from "src/models/questionmarketinfo/questionmarketinfo.entity";
import { QuestionMarket_UserAnswerEntity } from "src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { QuestionProductCategoryEntity } from "src/models/questionproductcategory/questionproductcategory.entity";
import { ReportLoggerEntity } from "src/models/reportLogger/reportlogger.entity";
import { ServerChatEntity } from "src/models/serverChat/serverchat.entity";
import { ServerChatResolver } from "src/models/serverChat/serverchat.resolver";
import { ShopItemEntity } from "src/models/ShopItem/shopitem.entity";
import { ShopItemResolver } from "src/models/ShopItem/shopitem.resolver";
import { ThankYouItemEntity } from "src/models/thankyouItem/thankyouitem.entity";
import { UserAnswerReviewEntity } from "src/models/useranswer_review/useranswer_review.entity";
import { UserEntity } from "src/models/userauthentication/userauth.entity";
import { UserInventoryEntity } from "src/models/userinventory/userinventory.entity";
import { UserInventoryResolver } from "src/models/userinventory/userinventory.resolver";
import { UserNotificationEntity } from "src/models/usernotifications/usernotifications.entity";
import { UserPrivateMessageEntity } from "src/models/userprivatemessage/userprivatemessage.entity";
import { JwtStrategy } from "src/tools/auth-tools/jwt.strategy";
import { BasicToolsService } from "src/tools/basic-tools/basic-tools.service";
import { Connection } from "typeorm";
import { LessonHandlerService } from "../lesson-handler/lesson-handler.service";
import { QuestionMarketService } from "../question-market/question-market.service";
import { UserAuthenticationService } from "../user-authentication/user-authentication.service";
import { AddSingleAreaController, ConfirmReportInvalidQA_AnswerController, ConfirmReportInvalidQA_QuestionController, DeleteTemp_QandA_ImageController, FetchDataController, RemoveAllUserServerChatContentController, ReportInvalidQAController, ReportInvalidQA_AnswerController, TestController, Upload_QandA_ImageByFileController, Upload_QandA_ImageByUrlController, UserDeleteQA_AnswerController, UserLikeQA_AnswerController, UserLockQAItemController, UserSendServerchatMsgController, UserSubmitQandAController, UserSubmitQandA_AnswerController, UserThankyou_QAAnswerController } from './fetch-data.controller';
import { FetchDataService } from './fetch-data.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: () => ({
                ttl: 86400,
                max: 100
            })
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('SECRET_TOKEN'),
                signOptions: { expiresIn: '5 days' }
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([
            PostEntity,
            LessonCategoryEntity,
            MediaListEntity,
            UserEntity,
            AreaListEntity,
            DefaultConfigEntity,
            QuestionMarketAnswerEntity,
            QuestionProductCategoryEntity,
            QuestionMarket_UserAnswerEntity,
            UserNotificationEntity,
            UserAnswerReviewEntity,
            LevelTableEntity,
            ReportLoggerEntity,
            UserPrivateMessageEntity,
            GuestQAndAEntity,
            PostCommentEntity,
            MainLandingPageEntity,
            PostLikeEntity,
            BlackListEntity,
            ThankYouItemEntity,
            ServerChatEntity,
            ShopItemEntity,
            UserInventoryEntity,
            QuestionMarketInfoEntity,
            LessonGuestPageEntity
        ])
    ],
    controllers: [
        FetchDataController,
        AddSingleAreaController,
        UserSubmitQandAController,
        UserSubmitQandA_AnswerController,
        UserLikeQA_AnswerController,
        UserDeleteQA_AnswerController,
        UserLockQAItemController,
        ReportInvalidQAController,
        ConfirmReportInvalidQA_QuestionController,
        ReportInvalidQA_AnswerController,
        ConfirmReportInvalidQA_AnswerController,
        UserThankyou_QAAnswerController,
        UserSendServerchatMsgController,
        RemoveAllUserServerChatContentController,
        DeleteTemp_QandA_ImageController,
        Upload_QandA_ImageByFileController,
        Upload_QandA_ImageByUrlController,
        TestController
    ],
    providers: [
        AdminInfoResolver,
        PostEntityResolver,
        FetchDataService,
        JwtStrategy,
        BasicToolsService,
        LessonHandlerService,
        UserAuthenticationService,
        MainLandingPageInfoResolver,
        GuestQAndAResolver,
        ServerChatResolver,
        ShopItemResolver,
        UserInventoryResolver,
        QuestionMarketService
    ],
    exports: [
        TypeOrmModule,
        BasicToolsService,
        FetchDataService,
        UserAuthenticationService,
        QuestionMarketService,
        LessonHandlerService
    ]
})

export class FetchDataModule { }