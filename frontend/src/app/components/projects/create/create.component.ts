import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      description: ''
    });
  }

  createProject(title, description){
    this.projectService.createProject(title, description).subscribe((res) =>{
      console.log(res);
      this.router.navigate(['api/projects']);
    });
  }

  ngOnInit() {
  }

}
