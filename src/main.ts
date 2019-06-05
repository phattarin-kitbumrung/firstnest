import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

var jwt = require("jwt-simple");  
var auth = require("./auth.js")();  
var users = require("./users.js");  
var cfg = require("./config.js");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(auth.initialize());
  app.use(helmet());
  //app.use(auth.authenticate());
  await app.listen(3000);
}
bootstrap();
