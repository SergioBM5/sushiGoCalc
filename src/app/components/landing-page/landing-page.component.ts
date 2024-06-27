import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../access.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  isMenuOpen: boolean = false;


  constructor(private router: Router,private accessService: AccessService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  play(): void {
    this.accessService.grantAccess();
    this.router.navigate(['/player-config']);
   
  }
  howtoPlay(): void {
    this.accessService.grantAccess();
    this.router.navigate(['/instrucciones']);
   
  }

}
