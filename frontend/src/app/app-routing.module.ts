import { AuthGuard } from './components/auth/auth.guard';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { IterationViewComponent } from './components/iteration-view/iteration-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';

import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { ProjectViewComponent } from './components/projects/project-view/project-view.component';

import { CreateIterationComponent } from './components/iterations/create/create.component';
import { EditIterationComponent } from './components/iterations/edit/edit.component';

import { CreateCardComponent } from './components/iteration-view/create/create.component';
import { EditCardComponent } from './components/iteration-view/edit-card/edit-card.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  // Get the list of projects
  { path: 'projects', component: ProjectsListComponent, canActivate: [AuthGuard] },
  // View the selected project (id of project)
  { path: 'project/:id', component: ProjectViewComponent },

  { path: 'iterations/:id', component: IterationViewComponent, canActivate: [AuthGuard] },
  { path: 'iterations/create/:id', component: CreateIterationComponent, canActivate: [AuthGuard] },
  { path: 'iterations/edit/:id', component: EditIterationComponent, canActivate: [AuthGuard] },

  { path: 'cards/create/:id', component: CreateCardComponent, canActivate: [AuthGuard] },
  { path: 'cards/edit/:id', component: EditCardComponent, canActivate: [AuthGuard] },

  {path: 'signin', component: SigninComponent },
  {path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
