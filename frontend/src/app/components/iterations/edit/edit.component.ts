import { Iteration } from './../../../models/iteration.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IterationService } from 'src/app/services/iteration.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'edit-iteration',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditIterationComponent implements OnInit {

  id: String;
  iteration: Iteration;

  updateForm: FormGroup;
  constructor(private iterationService: IterationService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private snackBar: MatSnackBar) { 
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
      this.iterationService.getIterationById(this.id).subscribe(res => {
        this.iteration = <Iteration>res;
        this.updateForm.get('title').setValue(this.iteration.title);
        this.updateForm.get('description').setValue(this.iteration.description);
      });
    });
  }

  updateIteration(title, description){
    this.iterationService.updateIteration(this.id, title, description).subscribe(res => {
      this.snackBar.open('Итерация успешно изменена!', 'OK', {
        duration: 2000
      });
    });
  }

}
