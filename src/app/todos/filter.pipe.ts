import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';

@Pipe({
  name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: string): Todo[] {
    switch(filter){
      case 'Completed':
        return todos.filter(todo => todo.completed);
      case 'Pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }

}
