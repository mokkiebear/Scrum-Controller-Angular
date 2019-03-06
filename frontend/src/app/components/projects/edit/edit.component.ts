import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

import { MatSnackBar } from '@angular/material';

import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  project: Project;
  updateForm: FormGroup;
  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.projectService.getProjectById(this.id).subscribe(res => {
        this.project = <Project>res;
        this.updateForm.get('title').setValue(this.project.title);
        this.updateForm.get('description').setValue(this.project.description);
      });
    });
  }

  updateProject(title, description){
    this.projectService.updateProject(this.id, title, description).subscribe(() => {
      this.snackBar.open('Проект успешно изменен!', 'OK', {
        duration: 2000
      });
    });
  }

}
