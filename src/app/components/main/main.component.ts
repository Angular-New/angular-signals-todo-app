import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TodosService } from '@services/todos.service';

@Component({
  selector: 'td-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public readonly todos = inject(TodosService).todos;
}
