import { Injectable } from '@angular/core';
import { PlayerData } from './playerDataModel';


@Injectable({
  providedIn: 'root'
})
export class PlayerConfigService {
  players: string[] = []; // Arreglo de jugadores inicializado con un jugador vacío
  private playerData: PlayerData[] = [];

  constructor() { }

 // Define el arreglo de datos de figuras para los jugadores
 PlayerData: PlayerData[] = [
  {
    index: 0,
    playerName: 'Jugador 1',
    makis:0,
    tempuras:0,
    nigiriSquid:0,
    nigiriSalmon:0,
    nigiriEgg:0,
    wasabi:0,
    sashimi:0,
    gyoza:0,
    pudding:0,
    totalPudding:0,
    makiCount: [0,0,0],
    makipoints: [0,0,0],
    tempuraCount: [0,0,0],
    tempurapoints: [0,0,0],
    nigiriSquidCount: [0,0,0],
    nigirisquidpoints: [0,0,0],
    nigiriSalmonCount: [0,0,0],
    nigiriSalmonpoints: [0,0,0],
    nigiriEggCount: [0,0,0],
    nigiriEggpoints: [0,0,0],
    wasabiCount: [0,0,0],
    sashimiCount: [0,0,0],
    sashimipoints: [0,0,0],
    gyozaCount: [0,0,0],
    gyozaPoints: [0,0,0],
    puddingCount: [0,0,0],
    puddingPoints: [0,0,0],
    totalPoints: 0,
    totalPuddings: [0,0,0],
    pointsRound: [0,0,0]
  },
  {
    index: 1,
    playerName: 'Jugador 2',
    makis:0,
    tempuras:0,
    nigiriSquid:0,
    nigiriSalmon:0,
    nigiriEgg:0,
    wasabi:0,
    sashimi:0,
    gyoza:0,
    pudding:0,
    totalPudding:0,
    makiCount: [0,0,0],
    makipoints: [0,0,0],
    tempuraCount: [0,0,0],
    tempurapoints: [0,0,0],
    nigiriSquidCount: [0,0,0],
    nigirisquidpoints: [0,0,0],
    nigiriSalmonCount: [0,0,0],
    nigiriSalmonpoints: [0,0,0],
    nigiriEggCount: [0,0,0],
    nigiriEggpoints: [0,0,0],
    wasabiCount: [0,0,0],
    sashimiCount: [0,0,0],
    sashimipoints: [0,0,0],
    gyozaCount: [0,0,0],
    gyozaPoints: [0,0,0],
    puddingCount: [0,0,0],
    puddingPoints: [0,0,0],
    totalPoints: 0,
    totalPuddings: [0,0,0],
    pointsRound: [0,0,0]
  },
  {
    index: 2,
    playerName: 'Jugador 2',
    makis:0,
    tempuras:0,
    nigiriSquid:0,
    nigiriSalmon:0,
    nigiriEgg:0,
    wasabi:0,
    sashimi:0,
    gyoza:0,
    pudding:0,
    totalPudding:0,
    makiCount: [0,0,0],
    makipoints: [0,0,0],
    tempuraCount: [0,0,0],
    tempurapoints: [0,0,0],
    nigiriSquidCount: [0,0,0],
    nigirisquidpoints: [0,0,0],
    nigiriSalmonCount: [0,0,0],
    nigiriSalmonpoints: [0,0,0],
    nigiriEggCount: [0,0,0],
    nigiriEggpoints: [0,0,0],
    wasabiCount: [0,0,0],
    sashimiCount: [0,0,0],
    sashimipoints: [0,0,0],
    gyozaCount: [0,0,0],
    gyozaPoints: [0,0,0],
    puddingCount: [0,0,0],
    puddingPoints: [0,0,0],
    totalPoints: 0,
    totalPuddings: [0,0,0],
    pointsRound: [0,0,0]
  },
  {
    index: 3,
    playerName: 'Jugador 3',
    makis:0,
    tempuras:0,
    nigiriSquid:0,
    nigiriSalmon:0,
    nigiriEgg:0,
    wasabi:0,
    sashimi:0,
    gyoza:0,
    pudding:0,
    totalPudding:0,
    makiCount: [0,0,0],
    makipoints: [0,0,0],
    tempuraCount: [0,0,0],
    tempurapoints: [0,0,0],
    nigiriSquidCount: [0,0,0],
    nigirisquidpoints: [0,0,0],
    nigiriSalmonCount: [0,0,0],
    nigiriSalmonpoints: [0,0,0],
    nigiriEggCount: [0,0,0],
    nigiriEggpoints: [0,0,0],
    wasabiCount: [0,0,0],
    sashimiCount: [0,0,0],
    sashimipoints: [0,0,0],
    gyozaCount: [0,0,0],
    gyozaPoints: [0,0,0],
    puddingCount: [0,0,0],
    puddingPoints: [0,0,0],
    totalPoints: 0,
    totalPuddings: [0,0,0],
    pointsRound: [0,0,0]
  },
  {
    index: 4,
    playerName: 'Jugador 4',
    makis:0,
    tempuras:0,
    nigiriSquid:0,
    nigiriSalmon:0,
    nigiriEgg:0,
    wasabi:0,
    sashimi:0,
    gyoza:0,
    pudding:0,
    totalPudding:0,
    makiCount: [0,0,0],
    makipoints: [0,0,0],
    tempuraCount: [0,0,0],
    tempurapoints: [0,0,0],
    nigiriSquidCount: [0,0,0],
    nigirisquidpoints: [0,0,0],
    nigiriSalmonCount: [0,0,0],
    nigiriSalmonpoints: [0,0,0],
    nigiriEggCount: [0,0,0],
    nigiriEggpoints: [0,0,0],
    wasabiCount: [0,0,0],
    sashimiCount: [0,0,0],
    sashimipoints: [0,0,0],
    gyozaCount: [0,0,0],
    gyozaPoints: [0,0,0],
    puddingCount: [0,0,0],
    puddingPoints: [0,0,0],
    totalPoints: 0,
    totalPuddings: [0,0,0],
    pointsRound: [0,0,0]
  },
]
  addPlayer(playerName: string): void {
    this.players.push(playerName);
  }

  deletePlayer(playerName: string): void {
    const index = this.players.indexOf(playerName);
    if (index !== -1) {
      this.players.splice(index, 1);
    }
  }

  setPlayerData(data: PlayerData[]): void {
    this.playerData = data;
  }

  getPlayerData(): PlayerData[] {
    return this.playerData;
  }
  setTotalPoints(playerIndex: number, totalPoints: number): void {
    if (playerIndex >= 0 && playerIndex < this.playerData.length) {
      this.playerData[playerIndex].totalPoints = totalPoints;
    } else {
      console.error(`Player index ${playerIndex} is out of range.`);
    }
  }
}