import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IterationService } from 'src/app/services/iteration.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card.model';
import { Iteration } from 'src/app/models/iteration.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'iteration-view',
  templateUrl: './iteration-view.component.html',
  styleUrls: ['./iteration-view.component.css']
})
export class IterationViewComponent implements OnInit {

  itId: String;
  iteration: Iteration;

  cards: Card[];

  todo = [];
  doing = [];
  done = [];

  constructor(private cardService: CardService, private iterationService: IterationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itId = params.id;
      this.fetchCards();
    });
  }

  fetchCards(){
    this.cardService.getCards(this.itId).subscribe(res => {
      this.cards = res as Card[];
      for (let card of this.cards){
        switch(card.state){
          case 'todo': this.todo.push(card); break;
          case 'doing': this.doing.push(card); break;
          case 'done': this.done.push(card); break;
        }
      }
    });
  }
  //For cards
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

  save(event, item){
    console.log(event, item);
    let state;
    
    if (event.container.id.indexOf('0') != -1){
      state = 'todo';
    }
    else if (event.container.id.indexOf('1') != -1){
      state = 'doing';
    }
    else {
      state = 'done';
    }
    
    this.cardService.updateCard(item._id, item.title, item.description, state);
  }
/*
  deleteCard(cardId){
    this.cardService.deleteCard(this.prId, this.itId, cardId).subscribe(() => {
      this.fetchCards();
    });
  }*/
}
