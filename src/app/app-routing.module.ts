import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PuntuacionComponent } from './components/puntuacion/puntuacion.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { PlayerConfigComponent } from './components/players/player-config/player-config.component';
import { RoundSummaryComponent } from './components/summary/summary.component';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';
import { AccessGuard } from './access.guard';

const routes: Routes = [
  { path: 'puntuacion', component: PuntuacionComponent, canActivate: [AccessGuard]},
  { path: 'player-config', component: PlayerConfigComponent, canActivate: [AccessGuard] },
  { path: '', component: LandingPageComponent},  // La ruta raíz dirigirá a la landing page
  { path: 'ranking', component: RankingComponent, canActivate: [AccessGuard]},
  { path: 'summary', component: RoundSummaryComponent, canActivate: [AccessGuard]},
  { path: 'instrucciones', component: InstruccionesComponent,canActivate: [AccessGuard]},
  { path: '**', redirectTo: '' }

  // Otras rutas de la aplicación...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
