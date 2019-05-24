import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  createProjectForm: FormGroup;
  dialogTitle: string;
  constructor(private projectService: ProjectService, private fb: FormBuilder,
              private router: Router, private dialogRef: MatDialogRef<AddProjectComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dialogTitle = data.title;

    this.createProjectForm = this.fb.group({
      title: ['', Validators.required],
      description: ''
    });
  }

  ngOnInit() {
  }

  createProject(title: HTMLInputElement, description: HTMLInputElement) {
    const descriptionValue: string = description.value === '' ? 'Описание не задано' : description.value;
    this.projectService.createProject(title.value, descriptionValue).subscribe((res) => {
      console.log(res);
      this.dialogRef.close(true);
    });
  }

  close() {
    this.dialogRef.close();
  }

}
