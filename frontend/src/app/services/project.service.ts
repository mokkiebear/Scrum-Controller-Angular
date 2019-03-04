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

  createProject(title, description){
    const project = {
      title: title,
      description: description
    };
    return this.http.post(`${this.uri}/api/projects`, project);
  }

  deleteProject(id){
    return this.http.delete(`${this.uri}/api/projects/${id}`);
  }

  updateProject(id, title, description, iterations){
    const project = {
      title: title,
      description: description,
      iterations: iterations
    }
    return this.http.put(`${this.uri}/api/projects/${id}`, project);
  }

  /*createIteration(id, title, description){
    let project;
    const iteration = {
      title: title,
      description: description
    };
    this.getProjectById(id).subscribe(res => {
      project = res;
    });
    let iterations = project.iterations;
    iterations.push(iteration);
    
    this.updateProject(id, project.title, project.description, iterations);
  }*/
}