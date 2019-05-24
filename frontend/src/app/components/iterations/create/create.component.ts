import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { IterationService } from '../../../services/iteration.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-iteration-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateIterationComponent implements OnInit {

  id: string;
  project: Project;

  createIterationForm: FormGroup;

  constructor(private iterationService: IterationService,
              private projectService: ProjectService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.createIterationForm = this.fb.group({
      title: [ '', Validators.required],
      description: '',
      goal: '',
      finishDate: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      // Проект нужен для вывода дополнительных сведений о проекте
      this.projectService.getProjectById(this.id).subscribe(res => {
        this.project = res as Project;
      });
    });
  }

  createIteration(title, description, goal, finishDate) {
    // Если пользователь не ввел описание, задаем описание по умолчанию
    description = description === '' ? 'Описание не задано.' : description;
    this.iterationService.createIteration(this.id, title, description, goal, finishDate).subscribe(res => {
      this.snackBar.open('Итерация успешно добавлена в проект!', 'OK', {
        duration: 2000
      });
      this.router.navigate([`/project/${this.id}`]);
    });
  }
}
