import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { TodoModel } from '../models';
import { ITodo } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  public todos = signal<ITodo[]>([]);

  public addTodo(value: string): void {
    const newTodo: ITodo = new TodoModel(uuidv4(), value, false);
    this.todos.update((todos: ITodo[]) => [...todos, newTodo]);
  }
}
