import { IPlayer } from '@guess-the-artist/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Player extends Document implements IPlayer {
  @Prop({ unique: true, required: true })
  nickname: string;

  @Prop({ index: -1, default: 0 })
  maxScore: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
