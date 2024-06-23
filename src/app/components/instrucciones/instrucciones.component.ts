import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrucciones',
  standalone: true,
  imports: [],
  templateUrl: './instrucciones.component.html',
  styleUrl: './instrucciones.component.css'
})
export class InstruccionesComponent {
  constructor(private router: Router) { }

  home():void{
    this.router.navigateByUrl('/');
   }
}