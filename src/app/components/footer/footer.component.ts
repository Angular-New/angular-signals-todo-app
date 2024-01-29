import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { TodosService } from '@services/todos.service';

import { EFilter } from '../../shared/enums';

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
  public readonly countActiveTodosSig = inject(TodosService).countActiveTodosSig;
  public readonly isEmptyTodos = inject(TodosService).isEmptyTodos;

  public readonly message = computed(() => `item${this.countActiveTodosSig() !== 1 ? 's' : ''} left`);

  public changeFilter(filter: EFilter): void {
    this._todosService.changeFilter(filter);
  }
}
