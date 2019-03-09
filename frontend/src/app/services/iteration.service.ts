import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  url = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  getIterations(prId){
    return this.http.get(`${this.url}/projects/${prId}/iterations`);
  }
  
  getIterationById(id){
    return this.http.get(`${this.url}/iterations/${id}`);
  }

  createIteration(prId, title, description){
    const iteration = {
    _parent: prId,
    title: title,
    description: description,
    cards: []
    };
    return this.http.post(`${this.url}/iterations`, iteration);
  }

  updateIteration(id, title, description){
    const iteration = {
      title: title,
      description: description
    };
    return this.http.put(`${this.url}/iterations/${id}`, iteration);
  }

  deleteIteration(itId){
    return this.http.delete(`${this.url}/iterations/${itId}`);
  }
}
