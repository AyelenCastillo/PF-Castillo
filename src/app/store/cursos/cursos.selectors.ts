import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CursosState } from './cursos.reducers';


export const selectCursosState = createFeatureSelector<CursosState>('courses');

export const selectCourses = createSelector(
  selectCursosState,
  (state: CursosState) => state.courses
);
