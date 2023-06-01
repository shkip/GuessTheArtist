import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private roundSubject: BehaviorSubject<number>;
  private scoreSubject: BehaviorSubject<number>;

  constructor() {
    this.scoreSubject = new BehaviorSubject(0);
    this.roundSubject = new BehaviorSubject(1);
  }

  private get round() {
    return this.roundSubject.getValue();
  }

  private set round(roundNumber: number) {
    this.roundSubject.next(roundNumber);
  }

  private get score() {
    return this.scoreSubject.getValue();
  }

  private set score(points: number) {
    this.scoreSubject.next(points);
  }

  getRound(): BehaviorSubject<number> {
    return this.roundSubject;
  }

  getScore(): BehaviorSubject<number> {
    return this.scoreSubject;
  }

  incrementScore(points = 1) {
    this.score += points;
  }

  incrementRound(rounds = 1) {
    this.round += rounds;
  }

  startNewGame() {
    this.round = 1;
    this.score = 0;
  }
}
