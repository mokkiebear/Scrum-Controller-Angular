import { User } from './../models/user.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  private token: string;
  private isAuthenticated = false;
  url = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  // Получение токена
  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return this.user;
  }

  // Вход
  login(email: string, password: string) {
    const user = {
      email,
      password
    };

    this.http.post(`${this.url}/auth`, user, { observe: 'response' }).subscribe((res: HttpResponse<Response>) => {
      this.token = res.headers.get('authorization');
      localStorage.setItem('token', this.token);
      this.isAuthenticated = true;
      this.refresh();
      this.router.navigate(['/projects']);
    });
  }

  // Выход
  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.refresh();
    this.router.navigate(['/']);
  }

  // Регистрация нового пользователя
  addUser(name: string, email: string, password: string) {
    const user = {
      name,
      email,
      password
    };
    return this.http.post(`${this.url}/users`, user);
  }

  refresh(): void {
    window.location.reload();
  }
}
