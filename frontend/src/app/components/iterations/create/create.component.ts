import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

import { MatSnackBar } from '@angular/material';

import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { Iteration } from '../../../models/iteration.model';
import { Card } from 'src/app/models/card.model';

@Component({
  selector: 'iteration-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateIterationComponent implements OnInit {

  id: String;
  project:Project;

  card: Card;

  itId: String = '';
  createIterationForm: FormGroup;

  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.createIterationForm = this.fb.group({
      title: '',
      description: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.projectService.getProjectById(this.id).subscribe(res => {
        this.project = <Project>res;
      });
    });
  }

  createIteration(title, description){
    //Iteration ID genereation
    let date: Date = new Date();

    for (let i = 0; i < 5; ++i){
      if (!title[i]) continue;
      this.itId += title.charCodeAt(i).toString();
    };

    this.itId += date.getTime().toString();

    let iteration = {
      _id: this.itId,
      title: title,
      description: description,
      //Костыль. Переделать: формировать объект в сервисе
      cards: [],
      date: date
    }
    this.project.iterations.push(<Iteration>iteration);

    this.projectService.updateProject(this.id, this.project.title, this.project.description, this.project.iterations).subscribe(() => {
      this.snackBar.open('Итерация успешно добавлена в проект!', 'OK', {
        duration: 3000
      });
    });
  }

}
