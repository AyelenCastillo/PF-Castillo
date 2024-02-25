import { createReducer, on } from '@ngrx/store';
import { CursosActions } from './cursos.actions';
import { Course } from '../../layoults/dashboard/pages/cursos/models';

export interface CursosState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialState: CursosState = {
    courses: [],
    loading: false,
    error: null
  };

export const cursosReducer = createReducer(
  initialState,
  on(CursosActions.loadCourses, state => ({ ...state, loading: true })),
  on(CursosActions.loadCoursesSuccess, (state, { courses }) => ({ ...state, courses, loading: false, error: null })),
  on(CursosActions.loadCoursesFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(CursosActions.addCourse, state => ({ ...state, loading: true })),
  on(CursosActions.addCourseSuccess, state => ({ ...state, loading: false })),
  on(CursosActions.addCourseFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(CursosActions.deleteCourse, state => ({ ...state, loading: true })),
  on(CursosActions.deleteCourseSuccess, state => ({ ...state, loading: false })),
  on(CursosActions.deleteCourseFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(CursosActions.updateCourse, state => ({ ...state, loading: true })),
  on(CursosActions.updateCourseSuccess, (state, { updatedCourse }) => ({
    ...state,
    courses: state.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c),
    loading: false
  })),
  on(CursosActions.updateCourseFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
