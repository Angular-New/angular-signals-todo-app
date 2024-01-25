import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { TodosService } from '@services/todos.service';

@Component({
  selector: 'td-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _todosService: TodosService = inject(TodosService);
  public value = signal<string>('');

  public onChangeTodo(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.value.set(target.value);
  }

  public onAddTodo(): void {
    this._todosService.addTodo(this.value());
    this.value.set('');
  }
}
