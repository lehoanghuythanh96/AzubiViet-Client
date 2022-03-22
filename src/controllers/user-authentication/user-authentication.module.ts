import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserEntityResolver } from 'src/models/userauthentication/userauth.resolver';
import { UserNotificationResolver } from 'src/models/usernotifications/usernotifications.resolver';
import { UserPrivateMessageResolver } from 'src/models/userprivatemessage/userprivatemessage.resolver';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { FetchDataModule } from '../fetch-data/fetch-data.module';
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_TOKEN'),
        signOptions: { expiresIn: '72h' }
      }),
      inject: [ConfigService],
    }),
    FetchDataModule
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
    UserEntityResolver,
    UserNotificationResolver,
    UserPrivateMessageResolver,
  ]
})
export class UserAuthenticationModule { }
