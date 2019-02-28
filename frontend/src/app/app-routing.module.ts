import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/projects/create/create.component';
import { EditComponent } from './components/projects/edit/edit.component';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';

const routes: Routes = [
  {path: 'api/projects', component: ProjectsListComponent},
  {path: 'api/create', component: CreateComponent},
  {path: 'api/edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
