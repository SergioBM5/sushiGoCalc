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
    this.currentRound = this.round // Obtener la ronda actual del servicio
  }

  ngOnInit(): void {}


  getPointsForRound(player: PlayerData,currentRound:number): number {
    
    return player.pointsRound[currentRound - 1];
  }

  nextRound(players: PlayerData[], currentRound: number): void {
    players.forEach((player) => {
      // Inicializa los arrays si no están definidos
      player.gyozaCount[currentRound + 1] = player.gyozaCount[currentRound + 1] || 0;
      player.makiCount[currentRound + 1] = player.makiCount[currentRound + 1] || 0;
      player.nigiriEggCount[currentRound + 1] = player.nigiriEggCount[currentRound + 1] || 0;
      player.nigiriSalmonCount[currentRound + 1] = player.nigiriSalmonCount[currentRound + 1] || 0;
      player.nigiriSquidCount[currentRound + 1] = player.nigiriSquidCount[currentRound + 1] || 0;
      player.wasabiCount[currentRound + 1] = player.wasabiCount[currentRound + 1] || 0;
      player.sashimiCount[currentRound + 1] = player.sashimiCount[currentRound + 1] || 0;
      player.tempuraCount[currentRound + 1] = player.tempuraCount[currentRound + 1] || 0;
      player.tempurapoints[currentRound + 1] = player.tempurapoints[currentRound + 1] || 0;
      player.nigiriEggpoints[currentRound + 1] = player.nigiriEggpoints[currentRound + 1] || 0;
      player.nigiriSalmonpoints[currentRound + 1] = player.nigiriSalmonpoints[currentRound + 1] || 0;
      player.nigirisquidpoints[currentRound + 1] = player.nigirisquidpoints[currentRound + 1] || 0;
      player.sashimipoints[currentRound + 1] = player.sashimipoints[currentRound + 1] || 0;
      player.gyozaPoints[currentRound + 1] = player.gyozaPoints[currentRound + 1] || 0;
      player.puddingPoints[currentRound + 1] = player.puddingPoints[currentRound + 1] || 0;
      player.totalPuddings[currentRound] = (player.totalPuddings[currentRound] || 0) + (player.puddingCount[currentRound] || 0);
      player.puddingCount[currentRound + 1] = 0;
    });
  }
  lastRound(players: PlayerData[], currentRound: number): void {
    players.forEach((player) => {
        player.pointsRound[currentRound - 1] = 0;     
    });
  }

  goToNextRound(): void {
    this.nextRound(this.players,this.currentRound);
    this.currentRound = this.currentRound + 1;
    this.router.navigateByUrl('/puntuacion', { state: { players: this.players, round: this.currentRound } });
  }

  goBack(): void {
    this.lastRound(this.players,this.currentRound)
    this.router.navigate(['/puntuacion'], { state: { players: this.players,  round: this.currentRound } });
  }
}
