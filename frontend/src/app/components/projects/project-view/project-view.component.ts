import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { IterationService } from 'src/app/services/iteration.service';
import { Router, ActivatedRoute } from '@angular/router';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  prId: String;
  itId: String;
  itTitle: String;
  project: Project;

  displayedColumns = ['title', 'description', 'date', 'actions'];

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];
  

  constructor(private projectService: ProjectService, private iterationService: IterationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.prId = params.id;
      this.projectService.getProjectById(this.prId).subscribe((res: Project) => {
        this.project = res;
        console.log(this.project);
      });
    });
  }

  deleteIteration(id){
    console.log('Key: ', id);
    this.iterationService.deleteIteration(this.prId, id).subscribe(() => {
      this.fetchIterations();
    });
  }

  fetchIterations(){
    this.projectService
      .getProjectById(this.prId)
      .subscribe((data: Project) => {
        this.project = data;
      });
  }

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

}
