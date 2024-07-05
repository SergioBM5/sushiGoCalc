import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerData } from '../../services/playerDataModel';
import { PlayerConfigService } from '../../services/PlayersService';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  players: PlayerData[] = [];
  rounds: number[] = [1, 2, 3];
  currentRound: number = 1;
  round: number = 1;
  
  constructor(private router: Router,private PlayerConfigService: PlayerConfigService,) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { players: PlayerData[], round: number };
      this.players = state.players;
      this.round = state.round;
    }
    this.currentRound = this.round // Obtener la ronda actual del servicio
  }

  ngOnInit(): void {
    this.players = this.PlayerConfigService.getPlayerData(); // Corregir el nombre del método para obtener los datos del servicio
    this.players.sort((a, b) => a.index - b.index);
  }

  goBack(): void {
  
    this.router.navigate(['/ranking'], { state: { players: this.players,  round: this.currentRound } });
  }
  goTo(round: number, fromReview: boolean = false) {
    // Lógica para navegar a la ronda especificada
    this.router.navigate(['/puntuacion'], { state: { players: this.players,  round: round, fromReview } });
  }


}
