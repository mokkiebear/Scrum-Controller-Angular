import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'project-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createProjectForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder, private router: Router) {
    this.createProjectForm = this.fb.group({
      title: ['', Validators.required],
      description: ''
    });
  }

  createProject(title: HTMLInputElement, description: HTMLInputElement){
    this.projectService.createProject(title.value, description.value).subscribe((res) =>{
      console.log(res);
      this.router.navigate(['/projects']);
    });
  }

  ngOnInit() {
  }

}
