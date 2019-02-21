import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
         MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import { ProjectService } from './project.service';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    EditComponent,
    ProjectsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatSnackBarModule
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
