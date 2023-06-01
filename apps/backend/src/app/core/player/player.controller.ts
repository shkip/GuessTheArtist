import { IPlayerQuery } from '@guess-the-artist/interfaces';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  findAll(@Query() query: IPlayerQuery) {
    return this.playerService.findAll(query);
  }

  @Post()
  upsert(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.upsert(createPlayerDto);
  }
}
