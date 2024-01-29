import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { TodoComponent } from '@components/todo/todo.component';
import { TodosService } from '@services/todos.service';

import { EFilter } from '../../shared/enums';
import { ITodo } from '../../shared/types';

@Component({
  selector: 'td-main',
  standalone: true,
  imports: [TodoComponent, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private readonly _todosService = inject(TodosService);
  private readonly _filterSig = inject(TodosService).filterSig;
  private readonly _todosSig = inject(TodosService).todosSig;

  public readonly isEmptyTodos = inject(TodosService).isEmptyTodos;

  public readonly visibleTodosSig = computed((): ITodo[] => {
    switch (this._filterSig()) {
      case EFilter.active:
        return this._todosSig().filter((todo: ITodo) => !todo.isCompleted);
      case EFilter.completed:
        return this._todosSig().filter((todo: ITodo) => todo.isCompleted);
      default:
        return this._todosSig();
    }
  });

  public isAllTodosChecked = computed(() => this._todosSig().every((todo: ITodo) => todo.isCompleted));

  public editingId: string | null = null;

  public setEditingId(id: string | null): void {
    this.editingId = id;
  }

  public toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this._todosService.toggleAllTodos(target.checked);
  }
}
