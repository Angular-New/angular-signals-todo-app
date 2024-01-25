import { ITodo } from '../types';

export class TodoModel implements ITodo {
  constructor(
    public id: string,
    public text: string,
    public isCompleted: boolean,
  ) {}
}
