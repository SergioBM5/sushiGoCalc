import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerConfigService } from '../../../services/PlayersService';
import { PlayerData } from '../../../services/playerDataModel';
import { TranslateService } from '@ngx-translate/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-player-config',
  templateUrl: './player-config.component.html',
  styleUrls: ['./player-config.component.css']
})
export class PlayerConfigComponent {
  faTrashAlt = faTrashAlt;
  errorMessage: string | null = null;
  showAlertClass = false;

  constructor(private router: Router, private playerConfigService: PlayerConfigService, private translate: TranslateService) {}
  
  switchLanguage(language: string) {
    this.translate.use(language);
  }

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
    if (this.players.length < 2) {
      this.errorMessage = this.translate.instant('ALERT_MISSING_PLAYERS');
      this.showAlert(this.errorMessage);
    } else if (this.players.some(player => !player.playerName.trim())) {
      this.errorMessage = this.translate.instant('ALERT_MISSING_PLAYERS_NAMES');
      this.showAlert(this.errorMessage);
    } else {
      this.errorMessage = null;
      this.playerName = true;
      this.startGame = this.players.length >=2 && this.playerName == true; // Actualiza la visibilidad del botón de agregar
      if(this.startGame) {
           this.router.navigateByUrl('/puntuacion');
          }
  }
  }

  showAlert(message: string | null) {
    this.errorMessage = message;
    this.showAlertClass = true;
    setTimeout(() => {
      this.errorMessage = null;
    }, 500000); // Ocultar la alerta después de 5 segundos
  }
}
