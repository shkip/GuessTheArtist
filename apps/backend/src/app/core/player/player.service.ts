import { IPlayerQuery, SortOrder } from '@guess-the-artist/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './models/player.model';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>
  ) {}

  async findAll(query: IPlayerQuery): Promise<Player[]> {
    return this.playerModel
      .find(this.queryBuilder(query))
      .skip(query.offset || 0)
      .limit(query.limit || 5)
      .sort(this.sortBuilder(query))
      .exec();
  }

  async findOneByNickname(nickname: string): Promise<Player | null> {
    const nicknameRegex = new RegExp('^' + nickname.trim() + '$', 'i');
    return this.playerModel.findOne({ nickname: nicknameRegex }).exec();
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { nickname, maxScore } = createPlayerDto;
    return this.playerModel.create({ nickname, maxScore });
  }

  async upsert(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { nickname, maxScore } = createPlayerDto;
    const findedPlayer = await this.findOneByNickname(nickname);
    if (!findedPlayer) {
      return this.create(createPlayerDto);
    }
    if (findedPlayer.maxScore < maxScore) {
      findedPlayer.maxScore = maxScore;
      await findedPlayer.save();
    }
    return findedPlayer;
  }

  private queryBuilder({
    nickname,
  }: Partial<IPlayerQuery>): FilterQuery<Player> {
    const query: FilterQuery<Player> = {};
    if (nickname) {
      query.$or = [{ nickname: { $regex: nickname, $options: 'i' } }];
    }
    return query;
  }

  private sortBuilder({ sortField, sortOrder }: Partial<IPlayerQuery>): {
    [key: string]: SortOrder;
  } {
    const sort: { [key: string]: SortOrder } = {};
    if (sortField) {
      sort[sortField] = sortOrder || 1;
    }
    return sort;
  }
}
