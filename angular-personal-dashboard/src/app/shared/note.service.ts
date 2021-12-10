import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy {
  notes: Note[] = [];

  storageListenSub: Subscription


  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event: any) => {
        if (event.key == 'notes') {
          this.loadState()
        };
      })
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes;
  }

  getNote(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note, updatedFields);
    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex == -1) return;
    this.notes.splice(noteIndex, 1);
    this.saveState();
  }
  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const Storage = localStorage.getItem('notes');
      const notesInStorage = JSON.parse(Storage || '[]');

      this.notes.length = 0 // clear the notes array (while keeping the reference)
      this.notes.push(
        ...notesInStorage
      )

    } catch (error) {
      console.log("This have an error with retriving the data from localStorage:(")
      console.log(error)
    }
  }
}
