import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreModule } from '../../core/core.module';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CoreModule,
    CommonModule,
    GameRoutingModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
})
export class GameModule {}
