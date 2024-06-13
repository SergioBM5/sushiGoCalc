import { Component, OnInit } from '@angular/core';

import { PlayerConfigService } from '../../services/PlayersService';
import { PlayerData } from '../../services/playerDataModel';
import { Router } from '@angular/router';
import { RoundService } from '../../services/roundService';


interface PlayerRanking {
  playerName: string;
  totalPoints: number;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  
  players: PlayerData[] = [];

  constructor(private router: Router, private PlayerConfigService: PlayerConfigService,  private roundService: RoundService) { } // Corregir el nombre del servicio inyectado

  ngOnInit(): void {
    // Cuando inicializa el componente, obtiene los datos de PlayerData del servicio
    this.players = this.PlayerConfigService.getPlayerData(); // Corregir el nombre del método para obtener los datos del servicio

    console.log(this.players)
    // Ordenar los jugadores por puntos totales de mayor a menor
    this.players.sort((a, b) => b.totalPoints - a.totalPoints);
    
  }
  home():void{
    this.router.navigateByUrl('/');
   }

   newGame():void{
    this.resetearPuntos(this.players)
    this.home();
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
  
 
}
