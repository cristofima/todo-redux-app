import { createAction, props } from '@ngrx/store';

export type validFilters = 'All' | 'Completed' | 'Pending';

export const setFilter = createAction('[Filter] Set filter', props<{filter: validFilters}>());
