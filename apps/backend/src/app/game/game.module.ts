import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ItunesModule } from '../integrations/itunes/itunes.module';
import { GameController } from './game.controller';
import { GameService } from './game.service';
@Module({
  controllers: [GameController],
  imports: [CoreModule, ItunesModule],
  providers: [GameService],
})
export class GameModule {}
