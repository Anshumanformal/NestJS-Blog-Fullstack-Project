import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import config from "./config/keys"

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(config.mongodbURI),
    BlogModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
