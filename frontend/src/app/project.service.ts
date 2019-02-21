import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  uri = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getProjects(){
    return this.http.get(`${this.uri}/api/projects`);
  }

  getProjectById(id){
    return this.http.get(`${this.uri}/api/projects/${id}`);
  }

  createProject(title, date){
    const project = {
      title: title,
      date: date
    };
    return this.http.post(`${this.uri}/api/projects`, project);
  }

  deleteProject(id){
    return this.http.delete(`${this.uri}/api/projects/${id}`);
  }
}
