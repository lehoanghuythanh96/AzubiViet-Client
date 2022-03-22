import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { QuestionMarketAnswerResolver } from 'src/models/questionmarketanswer/questionmarketanswer.resolver';
import { QuestionMarketInfoResolver } from 'src/models/questionmarketinfo/questionmarketinfo.resolver';
import { QuestionMarket_UserAnswerResolver } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.resolver';
import { QuestionProductCategoryResolver } from 'src/models/questionproductcategory/questionproductcategory.resolver';
import { UserAnswerReviewResolver } from 'src/models/useranswer_review/useranswer_review.resolver';
import { FetchDataModule } from '../fetch-data/fetch-data.module';
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
    FetchDataModule
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
    QuestionMarketInfoResolver,
    QuestionProductCategoryResolver,
    QuestionMarketAnswerResolver,
    QuestionMarket_UserAnswerResolver,
    UserAnswerReviewResolver
  ]
})
export class QuestionMarketModule { }
