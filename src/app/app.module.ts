import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NotesService } from './services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule , Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// ------- Material imports---------
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatOptionModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { ListViewComponent } from './list-view/list-view.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { MatDialogModule } from '@angular/material/dialog';


const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    NoteComponent,
    ListViewComponent,
    EditNoteViewComponent,
    EditNoteOpenerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatDialogModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    NotesService,
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent],
  entryComponents : [EditNoteViewComponent]
})
export class AppModule { }
