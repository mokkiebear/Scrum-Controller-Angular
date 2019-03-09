import { IterationViewComponent } from './components/iteration-view/iteration-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './components/projects/create/create.component';
import { EditComponent } from './components/projects/edit/edit.component';

import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { ProjectViewComponent } from './components/projects/project-view/project-view.component';

import { CreateIterationComponent } from './components/iterations/create/create.component';
import { EditIterationComponent } from './components/iterations/edit/edit.component';

import { CreateCardComponent } from './components/iteration-view/create/create.component';

const routes: Routes = [
  //Get the list of projects
  { path: 'projects', component: ProjectsListComponent }, 
  //Create new project
  { path: 'projects/create', component: CreateComponent },
  //Edit the existing project (id of project)
  { path: 'projects/edit/:id', component: EditComponent },
  //View the selected project (id of project)
  { path: 'project/:id', component: ProjectViewComponent },

  { path: 'iterations/:id', component: IterationViewComponent },
  { path: 'iterations/create/:id', component: CreateIterationComponent, pathMatch: 'full' },
  { path: 'iterations/edit/:id', component: EditIterationComponent },

  { path: 'cards/create/:id', component: CreateCardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
