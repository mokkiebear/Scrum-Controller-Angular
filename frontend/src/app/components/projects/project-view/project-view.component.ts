import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { IterationService } from 'src/app/services/iteration.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  prId: String;
  itId: String;
  project: Project;
  
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

  openIteration(id){
    console.log(id);
    this.router.navigate([`/project/${this.prId}/iteration/${id}`]);
  }
}
