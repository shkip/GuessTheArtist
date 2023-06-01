import { IPlayerInput } from '@guess-the-artist/interfaces';

export class CreatePlayerDto implements IPlayerInput {
  nickname: string;
  maxScore: number;
}
