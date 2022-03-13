import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaListEntity } from 'src/models/arealist/arealist.entity';
import { BlackListEntity } from 'src/models/blacklist/blacklist.entity';
import { GuestQAndAEntity } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { LevelTableEntity } from 'src/models/leveltable/leveltable.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { PostCommentEntity } from 'src/models/postComment/postComment.entity';
import { PostLikeEntity } from 'src/models/postLikes/postlike.entity';
import { QuestionMarketAnswerEntity } from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { QuestionProductCategoryEntity } from 'src/models/questionproductcategory/questionproductcategory.entity';
import { ReportLoggerEntity } from 'src/models/reportLogger/reportlogger.entity';
import { ServerChatEntity } from 'src/models/serverChat/serverchat.entity';
import { ShopItemEntity } from 'src/models/ShopItem/shopitem.entity';
import { ThankYouItemEntity } from 'src/models/thankyouItem/thankyouitem.entity';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserEntity } from 'src/models/userauthentication/userauth.entity';
import { UserEntityResolver } from 'src/models/userauthentication/userauth.resolver';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { UserNotificationEntity } from 'src/models/usernotifications/usernotifications.entity';
import { UserNotificationResolver } from 'src/models/usernotifications/usernotifications.resolver';
import { UserPrivateMessageEntity } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { UserPrivateMessageResolver } from 'src/models/userprivatemessage/userprivatemessage.resolver';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { QuestionMarketService } from '../question-market/question-market.service';
import {
  ConfirmReportInvalidAnswerController,
  ConfirmReportInvalidAnswerReviewController,
  ConfirmReportInvalidQuestionController,
  ConfirmResetPasswordController,
  ConfirmUserController,
  NewUserRegisterController,
  ReportInvalidQuestionController,
  ReportUserAnswerReviewInvalidController,
  ReportUserAnswerReviewInvalidControllerInvalidController,
  UploadQuestionProductAvatarByImgFileController,
  UploadUserAvatarByUrlController,
  UserAuthenticationController,
  UserBlockEmailFromPrivateMessageController,
  UserBuyASHOPitemController,
  UserChangePasswordController,
  userGGloginController,
  UserLoginController,
  UserUpdateProfileController
} from './user-authentication.controller';
import { UserAuthenticationService } from './user-authentication.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => ({
        ttl: 86400,
        max: 100
      })
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      AreaListEntity,
      MediaListEntity,
      UserNotificationEntity,
      LevelTableEntity,
      QuestionMarket_UserAnswerEntity,
      QuestionMarketAnswerEntity,
      QuestionProductCategoryEntity,
      PostEntity,
      UserAnswerReviewEntity,
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
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_TOKEN'),
        signOptions: { expiresIn: '72h' }
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [
    UserAuthenticationController,
    userGGloginController,
    NewUserRegisterController,
    UserLoginController,
    ConfirmUserController,
    ReportUserAnswerReviewInvalidControllerInvalidController,
    ConfirmReportInvalidAnswerReviewController,
    ReportUserAnswerReviewInvalidController,
    ConfirmReportInvalidAnswerController,
    ReportInvalidQuestionController,
    ConfirmReportInvalidQuestionController,
    UserBlockEmailFromPrivateMessageController,
    UserBuyASHOPitemController,
    UserChangePasswordController,
    ConfirmResetPasswordController,
    UploadQuestionProductAvatarByImgFileController,
    UploadUserAvatarByUrlController,
    UserUpdateProfileController
  ],
  providers: [
    UserAuthenticationService,
    BasicToolsService,
    UserEntityResolver,
    UserNotificationResolver,
    QuestionMarketService,
    UserPrivateMessageResolver,
    FetchDataService
  ]
})
export class UserAuthenticationModule { }
