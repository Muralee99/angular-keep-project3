import { Component , OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatOption, MatSelect} from '@angular/material';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
              @Inject(MAT_DIALOG_DATA)private data: any,
              private noteService: NotesService) {
  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.noteId);
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      editNote => {
        this.dialogRef.close();
      },
      err => {
      this.errMessage = err.message;
      });
  }
}
