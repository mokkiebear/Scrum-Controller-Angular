import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material'

import { Project } from '../../project.model';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: Project[];
  displayedColumns = ['title', 'date', 'actions'];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    /*this.projectService.getProjects().subscribe((projects) => {
      console.log('Result',projects);
    });*/
    this.fetchProjects();
  }

  fetchProjects(){
    this.projectService
      .getProjects()
      .subscribe((data: Project[]) => {
        this.projects = data;
        console.log('Data requested!');
        console.log(this.projects);
      });
  }

  editProject(id){
    this.router.navigate([`/api/edit/${id}`]);
  }

  deleteProject(id){
    this.projectService.deleteProject(id).subscribe(() => {
      this.fetchProjects();
    });
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    date = new Date(date);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

}
