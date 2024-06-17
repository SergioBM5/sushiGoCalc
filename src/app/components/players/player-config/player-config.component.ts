import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerConfigService } from '../../../services/PlayersService';
import { PlayerData } from '../../../services/playerDataModel';
@Component({
  selector: 'app-player-config',
  templateUrl: './player-config.component.html',
  styleUrls: ['./player-config.component.css']
})
export class PlayerConfigComponent {

  constructor(private router: Router, private playerConfigService: PlayerConfigService) {}

  players: PlayerData[] = [{
    index: 0,
    playerName: '',
    makiCount: 0,
    tempuraCount: 0,
    nigiriSquidCount: 0,
    nigiriSalmonCount: 0,
    nigiriEggCount: 0,
    wasabiCount: 0,
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
  }]; // Arreglo de jugadores inicializado con un jugador vacío
  playerName: boolean = false; 
  showAddButton: boolean = true;
  startGame: boolean = false;
  newPlayer: string = ''; // Nuevo jugador a agregar
  
  getPlayers(): PlayerData[] {
  return this.playerConfigService.getPlayerData();
  }

  addPlayer(): void {
    if (this.players.length < 5) {
      const newPlayer: PlayerData = {
        index: this.players.length > 0 ? Math.max(...this.players.map(p => p.index)) + 1 : 0,
        playerName: '',
        makiCount: 0,
        tempuraCount: 0,
        nigiriSquidCount: 0,
        nigiriSalmonCount: 0,
        nigiriEggCount: 0,
        wasabiCount: 0,
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
      };
      this.players.push(newPlayer);
      this.updateAddButtonVisibility();
      this.playerConfigService.setPlayerData(this.players);
    }
    console.log('Added players: ', this.players);
    console.log( this.players.length);
  }
  

  deletePlayer(index: number): void {
    this.players.splice(index, 1); // Elimina el jugador en el índice dado
    this.updateAddButtonVisibility();
  
  }

  private updatePlayerIndexes(): void {
    this.players.forEach((player, index) => {
      player.index = index;
    });
  }

  private updateAddButtonVisibility(): void {
    this.showAddButton = this.players.length < 5; // Actualiza la visibilidad del botón de agregar
  }

  updatePlayer(newName: string, index: number): void {
    // Verifica si el índice está dentro del rango válido
    if (index >= 0 && index < this.players.length) {
      // Verifica si el elemento en el índice dado está definido
      if (this.players[index]) {
        this.players[index].playerName = newName; // Actualiza el nombre del jugador en el índice dado
      } else {
        console.error('Elemento en el índice dado es undefined:', this.players[index]);
      }
    } else {
      console.error('Índice fuera del rango:', index);
    }
  }

  play():void{
    switch(this.players.length) {

    case 1:
      throw alert('Debe introducir al menos dos jugadores');
    default:
      this.players.forEach(player => {
        if(player.playerName != "")
        this.playerName = true
        else this.playerName = false;
      });
      this.startGame = this.players.length >=2 && this.playerName == true; // Actualiza la visibilidad del botón de agregar
      if(this.startGame) {
           this.router.navigateByUrl('/puntuacion');
          }
    else throw alert('Debe introducir todos los nombres de los jugadores');
}
  }
}
