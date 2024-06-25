import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PlayerConfigComponent } from './components/players/player-config/player-config.component';
import { PuntuacionComponent } from './components/puntuacion/puntuacion.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoundSummaryComponent } from './components/summary/summary.component';
import { AppTranslateModule } from './app.translate';
import { HttpClientModule } from '@angular/common/http';
import { InstruccionesComponent } from './components/instrucciones/instrucciones.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    PlayerConfigComponent,
    LandingPageComponent,
    PuntuacionComponent,
    RankingComponent,
    RoundSummaryComponent,
    InstruccionesComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppTranslateModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


