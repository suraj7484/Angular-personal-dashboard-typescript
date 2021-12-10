import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { Todo } from '../shared/todo.model';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  showValidationErrors: boolean;
  todo: Todo

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.todo = data['data'];
    });
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return

    this.todoService.updateTodo(this.todo.id, form.value)
    this.router.navigateByUrl('/todos')
    this.notificationService.show('Todo Updated Successfully!!!', 2000);
  }
}
