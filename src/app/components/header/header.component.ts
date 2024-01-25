import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private _value$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public value$: Observable<string> = this._value$.asObservable();

  public onChangeTodo(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this._value$.next(target.value);
  }

  public onAddTodo(): void {
    this._todosService.addTodo(this._value$.value);
    this._value$.next('');
  }
}
