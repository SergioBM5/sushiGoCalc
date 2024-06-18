import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';  // Servicio de autenticación

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  isLoggedIn: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; // Actualizamos el valor cuando cambie el estado de autenticación
    });
  }
}
