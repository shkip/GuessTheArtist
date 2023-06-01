import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IPlayer, IPlayerInput } from '@guess-the-artist/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  savePlayer(playerDto: IPlayerInput) {
    return this.http.post<IPlayer>(this.apiUrl + '/players', playerDto);
  }

  topRatedPlayers() {
    return this.http.get<IPlayer[]>(this.apiUrl + '/players', {
      params: { limit: 3, sortField: 'maxScore', sortOrder: -1 },
    });
  }
}
