import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FetchDataModule } from './controllers/fetch-data/fetch-data.module';
import { UserAuthenticationModule } from './controllers/user-authentication/user-authentication.module';
import { LessonHandlerModule } from './controllers/lesson-handler/lesson-handler.module';
import { NestConfig, SystemDefaultConfig } from './models/config/nestconfig.interface';
import { QuestionMarketModule } from './controllers/question-market/question-market.module';

let nestconfig: NestConfig = <any>process.env;
let config = SystemDefaultConfig;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: JSON.parse(nestconfig.DB_DATA).DB_HOST,
      port: parseInt(<string>JSON.parse(nestconfig.DB_DATA).DB_PORT),
      username: JSON.parse(nestconfig.DB_DATA).DB_USERNAME,
      password: JSON.parse(nestconfig.DB_DATA).DB_PASSWORD,
      database: JSON.parse(nestconfig.DB_DATA).DB_DTBNAME,
      autoLoadEntities: true,
      entities: [
        'models/**/**.entity.ts'
      ],
      synchronize: true,
      extra: {
        "connectionLimit": 100
      }
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({
        req
      })
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', config.CDN_PATH),
    }),
    FetchDataModule,
    UserAuthenticationModule,
    LessonHandlerModule,
    QuestionMarketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }