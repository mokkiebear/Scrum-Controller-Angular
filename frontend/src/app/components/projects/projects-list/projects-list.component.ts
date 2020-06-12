import { AddProjectComponent } from './../add-project/add-project.component';
import { EditProjectComponent } from './../edit-project/edit-project.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

import { Project } from '../../../models/project.model';
import { ProjectService } from '../../../services/project.service';

import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
})
export class ProjectsListComponent implements OnInit, AfterViewInit {
  projects: Project[];
  displayedColumns = ['title', 'description', 'date', 'actions'];
  dataSource: MatTableDataSource<any>;
  isLoad = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;

  ngOnInit() {
    this.fetchProjects();
  }

  ngAfterViewInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.projectService.getProjects().subscribe((data: Project[]) => {
      this.projects = data;
      this.dataSource = new MatTableDataSource(
        (data as object[]) as PeriodicElement[]
      );
      this.dataSource.sort = this.matSort;
      this.dataSource.paginator = this.paginator;
      console.log('Data requested!');
      console.log(this.projects);
      this.isLoad = true;
    });
  }

  // Открытие диалога для добавления или изменения проекта
  openDialog(taskId, projectId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.minWidth = '350px';

    let dialogRef;
    if (taskId === 1) {
      dialogConfig.data = {
        title: 'Создание проекта',
      };
      dialogRef = this.dialog.open(AddProjectComponent, dialogConfig);
    } else if (taskId === 2) {
      dialogConfig.data = {
        title: 'Изменение проекта',
        projectId,
      };
      dialogRef = this.dialog.open(EditProjectComponent, dialogConfig);
    }

    dialogRef.afterClosed().subscribe((data) => {
      // Если данные добавлены / изменены
      if (data === true) {
        dialogRef.close();
        this.fetchProjects();
      }
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  editProject(id) {
    this.router.navigate([`/projects/edit/${id}`]);
  }

  getProject(id) {
    this.projectService.getProjectById(id).subscribe((res) => console.log(res));
  }

  openProject(id) {
    this.router.navigate([`/project/${id}`]);
  }

  deleteProject(id) {
    if (confirm('Вы уверены, что вы хотите удалить этот проект?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.fetchProjects();
      });
    }
  }

  formatDate(date) {
    const monthNames = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    date = new Date(date);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ', ' + year;
  }
}

export interface PeriodicElement {
  title: string;
  description: string;
  date: string;
}
