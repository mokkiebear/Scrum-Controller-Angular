import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Iteration } from 'src/app/models/iteration.model';
import { ProjectService } from 'src/app/services/project.service';
import { IterationService } from 'src/app/services/iteration.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  // id проекта
  prId: string;
  // Проект (для отображения информации о проекте)
  project: Project;
  // Итерации проекта
  iterations: Iteration[] = [];

  constructor(private projectService: ProjectService,
              private iterationService: IterationService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.prId = params.id;
      this.fetchIterations();
    });
  }

  // Удаление итерации
  deleteIteration(id) {
    this.iterationService.deleteIteration(id).subscribe(() => {
      this.fetchIterations();
    });
  }

  editIteration(id) {
    this.router.navigate([`/iterations/edit/${id}`]);
  }

  fetchIterations() {
    this.iterations = [];
    this.projectService.getProjectById(this.prId).subscribe((res: Project) => {
      this.project = res;
      this.iterationService.getIterations(this.prId).subscribe(iterations => {
        this.iterations = iterations as Iteration[];
      });
    });
  }

  openIteration(id) {
    this.router.navigate([`/iterations/${id}`]);
  }

  // Итерация начата: сменить состояние на 'doing'
  changeStateOfIteration(id, state) {
    const iter = this.iterations.find(it => {
      return it._id === id;
    }) as Iteration;
    this.iterationService.updateIteration(id, iter.title, iter.description, iter.goal, state, iter.finishDate).subscribe(res => {
      console.log(res);
      this.fetchIterations();
    });
  }

  confirmSummary(id, summary) {
    console.log(id, summary);
    this.iterationService.createSummary(id, summary).subscribe(res => {
      console.log(res);
      this.fetchIterations();
    });
  }
}
