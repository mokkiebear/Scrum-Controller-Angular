import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getIterations(prId) {
    return this.http.get(`${this.url}/projects/${prId}/iterations`);
  }

  getIterationById(id) {
    return this.http.get(`${this.url}/iterations/${id}`);
  }

  createIteration(prId, title, description, goal, finishDate) {
    // Состояние установится на back в 'new'
    const iteration = {
    _parent: prId,
    title,
    description,
    goal,
    cards: [],
    finishDate
    };
    return this.http.post(`${this.url}/iterations`, iteration);
  }

  updateIteration(id, title, description, goal, state, finishDate) {
    const iteration = {
      title,
      description,
      goal,
      state,
      finishDate
    };
    return this.http.put(`${this.url}/iterations/${id}`, iteration);
  }

  createSummary(id, summary) {
    return this.http.put(`${this.url}/iterations/summary/${id}`, { summary });
  }

  deleteIteration(itId) {
    return this.http.delete(`${this.url}/iterations/${itId}`);
  }
}
