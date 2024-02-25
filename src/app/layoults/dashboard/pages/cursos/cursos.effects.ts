import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { concatMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CursosActions } from '../../../../store/cursos/cursos.actions';
import { CursosService } from './cursos.service';

@Injectable()
export class CursosEffects {

    constructor(
        private actions$: Actions,
        private cursosService: CursosService
      ) {}

      loadCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CursosActions.loadCourses),
        concatMap(() => this.cursosService.getCourse().pipe( 
          map(courses => CursosActions.loadCoursesSuccess({ courses })),
          catchError(error => of(CursosActions.loadCoursesFailure({ error: error.message })))
        ))
      ));

      updateCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CursosActions.updateCourse),
        concatMap(action => this.cursosService.updateCourse(action.updatedCourse).pipe( 
          map(() => CursosActions.loadCourses()), 
          catchError(error => of(CursosActions.updateCourseFailure({ error: error.message })))
        ))
    ));


      addCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CursosActions.addCourse),
        concatMap(({ course }) => this.cursosService.addCourse(course).pipe(
          map(() => CursosActions.loadCourses()),
          catchError(error => of(CursosActions.addCourseFailure({ error: error.message })))
        ))
      ));
    
      deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(CursosActions.deleteCourse),
        concatMap(({ courseId }) => this.cursosService.deleteCourse(courseId).pipe(
          map(() => CursosActions.loadCourses()),
          catchError(error => of(CursosActions.deleteCourseFailure({ error: error.message })))
        ))
      ));
}

