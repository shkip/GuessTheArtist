import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAlbum } from '@guess-the-artist/interfaces';
import { shuffle } from 'lodash';
import { Observable, Subject, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AlbumService } from '../../core/services/album.service';
import { ArtistService } from '../../core/services/artist.service';
import { GameResultDialogService } from '../../core/services/dialogs/game-result-dialog.service';
import { GameStateService } from '../../core/services/game-state.service';

@Component({
  selector: 'guess-the-artist-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  albums: IAlbum[];
  artists: string[];
  isErrored: boolean;
  isGameOver: boolean;
  isLoading: boolean;
  roundSubject: Subject<number>;

  constructor(
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly gameStateService: GameStateService,
    private readonly snackBar: MatSnackBar,
    private readonly gameResultDialogService: GameResultDialogService
  ) {
    this.albums = [];
    this.artists = [];
    this.isLoading = false;
    this.isErrored = false;
    this.isGameOver = false;
    this.roundSubject = this.gameStateService.getRound();
  }

  checkRound(album: IAlbum, artist: string) {
    // Correct answer
    if (artist === album.artist) {
      // "When the user guesses the correct answer, he gets 5 points and the game is over"
      this.gameStateService.incrementScore(5);
      this.gameOver();
      this.snackBar.open(`✅ Correct!`, 'OK', { duration: 1000 });
      return;
    }

    // Incorrect answer
    this.snackBar.open(`❌ Incorrect!`, 'OK', { duration: 1000 });
    if (this.gameStateService.getRound().getValue() === 5) {
      this.gameOver();
      return;
    }
    this.gameStateService.incrementRound(1);
  }

  gameOver(): void {
    this.isGameOver = true;
    this.gameResultDialogService
      .openDialog()
      .subscribe(() => this.initNewGame());
  }

  initNewGame(): void {
    this.gameStateService.startNewGame();
    this.isGameOver = false;
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.isLoading = true;
    this.isErrored = false;
    this.getAlbums().subscribe({
      error: () => (this.isErrored = true),
      complete: () => (this.isLoading = false),
    });
  }

  loadAlbumsAndArtists(): void {
    this.isLoading = true;
    this.isErrored = false;
    zip(this.getAlbums(), this.getArtists()).subscribe({
      error: () => (this.isErrored = true),
      complete: () => (this.isLoading = false),
    });
  }

  ngOnInit(): void {
    this.loadAlbumsAndArtists();
    this.initNewGame();
  }

  private getAlbums(): Observable<IAlbum[]> {
    return this.albumService.getAlbumsByRandomArtist().pipe(
      map((albums) => shuffle(albums)),
      tap((albums) => (this.albums = albums))
    );
  }

  private getArtists(): Observable<string[]> {
    return this.artistService
      .getArtists()
      .pipe(tap((artists) => (this.artists = artists)));
  }
}
