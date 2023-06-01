import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { IItunesResponse, IItunesAlbum } from './itunes.interface';

@Injectable()
export class ItunesService {
  constructor(private readonly httpService: HttpService) {}

  async findAlbums(artistName: string, limit: number): Promise<IItunesAlbum[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<IItunesResponse<IItunesAlbum>>('https://itunes.apple.com/search', {
          params: {
            term: artistName,
            limit: limit,
            entity: 'album',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            Logger.error(error.response.data);
            throw 'An error happened!';
          })
        )
    );
    return data.results;
  }
}
