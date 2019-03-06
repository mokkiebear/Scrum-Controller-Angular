import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getProjects(){
    return this.http.get(`${this.url}/projects`);
  }

  getProjectById(id){
    return this.http.get(`${this.url}/projects/${id}`);
  }

  createProject(title, description){
    const project = {
      title: title,
      description: description
    };
    return this.http.post(`${this.url}/projects`, project);
  }

  deleteProject(id){
    return this.http.delete(`${this.url}/projects/${id}`);
  }

  updateProject(id, title, description){
    const project = {
      title: title,
      description: description
    }
    return this.http.put(`${this.url}/projects/${id}`, project);
  }
}
