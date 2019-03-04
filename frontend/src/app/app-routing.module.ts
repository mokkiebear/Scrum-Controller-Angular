import { IterKanbanComponent } from './components/iter-kanban/iter-kanban.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/projects/create/create.component';
import { EditComponent } from './components/projects/edit/edit.component';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { ProjectViewComponent } from './components/projects/project-view/project-view.component';
import { CreateIterationComponent } from './components/iterations/create/create.component';
import { CreateCardComponent } from './components/iter-kanban/create/create.component';
const routes: Routes = [
  { path: 'projects', component: ProjectsListComponent },
  { path: 'projects/create', component: CreateComponent },
  { path: 'projects/edit/:id', component: EditComponent },
  { path: 'project/:id', component: ProjectViewComponent },

  { path: 'project/:prId/iteration/:itId', component: IterKanbanComponent },
  { path: 'iterations/create/:id', component: CreateIterationComponent, pathMatch: 'full' },
  { path: 'project/:prId/cards/:itId', component: CreateCardComponent, pathMatch: 'full' }/*,
  { path: 'project/:prId/iteration/:itId' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
