import { ProjectService } from './../../services/project.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { IterationService } from 'src/app/services/iteration.service';
import { Card } from 'src/app/models/card.model';
import { Project } from 'src/app/models/project.model';
import { Iteration } from 'src/app/models/iteration.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iter-kanban',
  templateUrl: './iter-kanban.component.html',
  styleUrls: ['./iter-kanban.component.css']
})
export class IterKanbanComponent implements OnInit {

  prId: String;
  itId: String;
  cardId: String;

  project: Project;
  iteration: Iteration;

  cards: Card[];

  todo = [];
  doing = [];
  done = [];

  constructor(private projectService: ProjectService, private iterationService: IterationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.itId = params.itId;
      this.prId = params.prId;
      this.projectService.getProjectById(this.prId).subscribe((res: Project) => {
        this.project = res;
        this.iterationService.getIterationById(this.prId, this.itId).subscribe((res: Iteration) => {
          this.iteration = res;
          this.cards = this.iteration.cards;

          for( let i = 0; i < this.cards.length; ++i){ 
            let id = this.cards[i]._id;
            let title = this.cards[i].title;
            switch (this.cards[i].state){   
              case 'todo': this.todo.push({ id: id, title: title}); break;
              case 'doing': this.doing.push({ id: id, title: title}); break;
              case 'done': this.done.push({ id: id, title: title}); break;
            }
          }

          console.log("Cards ", this.cards);
          console.log('Iteration ', this.iteration);
        });
      });
    });
  }

  flag = true;
  ngAfterViewChecked(){
      this.changeColors();
    }
  }
  fetchCards(){
    this.projectService
      .getProjectById(this.prId)
      .subscribe((data: Project) => {
        this.project = data;
        this.iterationService.getIterationById(this.prId, this.itId)
        .subscribe((res: Iteration) => {
          this.iteration = res;
          this.cards = this.iteration.cards;

        }); 
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

  changeColors(){
    if (!flag) return;
    var cards = document.getElementsByClassName('example-box') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < cards.length; ++i){
      cards[i].style.backgroundColor = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    }
    flag = false;
  }

}
