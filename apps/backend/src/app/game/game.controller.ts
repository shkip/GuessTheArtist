import { IAlbum } from '@guess-the-artist/interfaces';
import { Controller, Get } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('albums-by-random-artist')
  findAlbumsByRandomArtist(): Promise<IAlbum[]> {
    return this.gameService.getAlbumsByRandomArtist();
  }

  @Get('artists')
  getArtistsOptions(): Promise<string[]> {
    return this.gameService.getArtists();
  }
}
