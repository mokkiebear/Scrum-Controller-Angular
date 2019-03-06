import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 

import { MatSnackBar } from '@angular/material';

import { CardService } from '../../../services/card.service';
import { IterationService } from '../../../services/iteration.service';
import { Iteration } from '../../../models/iteration.model';
import { Card } from '../../../models/card.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'iteration-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateCardComponent implements OnInit {
  
  itId: String = '';
  states = ['todo', 'doing', 'done'];
  createCardForm: FormGroup;

  constructor(private iterationService: IterationService, private cardService: CardService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.createCardForm = this.fb.group({
      title: '',
      description: '',
      state: String,
      date: Date.now()
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itId = params.id;
    });
  }

  createCard(title, description, state='todo'){
    this.cardService.createCard(this.itId, title, description, state).subscribe(res => {
      this.snackBar.open('Карточка успешно создана!', 'OK', { duration: 2000 });
      this.router.navigate([`iterations/${this.itId}`]);
    });
  }
}
