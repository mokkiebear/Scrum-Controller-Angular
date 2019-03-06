import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

import { MatSnackBar } from '@angular/material';

import { IterationService } from '../../../services/iteration.service';
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

  createIterationForm: FormGroup;

  constructor(private iterationService: IterationService, private projectService: ProjectService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
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
    this.iterationService.createIteration(this.id, title, description).subscribe(res => {
      console.log(res);
      //this.router.navigate(['/projects']);
    });

    /*this.project.iterations.push(<Iteration>iteration);

    this.projectService.updateProject(this.id, this.project.title, this.project.description, this.project.iterations).subscribe(() => {
      this.snackBar.open('Итерация успешно добавлена в проект!', 'OK', {
        duration: 3000
      });
    });*/
  }

}
