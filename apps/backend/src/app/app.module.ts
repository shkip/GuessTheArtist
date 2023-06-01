import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMongoConfig } from './config/mongo.config';
import { GameModule } from './game/game.module';
import { getArtistsConfig } from './config/artists.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getArtistsConfig],
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
