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

showSection(sectionId: string): void {
const sections = document.querySelectorAll('.content-section') as NodeListOf<HTMLDivElement>;
  sections.forEach((section) => {
      section.style.display = 'none';
  });

  const sectionToShow = document.getElementById(sectionId);
   if (sectionToShow) {
       sectionToShow.style.display = 'block';
    }
}

}