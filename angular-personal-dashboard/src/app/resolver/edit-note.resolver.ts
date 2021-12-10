import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from "rxjs";
import { Note } from "../shared/note.model";
import { NoteService } from "../shared/note.service";

@Injectable({
  providedIn: 'root',
})
export class NoteResolver implements Resolve<any> {
  note = Note;

  constructor(private noteService: NoteService) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<any> | Promise<any> | any {
     return this.noteService.getNote(String(route.paramMap.get('id')));
  }
}
