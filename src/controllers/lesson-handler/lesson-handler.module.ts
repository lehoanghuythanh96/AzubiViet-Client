import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaListEntity } from 'src/models/arealist/arealist.entity';
import { AreaListResolver } from 'src/models/arealist/arealist.resolver';
import { BlackListEntity } from 'src/models/blacklist/blacklist.entity';
import { GuestQAndAEntity } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { LessonCategoryResolver } from 'src/models/lessoncategory/lessoncategory.resolver';
import { LessonGuestPageEntity } from 'src/models/lessonpageinfo/lessonpageinfo.entity';
import { LessonGuestPageResolver } from 'src/models/lessonpageinfo/lessonpageinfo.resolver';
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
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { UserNotificationEntity } from 'src/models/usernotifications/usernotifications.entity';
import { UserPrivateMessageEntity } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { QuestionMarketService } from '../question-market/question-market.service';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import {
  AddLessonCategoryController,
  DeletesinglelessonController,
  EditSingleLessonController,
  LessonHandlerController,
  PublishNewLessonController,
  UploadLessonAvatarByimgFileController,
  UploadLessonAvatarByUrlController,
  UploadLessonImageController
} from './lesson-handler.controller';
import { LessonHandlerService } from './lesson-handler.service';

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
      MediaListEntity,
      PostEntity,
      LessonGuestPageEntity,
      AreaListEntity,
      LessonCategoryEntity,
      QuestionProductCategoryEntity,
      UserEntity,
      QuestionMarketAnswerEntity,
      QuestionMarket_UserAnswerEntity,
      UserAnswerReviewEntity,
      UserNotificationEntity,
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
    LessonHandlerController,
    UploadLessonImageController,
    PublishNewLessonController,
    EditSingleLessonController,
    UploadLessonAvatarByUrlController,
    UploadLessonAvatarByimgFileController,
    DeletesinglelessonController,
    AddLessonCategoryController
  ],
  providers: [
    LessonHandlerService,
    BasicToolsService,
    AreaListResolver,
    LessonCategoryResolver,
    LessonGuestPageResolver,
    FetchDataService,
    QuestionMarketService,
    UserAuthenticationService
  ]
})
export class LessonHandlerModule { }
