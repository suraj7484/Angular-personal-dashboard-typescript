import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnDestroy {
  todos: Todo[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage').subscribe(
      (event: any) => {
        if (event.key == 'todos') {
          this.loadState();
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((t) => t.id === id);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);

    this.saveState();
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    Object.assign(todo, updatedTodoFields);

    this.saveState();
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index == -1) return;
    this.todos.splice(index, 1);

    this.saveState();
  }
  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const Storage = localStorage.getItem('todos');
      const todosInStorage = JSON.parse(Storage || '[]');

      this.todos.length = 0; // clear the todos array (while keeping the reference)
      this.todos.push(...todosInStorage);
    } catch (error) {
      console.log(
        'This have an error with retriving the data from localStorage:('
      );
      console.log(error);
    }
  }
}
