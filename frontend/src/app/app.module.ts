import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, 
         MatFormFieldModule, 
         MatInputModule, 
         MatOptionModule, 
         MatSelectModule, 
         MatIconModule, 
         MatButtonModule, 
         MatCardModule, 
         MatTableModule, 
         MatDividerModule, 
         MatSnackBarModule,
         MatMenuModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './components/projects/create/create.component';
import { EditComponent } from './components/projects/edit/edit.component';

import { CreateIterationComponent } from './components/iterations/create/create.component';
import { EditIterationComponent } from './components/iterations/edit/edit.component';

import { ProjectService } from './services/project.service';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { ProjectViewComponent } from './components/projects/project-view/project-view.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { IterKanbanComponent } from './components/iter-kanban/iter-kanban.component';
import { CreateCardComponent } from './components/iter-kanban/create/create.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    ProjectsListComponent,
    ProjectViewComponent,
    CreateIterationComponent,
    EditIterationComponent,
    IterKanbanComponent,
    CreateCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatOptionModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule, 
    MatDividerModule, 
    MatSnackBarModule,
    MatMenuModule,
    DragDropModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
