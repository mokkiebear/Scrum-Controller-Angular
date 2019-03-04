import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

import { MatSnackBar } from '@angular/material';

import { ProjectService } from '../../../services/project.service';
import { IterationService } from '../../../services/iteration.service';
import { Project } from '../../../models/project.model';
import { Iteration } from '../../../models/iteration.model';
import { Card } from '../../../models/card.model';


@Component({
  selector: 'iteration-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCardComponent implements OnInit {

  prId: String;
  project:Project;

  iteration: Iteration;
  itId: String = '';

  card: Card;
  cardId: String = 'C';

  states = ['todo', 'doing', 'done'];
  

  createCardForm: FormGroup;

  constructor(private projectService: ProjectService, private iterationService: IterationService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.createCardForm = this.fb.group({
      title: '',
      description: '',
      state: String,
      date: Date.now()
    });
  }

  ngOnInit() {
    //Получаем проект и итерацию
    this.route.params.subscribe(params => {
      this.prId = params.prId;
      this.itId = params.itId;
      this.projectService.getProjectById(this.prId).subscribe(res => {
        this.project = <Project>res;
        this.iterationService.getIterationById(this.prId, this.itId).subscribe(res => {
          this.iteration = <Iteration>res;
        });
      });
    });
  }

  createCard(title, description, state='todo'){
    console.log(state);
    //Card ID genereation
    let date: Date = new Date();
    this.cardId = '';
    for (let i = 0; i < 5; ++i){
      if (!title[i]) continue;
      this.cardId += title.charCodeAt(i).toString();
    };

    this.cardId += date.getTime().toString();

    this.card = {
      _id: this.cardId,
      title: title,
      description: description,
      state: state,
      date: date
    }
    let iterInd = this.project.iterations.findIndex((x:Iteration) => x._id == this.itId);
    this.project.iterations[iterInd].cards.push(this.card);

    this.projectService.updateProject(this.prId, this.project.title, this.project.description, this.project.iterations).subscribe(() => {
      this.snackBar.open('Итерация успешно добавлена в проект!', 'OK', {
        duration: 3000
      });
    });
  }

}
