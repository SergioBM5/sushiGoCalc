import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('http://localhost:8080/api/register', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe(response => {
      console.log('Registro exitoso', response);
    }, error => {
      console.error('Error en el registro', error);
    });
  }
}
