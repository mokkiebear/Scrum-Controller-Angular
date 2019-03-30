import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'; 

import { MatSnackBar } from '@angular/material';

import { CardService } from '../../../services/card.service';
import { IterationService } from '../../../services/iteration.service';
import { Iteration } from '../../../models/iteration.model';
import { Card } from '../../../models/card.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-card-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCardComponent implements OnInit {

  itId = '';
  /*states = ['todo', 'doing', 'done'];*/
  states = ['BackLog'];
  createCardForm: FormGroup;

  constructor(private iterationService: IterationService,
              private cardService: CardService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.createCardForm = this.fb.group({
      title: [ '', [Validators.minLength(3), Validators.maxLength(50), Validators.required] ],
      description: '',
      state: String,
      storyPoint: Number,
      date: Date.now()
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itId = params.id;
    });
  }

  createCard(title, description, storyPoint, state = 'todo') {
    this.cardService.createCard(this.itId, title, description, storyPoint, state).subscribe(res => {
      this.snackBar.open('Карточка успешно создана!', 'OK', { duration: 2000 });
      this.router.navigate([`iterations/${this.itId}`]);
    });
  }
}
