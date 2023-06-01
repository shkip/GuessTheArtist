import { IQuery } from './query.interface';

export interface IPlayer {
  _id?: string;
  nickname: string;
  maxScore: number;
}

export interface IPlayerInput {
  nickname: string;
  maxScore: number;
}

export interface IPlayerQuery extends IQuery<IPlayer> {
  nickname?: string;
}
