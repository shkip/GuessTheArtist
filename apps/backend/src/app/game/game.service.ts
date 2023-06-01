import { IAlbum } from '@guess-the-artist/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sample } from 'lodash';
import { AlbumService } from '../core/album/album.service';
import { ItunesService } from '../integrations/itunes/itunes.service';

@Injectable()
export class GameService {
  private artists: string[];

  constructor(
    private readonly itunesService: ItunesService,
    private readonly albumService: AlbumService,
    private readonly configService: ConfigService
  ) {
    this.artists = this.configService.get('ARTISTS');
  }

  async getArtists(): Promise<string[]> {
    return this.artists;
  }

  async getAlbumsByRandomArtist(): Promise<IAlbum[]> {
    const randomArtist = sample(this.artists);
    const albums = await this.albumService.getByArtist(randomArtist, 5);
    return albums.length
      ? albums
      : this.getAndSaveAlbumsFromItunesByArtist(randomArtist, 5);
  }

  private async getAndSaveAlbumsFromItunesByArtist(
    artist: string,
    limit: number
  ): Promise<IAlbum[]> {
    const itunesAlbums = await this.itunesService.findAlbums(artist, limit);
    const albums = await this.albumService.createMany(
      itunesAlbums.map((itunesAlbum) => {
        return {
          artist,
          title: itunesAlbum.collectionName,
          img: itunesAlbum.artworkUrl100,
        };
      })
    );
    return albums;
  }
}
