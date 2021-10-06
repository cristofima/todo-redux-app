import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { clearCompleted, create, edit, remove, toggle, toggleAll } from './todo.actions';

export const initialState: Todo[] = [];

const _todoReducer = createReducer(
  initialState,
  on(create, (state, {text}) => [...state, new Todo(text)]),
  on(remove, (state, {id}) => {
    return state.filter(todo => todo.id != id);
  }),
  on(toggle, (state, {id}) => {
    return state.map(todo => {
      if(todo.id != id){
        return todo;
      }

      return{
        ...todo,
        completed: !todo.completed
      }
    });
  }),
  on(toggleAll, (state, {completed}) => {
    return state.map(todo => {
      return{
        ...todo,
        completed: completed
      }
    });
  }),
  on(edit, (state, {id, text}) => {
    return state.map(todo => {
      if(todo.id != id){
        return todo;
      }

      return{
        ...todo,
        text: text
      }
    });
  }),
  on(clearCompleted, (state) => {
    return state.filter(todo => !todo.completed);
  })
);

export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}

