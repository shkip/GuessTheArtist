import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumService } from './album.service';
import { Album, AlbumSchema } from './models/album.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: AlbumSchema,
      },
    ]),
  ],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
