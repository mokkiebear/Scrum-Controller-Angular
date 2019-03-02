import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material'

import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects: Project[];
  displayedColumns = ['title', 'description', 'date', 'actions'];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
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
    this.router.navigate([`/projects/edit/${id}`]);
  }

  getProject(id){
    this.projectService.getProjectById(id).subscribe(res => console.log(res));
  }

  openProject(id){
    this.router.navigate([`/project/${id}`]);
  }

  deleteProject(id){
    this.projectService.deleteProject(id).subscribe(() => {
      this.fetchProjects();
    });
  }

  formatDate(date) {
    var monthNames = [
      "января", "февраля", "марта",
      "апреля", "мая", "июня", "июля",
      "августа", "сентября", "октября",
      "ноября", "декабря"
    ];
    date = new Date(date);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ', ' + year;
  }

}
