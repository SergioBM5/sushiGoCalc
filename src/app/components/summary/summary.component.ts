import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerData } from '../../services/playerDataModel';
import { RoundService } from '../../services/roundService';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class RoundSummaryComponent implements OnInit {
  players: PlayerData[] = [];
  rounds: number[] = [1, 2, 3];
  currentRound: number = 1;
  round: number = 1;

  constructor(private router: Router, private roundService: RoundService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { players: PlayerData[], round: number };
      this.players = state.players;
      this.round = state.round;
    }
    this.currentRound = this.roundService.getCurrentRound(); // Obtener la ronda actual del servicio
  }

  ngOnInit(): void {}

  getPointsForRound(player: PlayerData, round: number): number {
    if (round === 1) {
      return player.pointsRound1;
    } else if (round === 2) {
      return player.pointsRound2;
    } else if (round === 3) {
      return player.pointsRound3;
    }
    return 0;
  }

  goToNextRound(): void {
    this.roundService.incrementRound(); // Incrementar la ronda en el servicio
    this.router.navigateByUrl('/puntuacion');
  }

  goBack(): void {
    this.router.navigate(['/puntuacion']);
  }
}
