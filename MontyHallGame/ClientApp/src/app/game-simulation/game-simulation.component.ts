import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-game-simulation',
  templateUrl: './game-simulation.component.html',
  styleUrls: ['./game-simulation.component.css']
})
export class GameSimulationComponent {
  numGames: number = 1000;
  changeDoor: boolean = true;
  loading: boolean = false;
  successfulGuesses: number = -1;
  successPercentage: number | null = null;

  constructor(private gameService: GameService, private toastr: ToastrService) {}

  simulate(): void {
    this.loading = true;
    this.gameService.simulateGames(this.numGames, this.changeDoor)
      .subscribe(
        successfulGuesses => {
          this.successfulGuesses = successfulGuesses; 
          this.calculateSuccessPercentage(successfulGuesses);
          this.getStrokeDashArray();
          this.loading = false;
        },
        error => {
          this.toastr.error('Backend request failed', 'Error');
          this.loading = false;
        }
      );
  }

  calculateSuccessPercentage(successfulGuesses: number) {
    this.successPercentage = Math.round((successfulGuesses / this.numGames) * 100);
  }

  getStrokeDashArray(): string {
    if (this.successPercentage !== null && this.successPercentage > 0) {
      const circumference = 2 * Math.PI * 45;
      const dashArray = `${(this.successPercentage / 100) * circumference} ${circumference}`;
      return dashArray;
    }
    return '0 100';
  }

  getStrokeColor(): string {
    if (this.successPercentage !== null && this.successPercentage === 0) {
      return 'transparent';
    }
    return '#007bff';
  }
}
