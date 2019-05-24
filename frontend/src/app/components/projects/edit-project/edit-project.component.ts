import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  editProjectForm: FormGroup;
  dialogTitle: string;
  projectId: string;
  project: Project;

  constructor(private projectService: ProjectService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router, private dialogRef: MatDialogRef<EditProjectComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dialogTitle = data.title;
    this.projectId = data.projectId;

    this.editProjectForm = this.fb.group({
      title: ['', Validators.required],
      description: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectService.getProjectById(this.projectId).subscribe(res => {
        this.project = res as Project;
        this.editProjectForm.get('title').setValue(this.project.title);
        this.editProjectForm.get('description').setValue(this.project.description);
      });
    });
  }

  editProject(title: HTMLInputElement, description: HTMLInputElement) {
    this.projectService.updateProject(this.projectId, title.value, description.value).subscribe((res) => {
      /*this.snackBar.open('Проект успешно изменен!', 'OK', {
        duration: 2000
      });*/
      console.log(res);
      this.dialogRef.close(true);
    });
  }

  close() {
    this.dialogRef.close();
  }

}
