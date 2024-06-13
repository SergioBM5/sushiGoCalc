import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  private currentRound: number = 1;

  getCurrentRound(): number {
    return this.currentRound;
  }

  incrementRound(): void {
    this.currentRound++;
  }

  resetRound(): void {
    this.currentRound = 1;
  }

  goToNextRound(): void {
    this.incrementRound(); 
  }
}
