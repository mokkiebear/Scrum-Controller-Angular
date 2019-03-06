import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IterationService } from 'src/app/services/iteration.service';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card.model';
import { Iteration } from 'src/app/models/iteration.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iter-kanban',
  templateUrl: './iter-kanban.component.html',
  styleUrls: ['./iter-kanban.component.css']
})
export class IterKanbanComponent implements OnInit {

  itId: String;
  iteration: Iteration;

  cardId: String;
  cards: Card[];

  todo = [];
  doing = [];
  done = [];

  constructor(private cardService: CardService, private iterationService: IterationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itId = params.id;
    });
  }

  fetchCards(){
    /*this.projectService
      .getProjectById(this.prId)
      .subscribe((data: Project) => {
        this.project = data;
        this.iterationService.getIterationById(this.prId, this.itId)
        .subscribe((res: Iteration) => {
          this.iteration = res;
          this.cards = this.iteration.cards;

        }); 
      });*/
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
/*
  save(event, item){
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
    
    let iterInd = this.project.iterations.findIndex((x:Iteration) => x._id == this.itId);
    let cardInd = this.project.iterations[iterInd].cards.findIndex((x:Card)=> x._id == item.id);
    
    this.project.iterations[iterInd].cards[cardInd].state = state;

    this.projectService.updateProject(this.prId, this.project.title, this.project.description, this.project.iterations).subscribe();
  }

  deleteCard(cardId){
    this.cardService.deleteCard(this.prId, this.itId, cardId).subscribe(() => {
      this.fetchCards();
    });
  }*/
}
