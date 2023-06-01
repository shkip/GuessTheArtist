import { Module } from '@nestjs/common';
import { AlbumModule } from './album/album.module';
import { PlayerModule } from './player/player.module';
@Module({
  imports: [AlbumModule, PlayerModule],
  exports: [AlbumModule, PlayerModule],
})
export class CoreModule {}
