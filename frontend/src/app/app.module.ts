import { AuthInterceptor } from './services/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
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
         MatMenuModule,
         MatListModule,
         MatSidenavModule,
         MatTooltipModule,
         MatDialogModule,
         MatPaginatorModule,
         MatSortModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateIterationComponent } from './components/iterations/create/create.component';
import { EditIterationComponent } from './components/iterations/edit/edit.component';

import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';
import { ProjectViewComponent } from './components/projects/project-view/project-view.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { IterationViewComponent } from './components/iteration-view/iteration-view.component';
import { CreateCardComponent } from './components/iteration-view/create/create.component';
import { EditCardComponent } from './components/iteration-view/edit-card/edit-card.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './components/header/header.component';
import { AddUserToProjectComponent } from './components/add-user-to-project/add-user-to-project.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { EditProjectComponent } from './components/projects/edit-project/edit-project.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    ProjectViewComponent,
    CreateIterationComponent,
    EditIterationComponent,
    IterationViewComponent,
    CreateCardComponent,
    EditCardComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    AddUserToProjectComponent,
    WelcomeComponent,
    AddProjectComponent,
    EditProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
    DragDropModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [AddProjectComponent, EditProjectComponent]
})
export class AppModule { }
