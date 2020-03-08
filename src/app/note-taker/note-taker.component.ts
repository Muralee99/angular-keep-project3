import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService} from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note:  Note = new Note();
  notes:  Array<Note> = [];
  errMessage: string;
  constructor(private notesService: NotesService  ) {
  }
  ngOnInit() {
  }
  takeNotes() {
    if ( ( this.note.title.length > 0 ) || ( this.note.text.length > 0 ) ) {
    this.notesService.addNote(this.note).subscribe(
      data => {},
      err => {
                this.errMessage =  err.error ? err.error.message : err.message;
                const index: number = this.notes.findIndex(note => note.title === this.note.title);
                this.notes.splice(index, 1);
      });
    this.note = new Note();
    } else {
          this.errMessage = 'Title and Text both are required fields';
    }
}
}
