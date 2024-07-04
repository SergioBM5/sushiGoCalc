import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PuntuacionComponent } from './components/puntuacion/puntuacion.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { PlayerConfigComponent } from './components/players/player-config/player-config.component';
import { RoundSummaryComponent } from './components/summary/summary.component';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';
import { ReviewComponent } from './components/review/review.component';

const routes: Routes = [
  { path: 'puntuacion', component: PuntuacionComponent},
  { path: 'player-config', component: PlayerConfigComponent },
  { path: '', component: LandingPageComponent},  // La ruta raíz dirigirá a la landing page
  { path: 'ranking', component: RankingComponent },
  { path: 'summary', component: RoundSummaryComponent, },
  { path: 'instrucciones', component: InstruccionesComponent},
  { path: 'review', component: ReviewComponent},
  { path: '**', redirectTo: '' }

  // Otras rutas de la aplicación...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
