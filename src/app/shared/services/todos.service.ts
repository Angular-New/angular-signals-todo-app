import { Injectable, computed, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { EFilter } from '../enums';
import { TodoModel } from '../models';
import { ITodo } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  public filterSig = signal<EFilter>(EFilter.all);
  public todosSig = signal<ITodo[]>([]);

  public readonly isEmptyTodos = computed(() => this.todosSig().length === 0);

  public readonly countActiveTodosSig = computed(
    () => this.todosSig().filter((todo: ITodo) => !todo.isCompleted).length,
  );

  public addTodo(value: string): void {
    if (value !== '') {
      const newTodo: ITodo = new TodoModel(uuidv4(), value, false);
      this.todosSig.update((todos: ITodo[]) => [...todos, newTodo]);
    }
  }

  public updateTodo(text: string, id: string): void {
    this.todosSig.update((todos: ITodo[]) => todos.map((todo: ITodo) => (todo.id === id ? { ...todo, text } : todo)));
  }

  public removeTodo(id: string): void {
    this.todosSig.update((todos: ITodo[]) => todos.filter((todo: ITodo) => todo.id !== id));
    console.log(this.todosSig());
  }

  public completeTodo(id: string): void {
    this.todosSig.update((todos: ITodo[]) =>
      todos.map((todo: ITodo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)),
    );
  }

  public toggleAllTodos(toggle: boolean): void {
    this.todosSig.update((todos: ITodo[]) => todos.map((todo: ITodo) => ({ ...todo, isCompleted: toggle })));
  }

  public changeFilter(filter: EFilter): void {
    this.filterSig.set(filter);
  }
}
