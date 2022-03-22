import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AreaListResolver } from 'src/models/arealist/arealist.resolver';
import { LessonCategoryResolver } from 'src/models/lessoncategory/lessoncategory.resolver';
import { LessonGuestPageResolver } from 'src/models/lessonpageinfo/lessonpageinfo.resolver';
import { FetchDataModule } from '../fetch-data/fetch-data.module';
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
    FetchDataModule
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
    AreaListResolver,
    LessonCategoryResolver,
    LessonGuestPageResolver,
  ]
})
export class LessonHandlerModule { }
