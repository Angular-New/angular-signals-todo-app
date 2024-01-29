import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';

import { TodosService } from '@services/todos.service';

import { ITodo } from '../../shared/types';

@Component({
  selector: 'td-todo',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  @Input({ required: true }) public todo!: ITodo;
  @Input({ required: true }) public isEditing!: boolean;

  @Output() setEditingId = new EventEmitter<string | null>();

  private readonly _todosService: TodosService = inject(TodosService);

  public editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  public changeText(event: Event): void {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  // emit null as signal that edit mode is closed
  public changeTodo(): void {
    this._todosService.updateTodo(this.editingText, this.todo.id);
    this.setEditingId.emit(null);
  }

  public setEditMode(): void {
    this.setEditingId.emit(this.todo.id);
  }
}