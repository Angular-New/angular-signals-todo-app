import { ChangeDetectionStrategy, Component, WritableSignal, inject } from '@angular/core';

import { TodosService } from '@services/todos.service';

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
  private readonly _todosService: TodosService = inject(TodosService);

  public todos: WritableSignal<ITodo[]> = this._todosService.todos;
}
