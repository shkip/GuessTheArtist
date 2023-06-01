import { IAlbum } from '@guess-the-artist/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Album extends Document implements IAlbum {
  @Prop({ required: true, index: 1 })
  artist: string;

  @Prop()
  title: string;

  @Prop()
  img: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
