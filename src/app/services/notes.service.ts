import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Note } from '../note';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  token: any;

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
  }

  fetchNotesFromServer() {
    this.token = this.authService.getBearerToken();
    return this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes',
           { headers : new HttpHeaders().set('Authorization', `Bearer ${this.token}`) }).subscribe(
      notes => {
      this.notes = notes;
      this.notesSubject.next(this.notes);
    });
  }

  getNotes(): BehaviorSubject<Array<Note>> {
      return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
          headers : new HttpHeaders()
          .set('Authorization', `Bearer ${this.token}`)
        }).do( addedNote => {
          this.notes.push(addedNote);
          this.notesSubject.next(this.notes);
        });
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers : new HttpHeaders()
      .set('Authorization', `Bearer ${this.token}`)
    }).do( editedNote => {
      const noteObject = this.notes.find(noteObj => noteObj.id === editedNote.id);
      Object.assign(noteObject , editedNote);
      this.notesSubject.next(this.notes);
    });
  }

  getNoteById(noteId): Note {
    const noteObject = this.notes.find(note => note.id === noteId);
    return Object.assign({}, noteObject);
  }
}
