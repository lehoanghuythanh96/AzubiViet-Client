import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaListEntity } from 'src/models/arealist/arealist.entity';
import { BlackListEntity } from 'src/models/blacklist/blacklist.entity';
import { GuestQAndAEntity } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { LevelTableEntity } from 'src/models/leveltable/leveltable.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { PostCommentEntity } from 'src/models/postComment/postComment.entity';
import { PostLikeEntity } from 'src/models/postLikes/postlike.entity';
import { QuestionMarketAnswerEntity } from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import { QuestionMarketAnswerResolver } from 'src/models/questionmarketanswer/questionmarketanswer.resolver';
import { QuestionMarketInfoEntity } from 'src/models/questionmarketinfo/questionmarketinfo.entity';
import { QuestionMarketInfoResolver } from 'src/models/questionmarketinfo/questionmarketinfo.resolver';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { QuestionMarket_UserAnswerResolver } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.resolver';
import { QuestionProductCategoryEntity } from 'src/models/questionproductcategory/questionproductcategory.entity';
import { QuestionProductCategoryResolver } from 'src/models/questionproductcategory/questionproductcategory.resolver';
import { ReportLoggerEntity } from 'src/models/reportLogger/reportlogger.entity';
import { ServerChatEntity } from 'src/models/serverChat/serverchat.entity';
import { ShopItemEntity } from 'src/models/ShopItem/shopitem.entity';
import { ThankYouItemEntity } from 'src/models/thankyouItem/thankyouitem.entity';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserAnswerReviewResolver } from 'src/models/useranswer_review/useranswer_review.resolver';
import { UserEntity } from 'src/models/userauthentication/userauth.entity';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { UserNotificationEntity } from 'src/models/usernotifications/usernotifications.entity';
import { UserPrivateMessageEntity } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import {
  AddQuestionProductCategoryController,
  CreateNewQuestionProductController,
  DeleteTempQuestionProductImageController,
  DeleteTempQuestionUserAnswerImageController,
  EditPrivateQuestionProductController,
  GetReviewQuestionAnswerController,
  QuestionMarketController,
  ReportedQuestionAuthorRequiredDataController,
  SendPrivateMessageToQuestionAuthorController,
  UploadQuestionMarketUserAnswerImageByFileController,
  UploadQuestionMarketUserAnswerImageByUrlController,
  UploadQuestionProductAnswerImageByFileController,
  UploadQuestionProductAnswerImageByUrlController,
  UploadQuestionProductAvatarByImgFileController,
  UploadQuestionProductAvatarByUrlController,
  UploadQuestionProductImageByFileController,
  UploadQuestionProductImageByUrlController,
  useranswer_reportedReviewerRequireOriginalAnswerController,
  UserConfirmClearAnswerReportController,
  UserConfirmReviewController,
  UserDeleteSingleQuestionProductController,
  UserReportExpiredAnswerController,
  UserRequiredReviewUpdateController,
  UserRequireMakingReviewFixedController,
  UserRequireSkipReviewUpdate,
  UserSubmitAnswerReviewController,
  UsersubmitQuestionAnswerController
} from './question-market.controller';
import { QuestionMarketService } from './question-market.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_TOKEN'),
        signOptions: { expiresIn: '5 days' }
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: 86400,
        max: 100
      })
    }),
    TypeOrmModule.forFeature([
      QuestionMarketInfoEntity,
      AreaListEntity,
      LessonCategoryEntity,
      PostEntity,
      QuestionProductCategoryEntity,
      MediaListEntity,
      QuestionMarketAnswerEntity,
      UserEntity,
      QuestionMarket_UserAnswerEntity,
      UserNotificationEntity,
      UserAnswerReviewEntity,
      LevelTableEntity,
      ReportLoggerEntity,
      UserPrivateMessageEntity,
      GuestQAndAEntity,
      PostCommentEntity,
      PostLikeEntity,
      BlackListEntity,
      ThankYouItemEntity,
      ServerChatEntity,
      ShopItemEntity,
      UserInventoryEntity
    ])
  ],
  controllers: [
    QuestionMarketController,
    AddQuestionProductCategoryController,
    UploadQuestionProductImageByFileController,
    UploadQuestionProductImageByUrlController,
    DeleteTempQuestionProductImageController,
    UploadQuestionProductAnswerImageByFileController,
    UploadQuestionProductAnswerImageByUrlController,
    CreateNewQuestionProductController,
    UploadQuestionProductAvatarByImgFileController,
    UploadQuestionProductAvatarByUrlController,
    EditPrivateQuestionProductController,
    UploadQuestionMarketUserAnswerImageByFileController,
    UploadQuestionMarketUserAnswerImageByUrlController,
    UsersubmitQuestionAnswerController,
    DeleteTempQuestionUserAnswerImageController,
    GetReviewQuestionAnswerController,
    UserSubmitAnswerReviewController,
    UserRequiredReviewUpdateController,
    UserRequireMakingReviewFixedController,
    UserRequireSkipReviewUpdate,
    UserConfirmReviewController,
    useranswer_reportedReviewerRequireOriginalAnswerController,
    ReportedQuestionAuthorRequiredDataController,
    SendPrivateMessageToQuestionAuthorController,
    UserConfirmClearAnswerReportController,
    UserReportExpiredAnswerController,
    UserDeleteSingleQuestionProductController
  ],
  providers: [
    QuestionMarketService,
    QuestionMarketInfoResolver,
    QuestionProductCategoryResolver,
    BasicToolsService,
    FetchDataService,
    QuestionMarketAnswerResolver,
    QuestionMarket_UserAnswerResolver,
    UserAuthenticationService,
    UserAnswerReviewResolver
  ]
})
export class QuestionMarketModule { }
