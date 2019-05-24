import { User } from './../models/user.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  // Получение токена
  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return localStorage.getItem('currentUser');
  }

  // Вход
  login(email: string, password: string) {
    const user = {
      email,
      password
    };

    this.http.post(`${this.url}/auth`, user, { observe: 'response' }).subscribe((res: HttpResponse<Response>) => {
      const token = res.headers.get('authorization');
      const userInfo = res.body as object;
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      this.refresh();
      this.router.navigate(['/projects']);
    });
  }

  // Выход
  logout() {
    // Удаление токена и информации и пользователе из localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
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

  getUserByEmail(email) {
    return this.http.get(`${this.url}/users/${email}`);
  }

  // Обновление страницы (для обновления header)
  refresh(): void {
    window.location.reload();
  }

  updateUserProjects(userId, projectId) {
    return this.http.put(`${this.url}/users/`, { userId, projectId });
  }
}
