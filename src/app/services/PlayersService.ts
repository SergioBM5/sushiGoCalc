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
    makiCount: 0,
    tempuraCount: 0,
    nigiriSquidCount: 0,
    nigiriSalmonCount: 0,
    nigiriEggCount: 0,
    sashimiCount: 0,
    gyozaCount: 0,
    puddingCount: 0,
    totalPoints: 0, 
    totalPuddings: 0,
    pointsRound1: 0,
    pointsRound2: 0,
    pointsRound3: 0,
    makipoints: 0,
    tempurapoints: 0,
    nigirisquidpoints: 0,
    nigiriSalmonpoints: 0,
    nigiriEggpoints: 0,
    sashimipoints: 0,
    gyozaPoints: 0,
    puddingPoints: 0
  },
  {
    index: 1,
    playerName: 'Jugador 2',
    makiCount: 0,
    tempuraCount: 0,
    nigiriSquidCount: 0,
    nigiriSalmonCount: 0,
    nigiriEggCount: 0,
    sashimiCount: 0,
    gyozaCount: 0,
    puddingCount: 0,
    totalPoints: 0,
    totalPuddings: 0,
    pointsRound1: 0,
    pointsRound2: 0,
    pointsRound3: 0,
    makipoints: 0,
    tempurapoints: 0,
    nigirisquidpoints: 0,
    nigiriSalmonpoints: 0,
    nigiriEggpoints: 0,
    sashimipoints: 0,
    gyozaPoints: 0,
    puddingPoints: 0
  },
  {
    index: 2,
    playerName: 'Jugador 3',
    makiCount: 0,
    tempuraCount: 0,
    nigiriSquidCount: 0,
    nigiriSalmonCount: 0,
    nigiriEggCount: 0,
    sashimiCount: 0,
    gyozaCount: 0,
    puddingCount: 0,
    totalPoints: 0,
    totalPuddings: 0,
    pointsRound1: 0,
    pointsRound2: 0,
    pointsRound3: 0,
    makipoints: 0,
    tempurapoints: 0,
    nigirisquidpoints: 0,
    nigiriSalmonpoints: 0,
    nigiriEggpoints: 0,
    sashimipoints: 0,
    gyozaPoints: 0,
    puddingPoints: 0
  },
  {
    index: 3,
    playerName: 'Jugador 4',
    makiCount: 0,
    tempuraCount: 0,
    nigiriSquidCount: 0,
    nigiriSalmonCount: 0,
    nigiriEggCount: 0,
    sashimiCount: 0,
    gyozaCount: 0,
    puddingCount: 0,
    totalPoints: 0,
    totalPuddings: 0,
    pointsRound1: 0,
    pointsRound2: 0,
    pointsRound3: 0,
    makipoints: 0,
    tempurapoints: 0,
    nigirisquidpoints: 0,
    nigiriSalmonpoints: 0,
    nigiriEggpoints: 0,
    sashimipoints: 0,
    gyozaPoints: 0,
    puddingPoints: 0
  },
  {
    index: 4,
    playerName: 'Jugador 5',
    makiCount: 0,
    tempuraCount: 0,
    nigiriSquidCount: 0,
    nigiriSalmonCount: 0,
    nigiriEggCount: 0,
    sashimiCount: 0,
    gyozaCount: 0,
    puddingCount: 0,
    totalPoints: 0,
    totalPuddings: 0,
    pointsRound1: 0,
    pointsRound2: 0,
    pointsRound3: 0,
    makipoints: 0,
    tempurapoints: 0,
    nigirisquidpoints: 0,
    nigiriSalmonpoints: 0,
    nigiriEggpoints: 0,
    sashimipoints: 0,
    gyozaPoints: 0,
    puddingPoints: 0
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
    if (playerIndex >= 0 && playerIndex < this.PlayerData.length) {
      this.PlayerData[playerIndex].totalPoints = totalPoints;
    } else {
      console.error(`Player index ${playerIndex} is out of range.`);
    }
  }
}
