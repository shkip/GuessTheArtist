import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAlbum } from '@guess-the-artist/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAlbumsByRandomArtist() {
    return this.http.get<IAlbum[]>(
      this.apiUrl + '/game/albums-by-random-artist'
    );
  }
}
