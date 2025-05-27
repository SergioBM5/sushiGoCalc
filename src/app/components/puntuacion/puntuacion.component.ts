import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlayerConfigService } from "../../services/PlayersService";
import { PlayerData } from "../../services/playerDataModel";
import { RoundService } from "../../services/roundService";

@Component({
  selector: "app-puntuacion",
  templateUrl: "./puntuacion.component.html",
  styleUrl: "./puntuacion.component.css",
})
export class PuntuacionComponent implements OnInit {
  players: PlayerData[] = [];
  totalPointsByRound: number[][] = [];
  currentRound: number = 1;
  round: number = 1;
  fromReview: boolean = false;

  figuras = [
    { label: 'Maki', field: 'makiCount' },
    { label: 'Tempura', field: 'tempuraCount' },
    { label: 'Nigiri 🦑', field: 'nigiriSquidCount' },
    { label: 'Nigiri 🐟', field: 'nigiriSalmonCount' },
    { label: 'Nigiri 🥚', field: 'nigiriEggCount' },
    { label: 'Wasabi', field: 'wasabiCount' },
    { label: 'Sashimi', field: 'sashimiCount' },
    { label: 'Gyoza', field: 'gyozaCount' },
    { label: 'Pudding', field: 'puddingCount' },
  ] as const;

  constructor(
    private router: Router,
    private playerConfigService: PlayerConfigService,
    private roundService: RoundService,
  ) {
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as { players: PlayerData[], round: number , fromReview: boolean};
      this.players = state.players;
      this.round = state.round;
      this.fromReview = state.fromReview || false;
    }
    this.currentRound = this.round 
  }// Obtener la ronda actual del servicio}

  ngOnInit(): void {
    this.players = this.playerConfigService.getPlayerData();
    this.totalPointsByRound = new Array(this.players.length)
      .fill(0)
      .map(() => []);
  }

  calcularPuntosMakis(roundNumber: number): void {
    let maxMakiCount = Math.max(...this.players.map((p) => p.makiCount[roundNumber-1]));
    if (maxMakiCount !== 0) {
      const topPlayers: PlayerData[] = this.players.filter(
        (p) => p.makiCount[roundNumber - 1] === maxMakiCount
      );
      if (topPlayers.length === 1) {
        this.updateRoundPoints(topPlayers[0].index, roundNumber, 6);
        this.players[topPlayers[0].index].makipoints[roundNumber - 1] = 6;
        let secondMaxMakiCount = Math.max(
          ...this.players
            .filter((p) => p.makiCount[roundNumber - 1] < maxMakiCount)
            .map((p) => p.makiCount[roundNumber - 1]), 0
        );
        if (secondMaxMakiCount > 0) {
          const secondPlacePlayers: PlayerData[] = this.players.filter(
            (p) => p.makiCount[roundNumber - 1] === secondMaxMakiCount
          );
          if (secondPlacePlayers.length > 0) {
            const pointsForSecondPlace = Math.floor(3 / secondPlacePlayers.length);
            secondPlacePlayers.forEach((p) => {
              this.updateRoundPoints(p.index, roundNumber, pointsForSecondPlace);
              this.players[p.index].makipoints[roundNumber - 1] = pointsForSecondPlace;
            });
          }
        }
      } else {
        const pointsPerPlayer = Math.floor(6 / topPlayers.length);
        topPlayers.forEach((p) => {
          this.updateRoundPoints(p.index, roundNumber, pointsPerPlayer);
          this.players[p.index].makipoints[roundNumber - 1] = pointsPerPlayer;
        });
      }
    }
  }

  calcularPuntosTempuras(player: PlayerData, roundNumber: number): void {
    const tempuraPairs = Math.floor(player.tempuraCount[roundNumber - 1] / 2);
    const points = tempuraPairs * 5;
    this.updateRoundPoints(player.index, roundNumber, points);
    player.tempurapoints[roundNumber - 1] = points;
  }

  calcularPuntosNigiris(player: PlayerData, roundNumber: number): void {
    let totalNigiriPoints = 0;
    let nigiriSquidPoints = 0;
    let nigiriSalmonPoints = 0;
    let nigiriEggPoints = 0;
    let remainingWasabiCount = player.wasabiCount[roundNumber - 1];
    if (remainingWasabiCount > 0) {
      let squidNigirisWithWasabi = Math.min(
        remainingWasabiCount,
        player.nigiriSquidCount[roundNumber - 1]
      );
      nigiriSquidPoints +=
        squidNigirisWithWasabi * 9 +
        (player.nigiriSquidCount[roundNumber - 1] - squidNigirisWithWasabi) * 3;
      remainingWasabiCount -= squidNigirisWithWasabi;
    } else {
      nigiriSquidPoints += player.nigiriSquidCount[roundNumber - 1] * 3;
    }
    if (remainingWasabiCount > 0) {
      let salmonNigirisWithWasabi = Math.min(
        remainingWasabiCount,
        player.nigiriSalmonCount[roundNumber - 1]
      );
      nigiriSalmonPoints += salmonNigirisWithWasabi * 6 +
        (player.nigiriSalmonCount[roundNumber - 1] - salmonNigirisWithWasabi) * 2;
      remainingWasabiCount -= salmonNigirisWithWasabi;
    } else {
      nigiriSalmonPoints += player.nigiriSalmonCount[roundNumber - 1] * 2;
    }
    if (remainingWasabiCount > 0) {
      let eggNigirisWithWasabi = Math.min(
        remainingWasabiCount,
        player.nigiriEggCount[roundNumber - 1]
      );
      nigiriEggPoints +=
        eggNigirisWithWasabi * 3 +
        (player.nigiriEggCount[roundNumber - 1] - eggNigirisWithWasabi);
      remainingWasabiCount -= eggNigirisWithWasabi;
    } else {
      nigiriEggPoints += player.nigiriEggCount[roundNumber - 1] * 1;
    }
    totalNigiriPoints = nigiriSquidPoints + nigiriSalmonPoints + nigiriEggPoints;
    this.updateRoundPoints(player.index, roundNumber, totalNigiriPoints);
    player.nigirisquidpoints[roundNumber - 1] = nigiriSquidPoints;
    player.nigiriSalmonpoints[roundNumber - 1] = nigiriSalmonPoints;
    player.nigiriEggpoints[roundNumber - 1] = nigiriEggPoints;
  }

  calcularPuntosSashimis(player: PlayerData, roundNumber: number): void {
    const sashimiTrios = Math.floor(player.sashimiCount[roundNumber - 1] / 3);
    const points = sashimiTrios * 10;
    this.updateRoundPoints(player.index, roundNumber, points);
    player.sashimipoints[roundNumber - 1] = points;
  }

  calcularPuntosGyozas(player: PlayerData, roundNumber: number): void {
    let points = 0;
    switch (player.gyozaCount[roundNumber - 1]) {
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
        if (player.gyozaCount[roundNumber - 1] >= 5) {
          points = 15;
        }
    }
    this.updateRoundPoints(player.index, roundNumber, points);
    player.gyozaPoints[roundNumber - 1] = points;
  }

  calcularPuntosPuddings(player: PlayerData, roundNumber: number): void {
    let points = 0;
    if (roundNumber === 3) {
      // Calcular el total de púdines de cada jugador
      this.players.forEach(player => {
        player.totalPudding = player.puddingCount[0] + player.puddingCount[1] + player.puddingCount[2];
      });

      const allPuddings = this.players.map(player => player.totalPudding);
      const maxPuddings = Math.max(...allPuddings);
      const minPuddings = Math.min(...allPuddings);

      // Si todos tienen la misma cantidad, nadie gana ni pierde puntos
      if (maxPuddings === minPuddings) {
        points = 0;
      } else {
        // Ganadores (más púdines)
        if (player.totalPudding === maxPuddings) {
          const maxPlayers = this.players.filter(
            (p) => p.totalPudding === maxPuddings
          ).length;
          points += Math.floor(6 / maxPlayers);
        }
        // Perdedores (menos púdines)
        if (player.totalPudding === minPuddings) {
          const minPlayers = this.players.filter(
            (p) => p.totalPudding === minPuddings
          ).length;
          points -= Math.floor(6 / minPlayers);
        }
      }
    }
    this.updateRoundPoints(player.index, roundNumber, points);
    player.puddingPoints[roundNumber - 1] = points;
  }

  updateRoundPoints(
    playerIndex: number,
    roundNumber: number,
    points: number
  ): void {
    if (playerIndex >= 0 && playerIndex < this.players.length) {
      const player = this.players[playerIndex];
      player.pointsRound[roundNumber - 1] += points;
    } else {
      console.error(`Player index ${playerIndex} is out of range.`);
    }
  }

  getRoundPointsForPlayer(): void {
    this.players.forEach(player => {
      player.pointsRound[this.currentRound - 1] = 0;
    });
    this.calcularPuntosMakis(this.currentRound);
    this.players.forEach((player) => {
      this.calcularPuntosTempuras(player, this.currentRound);
      this.calcularPuntosNigiris(player, this.currentRound);
      this.calcularPuntosSashimis(player, this.currentRound);
      this.calcularPuntosGyozas(player, this.currentRound);
      if (this.currentRound == 3) {
        this.calcularPuntosPuddings(player, this.currentRound);
      }
    });
  }

  getFinalPointsForPlayers(): void {
    this.players.forEach(player => {
      player.totalPoints = player.pointsRound[0] + player.pointsRound[1] + player.pointsRound[2];
    });
  }

  showRoundSummary(): void {
    this.getRoundPointsForPlayer();
    this.getFinalPointsForPlayers();
    this.router.navigate(["/summary"], {
      state: { players: this.players, round: this.currentRound},
    });
  }

  previousRound(): void {
    if (this.currentRound > 1) {
      this.currentRound--;
      if(this.currentRound == 1){
        this.players.forEach(player => {
          // Asignar los valores de la ronda anterior a las propiedades actuales
          player.makis= player.makiCount[0];
          player.makipoints[0] = player.makipoints[0];
          player.tempuras = player.tempuraCount[0];
          player.tempurapoints[0] = player.tempurapoints[0];
          player.nigiriSquid = player.nigiriSquidCount[0];
          player.nigirisquidpoints[0] = player.nigirisquidpoints[0];
          player.nigiriSalmon = player.nigiriSalmonCount[0];
          player.nigiriSalmonpoints[0] = player.nigiriSalmonpoints[0];
          player.nigiriEgg = player.nigiriEggCount[0];
          player.nigiriEggpoints[0] = player.nigiriEggpoints[0];
          player.wasabi= player.wasabiCount[0];
          player.sashimi = player.sashimiCount[0];
          player.sashimipoints[0]= player.sashimipoints[0];
          player.gyoza = player.gyozaCount[0];
          player.gyozaPoints[0] = player.gyozaPoints[0];
          player.pudding= player.puddingCount[0];
          player.puddingPoints[0] = player.puddingPoints[0];
          player.totalPudding = player.puddingCount[0] + player.puddingCount[1] + player.puddingCount[2];
          player.totalPoints = player.totalPoints - player.pointsRound[0];
          player.pointsRound[0] = 0
        });
      }
      if(this.currentRound == 2){
        this.players.forEach(player => {
          // Asignar los valores de la ronda anterior a las propiedades actuales
          player.makis= player.makiCount[1];
          player.makipoints[1] = player.makipoints[1];
          player.tempuras = player.tempuraCount[1];
          player.tempurapoints[1] = player.tempurapoints[1];
          player.nigiriSquid = player.nigiriSquidCount[1];
          player.nigirisquidpoints[1] = player.nigirisquidpoints[1];
          player.nigiriSalmon = player.nigiriSalmonCount[1];
          player.nigiriSalmonpoints[1] = player.nigiriSalmonpoints[1];
          player.nigiriEgg = player.nigiriEggCount[1];
          player.nigiriEggpoints[1] = player.nigiriEggpoints[1];
          player.wasabi= player.wasabiCount[1];
          player.sashimi = player.sashimiCount[1];
          player.sashimipoints[1]= player.sashimipoints[1];
          player.gyoza = player.gyozaCount[1];
          player.gyozaPoints[1] = player.gyozaPoints[1];
          player.pudding= player.puddingCount[1];
          player.puddingPoints[1] = player.puddingPoints[1];
          player.totalPudding = player.puddingCount[0] + player.puddingCount[1] + player.puddingCount[2];
          player.totalPoints = player.totalPoints - player.pointsRound[1];
          player.pointsRound[1] = 0
        });
      }
      if(this.currentRound == 3){
        this.players.forEach(player => {
          // Asignar los valores de la ronda anterior a las propiedades actuales
          player.makis= player.makiCount[2];
          player.makipoints[2] = player.makipoints[2];
          player.tempuras = player.tempuraCount[2];
          player.tempurapoints[2] = player.tempurapoints[2];
          player.nigiriSquid = player.nigiriSquidCount[2];
          player.nigirisquidpoints[2] = player.nigirisquidpoints[2];
          player.nigiriSalmon = player.nigiriSalmonCount[2];
          player.nigiriSalmonpoints[2] = player.nigiriSalmonpoints[2];
          player.nigiriEgg = player.nigiriEggCount[2];
          player.nigiriEggpoints[2] = player.nigiriEggpoints[2];
          player.wasabi= player.wasabiCount[2];
          player.sashimi = player.sashimiCount[2];
          player.sashimipoints[2]= player.sashimipoints[2];
          player.gyoza = player.gyozaCount[2];
          player.gyozaPoints[2] = player.gyozaPoints[2];
          player.pudding= player.puddingCount[2];
          player.puddingPoints[2] = player.puddingPoints[2];
          player.totalPudding = player.puddingCount[0] + player.puddingCount[1] + player.puddingCount[2];
          player.totalPoints = player.totalPoints - player.pointsRound[2];
          player.pointsRound[2] = 0
        });
      }
    }
  }


  finishGame(): void {
    this.getRoundPointsForPlayer();
    this.getFinalPointsForPlayers();
    this.router.navigate(["/ranking"], { state: { players: this.players } });
    this.roundService.resetRound(); // Reinicia la ronda en el servicio
    this.currentRound = this.roundService.getCurrentRound(); // Actualiza la ronda actual desde el servicio
  }

  increment(player: PlayerData, field: keyof PlayerData, currentRound: number): void {
    if (Array.isArray(player[field])) {
      const currentValue = (player[field] as number[])[currentRound - 1] || 0;
      (player[field] as number[])[currentRound - 1] = currentValue + 1;
    } else {
      throw new Error(`El campo ${String(field)} no es un arreglo y no se puede indexar.`);
    }
  }
  
  decrement(player: PlayerData, field: keyof PlayerData, currentRound: number): void {
    if (Array.isArray(player[field])) {
      const currentValue = (player[field] as number[])[currentRound - 1] || 0;
      if (currentValue > 0) {
        (player[field] as number[])[currentRound - 1] = currentValue - 1;
      }
    } else {
      throw new Error(`El campo ${String(field)} no es un arreglo y no se puede indexar.`);
    }
  }

  goToRound(round: number, fromReview: boolean = false) {
    this.router.navigate(['/puntuacion'], { state: { players: this.players, round, fromReview } });
  }

  finishReview(): void {
    this.players.forEach(player => {
      // Asignar los valores de la ronda anterior a las propiedades actuales
      player.makipoints[this.currentRound - 1] = 0;
      player.tempurapoints[this.currentRound - 1] = 0;
      player.nigirisquidpoints[this.currentRound - 1] = 0;
      player.nigiriSalmonpoints[this.currentRound - 1] = 0;
      player.nigiriEggpoints[this.currentRound - 1] = 0;
      player.sashimipoints[this.currentRound - 1] = 0;
      player.gyozaPoints[this.currentRound - 1] = 0;
      player.puddingPoints[this.currentRound] = 0;
      player.wasabi= player.wasabiCount[this.currentRound - 1];
      player.totalPudding = player.totalPudding - player.puddingCount[this.currentRound - 1];
      player.totalPoints = player.totalPoints - player.pointsRound[this.currentRound - 1];
      player.pointsRound[this.currentRound - 1] = 0
    });
    this.getRoundPointsForPlayer();
    this.getFinalPointsForPlayers();
    this.router.navigate(["/ranking"], { state: { players: this.players } });
  }

  getFiguraValue(player: PlayerData, field: string, currentRound: number): number {
    return (player as any)[field][currentRound - 1] || 0;
  }
}
