import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { ManageComponentComponent } from './manage-component/manage-component.component';
import { NotesComponent } from './notes/notes.component';
import { TodoResolver } from './resolver/edit-todo.resolver';
import { NoteResolver } from './resolver/edit-note.resolver';
import { TodosComponent } from './todos/todos.component';
import { BookmarkResolver } from './resolver/edit-bookmark.resolver';

const routes: Routes = [
  { path: 'bookmarks', component: BookmarksComponent, data: { tab: 1 } },
  { path: 'bookmarks/add', component: AddBookmarkComponent },
  {
    path: 'bookmarks/manage',
    component: ManageComponentComponent,
    children: [
      { path: ':id', component: EditBookmarkComponent , resolve: {data: BookmarkResolver}},
    ],
  },

  { path: 'todos', component: TodosComponent, data: { tab: 2 } },
  { path: 'todos/add', component: AddTodoComponent },
  {
    path: 'todos/:id',
    component: EditTodoComponent,
    resolve: {
      data: TodoResolver,
    },
  },

  { path: 'notes', component: NotesComponent, data: { tab: 3 } },
  { path: 'notes/add', component: AddNoteComponent },
  {
    path: 'notes/:id',
    component: EditNoteComponent,
    resolve: {
      data: NoteResolver,
    },
  },
  // { path: '', redirectTo: 'bookmarks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BookmarkResolver, TodoResolver, NoteResolver],
})
export class AppRoutingModule {}
