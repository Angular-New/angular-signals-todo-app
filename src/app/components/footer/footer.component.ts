import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { TodosService } from '@services/todos.service';

import { EFilter } from '../../shared/enums';
import { ITodo } from '../../shared/types';

@Component({
  selector: 'td-footer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly _todosService = inject(TodosService);

  protected readonly EFilter = EFilter;

  public readonly filterSig = inject(TodosService).filterSig;

  public readonly countActiveTodosSig = computed(
    () => this._todosService.todosSig().filter((todo: ITodo) => !todo.isCompleted).length,
  );

  public readonly isEmptyTodos = computed(() => this._todosService.todosSig().length === 0);

  public readonly message = computed(() => `item${this.countActiveTodosSig() !== 1 ? 's' : ''} left`);

  public changeFilter(filter: EFilter): void {
    this._todosService.changeFilter(filter);
  }
}
