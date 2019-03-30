import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'http://localhost:3000';
  constructor(private http: HttpClient, private authService: AuthService) { }


  getProjects() {
    return this.http.get(`${this.url}/projects`);
  }

  getProjectById(id) {
    return this.http.get(`${this.url}/projects/${id}`);
  }

  createProject(title, description) {
    const project = {
      title,
      description
    };
    return this.http.post(`${this.url}/projects`, project/*, httpOptions*/);
  }

  deleteProject(id) {
    return this.http.delete(`${this.url}/projects/${id}`);
  }

  updateProject(id, title, description) {
    const project = {
      title,
      description
    };
    return this.http.put(`${this.url}/projects/${id}`, project);
  }
}
