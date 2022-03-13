import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestConfig } from './models/config/nestconfig.interface';

let nestconfig : NestConfig = <any>process.env;

async function bootstrap() {

  let corsorigins = "*";
  if (nestconfig.FRONTEND_WHITELIST && nestconfig.FRONTEND_WHITELIST !== "") {
    corsorigins = JSON.parse(nestconfig.FRONTEND_WHITELIST);
  }
  
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: corsorigins
  });

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(JSON.parse(nestconfig.DB_DATA).APP_PORT);
  
}

bootstrap();
