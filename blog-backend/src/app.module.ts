import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import config from "./config/keys"
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard/index';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config.mongodbURI),
    BlogModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
