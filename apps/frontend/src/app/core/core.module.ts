import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameResultDialogComponent } from './components/game-result-dialog/game-result-dialog.component';
import { GameStatusBarComponent } from './components/game-status-bar/game-status-bar.component';
import { GameResultDialogService } from './services/dialogs/game-result-dialog.service';

@NgModule({
  declarations: [GameResultDialogComponent, GameStatusBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  exports: [GameStatusBarComponent],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    GameResultDialogService,
  ],
})
export class CoreModule {}
