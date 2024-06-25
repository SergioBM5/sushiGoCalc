import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './services/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent{
  isInstruccionesPage: boolean = false;
  showHomeIcon: boolean = true;

  constructor(private translate: TranslateService,private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la URL actual corresponde a la página de instrucciones
        this.isInstruccionesPage = (event.url === '/instrucciones');
      }
    });
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
