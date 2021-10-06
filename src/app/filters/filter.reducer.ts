import { Action, createReducer, on } from '@ngrx/store';
import { setFilter } from './filter.actions';

export const initialState = 'All';

const _filterReducer = createReducer(
  initialState,
  on(setFilter, (state, {filter}) => filter)
);

export function filterReducer(state: any, action: Action) {
  return _filterReducer(state, action);
}
