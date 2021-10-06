import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { validFilters } from 'src/app/filters/filter.actions';
import * as filterActions from '../../filters/filter.actions';
import * as todoActions from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  currentFiler!: string;
  filters: validFilters[] = ['All', 'Completed', 'Pending'];
  pendingTodos = 0;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.subscribe(state => {
      this.currentFiler = state.filter;
      this.pendingTodos = state.todos.filter(todo => !todo.completed).length;
    });
  }

  changeFilter(filter: validFilters){
    this.store.dispatch(filterActions.setFilter({filter: filter}));
  }

  clearCompleted(){
    this.store.dispatch(todoActions.clearCompleted());
  }

}
