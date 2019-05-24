import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CardService } from 'src/app/services/card.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  id: string;
  card: Card;

  itId: string;

  updateForm: FormGroup;

  constructor(private cardServise: CardService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      description: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.cardServise.getCardById(this.id).subscribe(res => {
        this.card = res as Card;
        this.updateForm.get('title').setValue(this.card.title);
        this.updateForm.get('description').setValue(this.card.description);
      });
    });
  }

  updateCard(title, description) {
    this.cardServise.updateCard(this.id, title, description, this.card.state).subscribe(res => {
      this.snackBar.open('Итерация успешно изменена!', 'OK', {
        duration: 2000
      });
    });
  }

}
