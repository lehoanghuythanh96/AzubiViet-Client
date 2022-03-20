"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const serve_static_1 = require("@nestjs/serve-static");
const fetch_data_module_1 = require("./controllers/fetch-data/fetch-data.module");
const user_authentication_module_1 = require("./controllers/user-authentication/user-authentication.module");
const lesson_handler_module_1 = require("./controllers/lesson-handler/lesson-handler.module");
const nestconfig_interface_1 = require("./models/config/nestconfig.interface");
const question_market_module_1 = require("./controllers/question-market/question-market.module");
let nestconfig = process.env;
let config = nestconfig_interface_1.SystemDefaultConfig;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: JSON.parse(nestconfig.DB_DATA).DB_HOST,
                port: parseInt(JSON.parse(nestconfig.DB_DATA).DB_PORT),
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
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                context: ({ req }) => ({
                    req
                })
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', config.CDN_PATH),
            }),
            fetch_data_module_1.FetchDataModule,
            user_authentication_module_1.UserAuthenticationModule,
            lesson_handler_module_1.LessonHandlerModule,
            question_market_module_1.QuestionMarketModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map