import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PuntuacionComponent } from './components/puntuacion/puntuacion.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { PlayerConfigComponent } from './components/players/player-config/player-config.component';
import { RoundSummaryComponent } from './components/summary/summary.component';




const routes: Routes = [
  { path: 'puntuacion', component: PuntuacionComponent, data: {animation: 'PuntuacionPage' }},
  { path: 'player-config', component: PlayerConfigComponent, data: {animation: 'PlayerConfigPage'} },
  { path: '', component: LandingPageComponent, data: {animation: 'LandingPage'} },  // La ruta raíz dirigirá a la landing page
  { path: 'ranking', component: RankingComponent, data: {animation: 'RankingPage' }},
  { path: 'summary', component: RoundSummaryComponent},

  // Otras rutas de la aplicación...
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
