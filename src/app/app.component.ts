import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TodosComponent } from '@components/todos/todos.component';

@Component({
  selector: 'td-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  //
}
