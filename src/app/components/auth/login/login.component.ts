import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    this.http.post('http://localhost:8080/api/login', {
      email: this.email,
      password: this.password
    }).subscribe(response => {
      console.log('Inicio de sesión exitoso', response);
    }, error => {
      console.error('Error en el inicio de sesión', error);
    });
  }
}
