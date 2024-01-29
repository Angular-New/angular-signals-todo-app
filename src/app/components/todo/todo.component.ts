import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';

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
export class TodoComponent implements OnInit, OnChanges {
  @Input({ required: true }) public todo!: ITodo;
  @Input({ required: true }) public isEditing!: boolean;

  @Output() setEditingId = new EventEmitter<string | null>();

  @ViewChild('input') input?: ElementRef;

  private readonly _todosService: TodosService = inject(TodosService);

  public editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.input?.nativeElement.focus();
      }, 0);
    }
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

  public removeTodo(id: string): void {
    this._todosService.removeTodo(id);
  }

  public completeTodo(id: string): void {
    this._todosService.completeTodo(id);
  }
}
