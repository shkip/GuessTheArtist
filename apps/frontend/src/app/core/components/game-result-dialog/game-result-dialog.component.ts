import {
  Component,
  ElementRef,
  Inject,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPlayer } from '@guess-the-artist/interfaces';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'guess-the-artist--game-result-dialog',
  templateUrl: './game-result-dialog.component.html',
  styleUrls: ['./game-result-dialog.component.scss'],
})
export class GameResultDialogComponent {
  @ViewChild('dialogContentView') dialogContentView!: ElementRef;
  form: FormGroup;
  isErrored: boolean;
  isLoading: boolean;
  scoreSubject: BehaviorSubject<number>;
  topRatedPlayers: IPlayer[];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { id: string },
    @Optional() private dialogRef: MatDialogRef<GameResultDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly gameStateService: GameStateService,
    private readonly playerService: PlayerService
  ) {
    this.isErrored = false;
    this.isLoading = false;
    this.topRatedPlayers = [];
    this.scoreSubject = this.gameStateService.getScore();
    this.form = this.formBuilder.group({
      nickname: ['', [Validators.required]],
    });
  }

  save() {
    this.isLoading = true;
    this.isErrored = false;
    const { nickname } = this.form.value;
    this.playerService
      .savePlayer({
        nickname,
        maxScore: this.scoreSubject.getValue(),
      })
      .pipe(
        switchMap(() => this.playerService.topRatedPlayers()),
        tap((players) => (this.topRatedPlayers = players))
      )
      .subscribe({
        error: () => {
          this.isLoading = false;
          this.isErrored = true;
        },
        complete: () => {
          this.isLoading = false;
          this.isErrored = false;
        },
      });
  }
}
