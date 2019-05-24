import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IterationService } from 'src/app/services/iteration.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card.model';
import { Iteration } from 'src/app/models/iteration.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-iteration-view',
  templateUrl: './iteration-view.component.html',
  styleUrls: ['./iteration-view.component.css']
})
export class IterationViewComponent implements OnInit {

  isLoading = false;

  itId: string;
  iteration: Iteration;

  cards: Card[];

  // Массивы с карточками определенного типа
  todo = [];
  doing = [];
  done = [];
  backLog = [];

  constructor(private cardService: CardService,
              private iterationService: IterationService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isLoading = true;

    this.route.params.subscribe(params => {
      this.itId = params.id;
      this.iterationService.getIterationById(this.itId).subscribe(res => {
        this.iteration = res as Iteration;
      });

      this.fetchCards();
    });
  }

  // Получение карточек
  fetchCards() {
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.backLog = [];

    // Заполнение массивов с карточками
    this.cardService.getCards(this.itId).subscribe(res => {
      this.cards = res as Card[];
      for (const card of this.cards) {
        switch (card.state) {
          case 'todo': this.todo.push(card); break;
          case 'doing': this.doing.push(card); break;
          case 'done': this.done.push(card); break;
          case 'BackLog': this.backLog.push(card); break;
        }
      }

      this.isLoading = false;
    });
  }

  // Перемещение карточек
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  // Сохранение состояния карточки
  save(event, item) {
    let state;
    if (event.previousContainer !== event.container) {
      this.isLoading = true;
      this.snackBar.open('Изменения сохраняются...', 'OK', { duration: 1000 });
      item._parent = this.itId;

      if (event.container.element.nativeElement.parentNode.id === 'BackLog') {
        state = 'BackLog';
        item._parent = '';
      } else if (event.container.element.nativeElement.parentNode.id === 'todo') {
        state = 'todo';
      } else if (event.container.element.nativeElement.parentNode.id === 'doing') {
        state = 'doing';
      } else {
        state = 'done';
      }

      this.cardService.updateCard(item._id, item.title, item.description, state, item._parent).subscribe(res => {
        this.snackBar.open('Изменения сохранены!', 'OK', { duration: 1000 });
        this.isLoading = false;
      });


    }
  }

  deleteCard(cardId) {
    this.cardService.deleteCard(cardId).subscribe(res => {
      this.fetchCards();
    });
  }

  editCard(cardId) {
    this.router.navigate([`/cards/edit/${cardId}`]);
  }
}
