import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameResultDialogComponent } from '../../components/game-result-dialog/game-result-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class GameResultDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    return this.dialog
      .open(GameResultDialogComponent, {
        disableClose: true,
        data: {},
      })
      .afterClosed();
  }
}
