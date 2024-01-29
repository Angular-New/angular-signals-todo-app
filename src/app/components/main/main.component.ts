import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { TodosService } from '@services/todos.service';

import { EFilter } from '../../shared/enums';
import { ITodo } from '../../shared/types';

@Component({
  selector: 'td-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private readonly _filterSig = inject(TodosService).filterSig;
  private readonly _todosSig = inject(TodosService).todosSig;

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
}
