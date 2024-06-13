import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerConfigService } from '../../services/PlayersService';
import { PlayerData } from '../../services/playerDataModel';
import { RoundService } from '../../services/roundService';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrl: './puntuacion.component.css',
})

export class PuntuacionComponent implements OnInit {
  players: PlayerData[] = [];
  totalPointsByRound: number[][] = [];
  currentRound: number = 1
  constructor(private router: Router, private playerConfigService: PlayerConfigService, private roundService: RoundService) {
  }

  ngOnInit(): void {
    this.players = this.playerConfigService.getPlayerData();
    this.totalPointsByRound = new Array(this.players.length).fill(0).map(() => []);
    this.currentRound = this.roundService.getCurrentRound(); 
  }

  resetearPuntos(players: PlayerData[]): void {
    players.forEach((player) => {
      player.totalPoints = 0;
      player.gyozaCount = 0;
      player.makiCount = 0;
      player.nigiriEggCount = 0;
      player.nigiriSalmonCount = 0;
      player.nigiriSquidCount = 0;
      player.totalPuddings = 0;
      player.sashimiCount = 0;
      player.tempuraCount = 0;
      player.pointsRound1 = 0;
      player.pointsRound2 = 0;
      player.pointsRound3 = 0;
      player.tempurapoints = 0;
      player.nigiriEggpoints = 0;
      player.nigiriSalmonpoints = 0;
      player.nigirisquidpoints = 0;
      player.sashimipoints = 0;
      player.gyozaPoints = 0;
      player.puddingPoints = 0;
    });
  }

  calcularPuntosMakis(roundNumber: number): void {

    // Encuentra el máximo número de makis
    let maxMakiCount = Math.max(...this.players.map(p => p.makiCount));

    if(maxMakiCount!= 0){
    
    // Encuentra los jugadores con el número máximo de makis
    const topPlayers: PlayerData[] = this.players.filter(p => p.makiCount === maxMakiCount);

    // Asigna los puntos para los jugadores con el número máximo de makis
    if (topPlayers.length === 1) {
      this.updateRoundPoints(topPlayers[0].index, roundNumber, 6);

      // Encuentra el segundo máximo número de makis
      let secondMaxMakiCount = Math.max(...this.players.filter(p => p.makiCount < maxMakiCount).map(p => p.makiCount));

      // Encuentra los jugadores con el segundo máximo número de makis
      const secondPlacePlayers: PlayerData[] = this.players.filter(p => p.makiCount === secondMaxMakiCount);

      if (secondPlacePlayers.length > 0) {
        const pointsForSecondPlace = Math.floor(3 / secondPlacePlayers.length);
        secondPlacePlayers.forEach(p => {
          this.updateRoundPoints(p.index, roundNumber, pointsForSecondPlace);
        });
      }
    } else {
      const pointsPerPlayer = Math.floor(6 / topPlayers.length);
      topPlayers.forEach(p => {
        this.updateRoundPoints(p.index, roundNumber, pointsPerPlayer);
      });
    }
  }
  else{return}
  }
  

  calcularPuntosTempuras(player: PlayerData, roundNumber: number): void {

    const tempuraPairs = Math.floor(player.tempuraCount / 2);
    const points = tempuraPairs * 5;

    if (player.tempurapoints !== points && player.tempurapoints !== 0) {
      player.tempurapoints -= player.tempurapoints;
      this.updateRoundPoints(player.index, roundNumber, points);
      player.tempurapoints = points;
    } else {
      this.updateRoundPoints(player.index, roundNumber, points);
      player.tempurapoints = points;
    }
  }

  calcularPuntosNigiris(player: PlayerData, roundNumber: number): void {

    let totalNigiriPoints;
    player.nigirisquidpoints += player.nigiriSquidCount * 3;
    player.nigiriSalmonpoints += player.nigiriSalmonCount * 2;
    player.nigiriEggpoints += player.nigiriEggCount;

    const wasabiSquid = (document.getElementById("wasabiSquid") as HTMLInputElement).checked;
    const wasabiSalmon = (document.getElementById("wasabiSalmon") as HTMLInputElement).checked;
    const wasabiEgg = (document.getElementById("wasabiEgg") as HTMLInputElement).checked;

    if (wasabiSquid && player.nigiriSquidCount !== 0) {
      player.nigirisquidpoints += 9; // Sumar 9 puntos adicionales por cada nigiri de calamar con wasabi
    }
    if (wasabiSalmon && player.nigiriSalmonCount !== 0) {
      player.nigiriSalmonpoints += 6; // Sumar 6 puntos adicionales por cada nigiri de salmón con wasabi
    }
    if (wasabiEgg && player.nigiriEggCount !== 0) {
      player.nigiriEggpoints += 3; // Sumar 3 puntos adicionales por cada nigiri de huevo con wasabi
    }

    totalNigiriPoints = player.nigiriEggpoints + player.nigiriSalmonpoints + player.nigirisquidpoints;
    this.updateRoundPoints(player.index, roundNumber, totalNigiriPoints);
  }

  calcularPuntosSashimis(player: PlayerData,roundNumber:number): void {
    const sashimiTrios = Math.floor(player.sashimiCount / 3);
    const points = sashimiTrios * 10;
    this.updateRoundPoints(player.index, roundNumber, points);
  }

  calcularPuntosGyozas(player: PlayerData,roundNumber:number): void {
    let points = 0;
    switch (player.gyozaCount) {
      case 1:
        points = 1;
        break;
      case 2:
        points = 3;
        break;
      case 3:
        points = 6;
        break;
      case 4:
        points = 10;
        break;
      default:
        if (player.gyozaCount >= 5) {
          points = 15;
        }
    }
    this.updateRoundPoints(player.index, roundNumber, points); // Almacena los puntos de gyoza en el jugador
  }

  calcularPuntosPuddings(player: PlayerData, roundNumber: number): void {
    let points = 0;
    if (roundNumber === 3) {
      const maxPuddings = Math.max(...this.players.map(player => player.totalPuddings));
      const minPuddings = Math.min(...this.players.map(player => player.totalPuddings));

      if (player.totalPuddings === maxPuddings) {
        const maxPlayers = this.players.filter(p => p.totalPuddings === maxPuddings).length;
        points += Math.floor(6 / maxPlayers);
      }

      if (player.totalPuddings === minPuddings) {
        const minPlayers = this.players.filter(p => p.totalPuddings === minPuddings).length;
        points -= Math.floor(6 / minPlayers);
      }
    }
    this.updateRoundPoints(player.index,roundNumber,points)
  }

  updateRoundPoints(playerIndex: number, roundNumber: number, points: number): void {
    if (playerIndex >= 0 && playerIndex < this.players.length) {
      const player = this.players[playerIndex];
      if (roundNumber === 1) {
        player.pointsRound1 += points;
      } else if (roundNumber === 2) {
        player.pointsRound2 += points;
      } else if (roundNumber === 3) {
        player.pointsRound3 += points;
      }
    } else {
      console.error(`Player index ${playerIndex} is out of range.`);
    }
  }

  getRoundPointsForPlayer(): void {
    this.calcularPuntosMakis(this.currentRound);
    this.players.forEach(player => {
      this.calcularPuntosTempuras(player, this.currentRound);
      this.calcularPuntosNigiris(player, this.currentRound);
      this.calcularPuntosSashimis(player,this.currentRound);
      this.calcularPuntosGyozas(player, this.currentRound);
    if(this.currentRound == 3){
    this.calcularPuntosPuddings(player, this.currentRound);
    }
  });
  }

  getFinalPointsForPlayers(): void {
    this.players.forEach(player => {
      player.totalPoints=player.pointsRound1+player.pointsRound2+player.pointsRound3;
    });
  }

  showRoundSummary(): void {
    this.getRoundPointsForPlayer();
    this.getFinalPointsForPlayers();
    this.router.navigate(['/summary'], { state: { players: this.players, round: this.currentRound - 1 } });
  }

  finishGame(): void {
    this.getRoundPointsForPlayer();
    this.getFinalPointsForPlayers();
    this.router.navigate(['/ranking'], { state: { players: this.players } });
    this.roundService.resetRound(); // Reinicia la ronda en el servicio
    this.currentRound = this.roundService.getCurrentRound(); // Actualiza la ronda actual desde el servicio
  }
}
