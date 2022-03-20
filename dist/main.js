"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let nestconfig = process.env;
async function bootstrap() {
    let corsorigins = "*";
    if (nestconfig.FRONTEND_WHITELIST && nestconfig.FRONTEND_WHITELIST !== "") {
        corsorigins = JSON.parse(nestconfig.FRONTEND_WHITELIST);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: corsorigins
    });
    app.enableShutdownHooks();
    await app.listen(JSON.parse(nestconfig.DB_DATA).APP_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map