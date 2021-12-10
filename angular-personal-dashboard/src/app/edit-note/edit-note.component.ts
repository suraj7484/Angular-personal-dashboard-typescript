import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',

  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  note: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.note = data['data']
    });
  }

  onFormSubmit(form: NgForm) {
    this.noteService.updateNote(this.note.id, form.value)
    this.router.navigateByUrl('/notes')
    this.notificationService.show('Note Updated Successfully!!!', 2000);

  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id)
    this.router.navigateByUrl('/notes');
    this.notificationService.show('Note Delete Successfully!!!', 2000);
  }
}
