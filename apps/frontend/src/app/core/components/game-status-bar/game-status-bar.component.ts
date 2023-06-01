import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'guess-the-artist-game-status-bar',
  templateUrl: './game-status-bar.component.html',
  styleUrls: ['./game-status-bar.component.scss'],
})
export class GameStatusBarComponent {
  scoreSubject: BehaviorSubject<number>;
  roundSubject: BehaviorSubject<number>;

  constructor(private readonly gameStateService: GameStateService) {
    this.scoreSubject = this.gameStateService.getScore();
    this.roundSubject = this.gameStateService.getRound();
  }
}
