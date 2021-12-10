import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoResolver implements Resolve<any> {
  todo = Todo;

  constructor(private todoService: TodoService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.todoService.getTodo(String(route.paramMap.get('id')));
  }
}
