import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from './models';
import { CursosService } from './cursos.service';
import { HttpClient } from '@angular/common/http';
import { CursosformeditComponent } from './components/cursosformedit/cursosformedit.component';
import { CursosdetailmodalComponent } from './components/cursosdetailmodal/cursosdetailmodal.component';
import { DatePipe } from '@angular/common';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { Store, select } from '@ngrx/store';
import { CursosActions } from '../../../../store/cursos/cursos.actions';
import { selectCourses } from '../../../../store/cursos/cursos.selectors';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  accordionEnabled = true;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  dataSource: MatTableDataSource<Course>;
  panelOpenState = false;
  isAdmin = false;
  displayedColumns: string[] = ['id', 'name', 'date', 'hours', 'start', 'end', 'actions'];
  courseForm: FormGroup;
  courses: Course[] = [];

  constructor(
    private cursosService: CursosService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private datePipe: DatePipe,
    private store: Store
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      hours: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.dataSource = new MatTableDataSource<Course>([]);
    this.store.dispatch(CursosActions.loadCourses());
  }

  formatFecha(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.authUser?.role === 'ADMIN';
    this.store.pipe(select(selectCourses)).subscribe(courses => {
      const formattedCourses = courses.map(course => {
        return {
          ...course,
          start: this.formatFecha(new Date(course.start)),
          end: this.formatFecha(new Date(course.end))
        };
      });
      this.dataSource.data = formattedCourses;
    });
  }
  
  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      const formData = this.courseForm.value;
      let startDate = new Date(formData.start);
      let endDate = new Date(formData.end);

      if (startDate.getTime() === endDate.getTime()) {
        endDate.setDate(endDate.getDate() + 1);
      }

      formData.start = this.formatFecha(startDate);
      formData.end = this.formatFecha(endDate);

      this.store.dispatch(CursosActions.addCourse({ course: formData }));
      this.courseForm.reset();
      Swal.fire('Curso agregado', 'El curso ha sido agregado correctamente.', 'success');
      this.accordion.closeAll(); 
    }
  }

  deleteCourse(courseId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(CursosActions.deleteCourse({ courseId }));
        Swal.fire('¡Eliminado!', 'El Curso ha sido eliminado.', 'success');
      }
    });
  }

  editCourse(course: Course) {
    const dialogRef = this.dialog.open(CursosformeditComponent, {
      width: '400px',
      data: course,
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          const updatedCourse: Course = { ...course, ...result }; 
          this.updateCourse(updatedCourse);
          Swal.fire('Curso editado', 'El curso ha sido editado correctamente.', 'success');
        }
      },
      error: (error) => {
        console.error('Error al cerrar el diálogo:', error);
        Swal.fire('Error', 'Hubo un error al editar el curso.', 'error');
      }
    });
  }

  private updateCourse(updatedCourse: Course) {
    this.store.dispatch(CursosActions.updateCourse({ updatedCourse: updatedCourse }));
  }
  
  
  mostrarDetallesModal(course: Course): void {
    const dialogRef = this.dialog.open(CursosdetailmodalComponent, {
      width: '400px',
      data: { courseId: course.id },
    });
  }
}
