import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrl: './instrucciones.component.css'
})
export class InstruccionesComponent {
  constructor(private router: Router,private translate: TranslateService) { }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  home():void{
    this.router.navigateByUrl('/');
   }

}