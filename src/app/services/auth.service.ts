import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  token: string; // Token de autenticación recibido del servidor
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // Verificar si el usuario está autenticado al iniciar el servicio
    this.checkToken();
  }

  // Método para iniciar sesión
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://example.com/api/login', { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token); // Almacenar token en el localStorage
          this.loggedIn$.next(true); // Actualizar estado de autenticación
        })
      );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Eliminar token del localStorage
    this.loggedIn$.next(false); // Actualizar estado de autenticación
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  // Verificar si hay un token almacenado en localStorage y actualizar el estado de autenticación
  private checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn$.next(true);
    }
  }
}
