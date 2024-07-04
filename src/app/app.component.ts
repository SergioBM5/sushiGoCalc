import { Component } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  isInstruccionesPage: boolean = false;
  showHomeIcon: boolean = true;

  constructor(private translate: TranslateService,private router: Router) {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  home() {
    this.router.navigate(['/']); // Ajusta la ruta según tu configuración
  }

}
