import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';  // Asegúrate de tener un servicio para manejar la información del usuario

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  stats: any[] = [];
  bestPlays: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(data => {
      this.user = data.user;
      this.stats = data.stats;
      this.bestPlays = data.bestPlays;
    });
  }
}
