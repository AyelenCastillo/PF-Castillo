import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../layoults/dashboard/pages/cursos/models';

export const CursosActions = createActionGroup({
  source: 'courses',
  events: {
    LoadCourses: emptyProps(),
    LoadCoursesSuccess: props<{ courses: Course[] }>(),
    LoadCoursesFailure: props<{ error: string }>(),
    AddCourse: props<{ course: Course }>(),
    AddCourseSuccess: emptyProps(),
    AddCourseFailure: props<{ error: string }>(),
    DeleteCourse: props<{ courseId: number }>(),
    DeleteCourseSuccess: emptyProps(),
    DeleteCourseFailure: props<{ error: string }>(),
    UpdateCourse: props<{ updatedCourse: Course }>(),
    UpdateCourseSuccess: props<{ updatedCourse: Course }>(),
    UpdateCourseFailure: props<{ error: string }>()
  }
});
