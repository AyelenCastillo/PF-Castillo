import { ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Cursos } from './models';
import { cursosService } from './cursos.service';
import { CursosformeditComponent } from './components/cursosformedit/cursosformedit.component';
import { CursosdetailmodalComponent } from './components/cursosdetailmodal/cursosdetailmodal.component';
import { CursosformmodalComponent } from './components/cursosformmodal/cursosformmodal.component';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})

export class CursosComponent {
  displayedColumns: string[] = ['id', 'name', 'date', 'hours', 'actions'];
  cursos: Cursos[] = [];

  constructor(private cursosService: cursosService, private dialog: MatDialog, private cdr: ChangeDetectorRef) {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursosService.getCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      }
    });
  }

  onUserSubmitted(newUser: Cursos): void {
    this.cursos = [...this.cursos, { ...newUser, id: new Date().getTime() }];
    this.cdr.detectChanges();
  }

  eliminarFila(cursos: Cursos): void {
    const confirmMessage = `¿Estás seguro de que quieres eliminar a ${cursos.name}?`;

    this.confirmAndDelete(confirmMessage, () => {
      this.cursos = this.cursos.filter(item => item !== cursos);
      this.cdr.detectChanges();
      Swal.fire('Eliminado', 'La fila ha sido eliminada.', 'success');
    });
  }

  editarFila(cursos: Cursos): void {
    const dialogRef = this.dialog.open(CursosformeditComponent, {
      width: '400px',
      data: cursos,
    });

    dialogRef.componentInstance.edited.subscribe((datosActualizados: Cursos) => {
      const index = this.cursos.findIndex(item => item.id === cursos.id);
      if (index !== -1) {
        this.cursos = [...this.cursos.slice(0, index), { ...this.cursos[index], ...datosActualizados }, ...this.cursos.slice(index + 1)];
        this.cdr.detectChanges();
        dialogRef.close();
      }
    });
  }

  mostrarDetallesModal(cursos: Cursos): void {
    const dialogRef = this.dialog.open(CursosdetailmodalComponent, {
      width: '400px',
      data: cursos,
    });
  }

  abrirFormulario(): void {
    const dialogRef = this.dialog.open(CursosformmodalComponent, {
      width: '100%',
    });
  
    dialogRef.afterClosed().subscribe((result: Cursos | undefined) => {
      if (result) {
        this.onUserSubmitted(result);
      }
    });
  }

  private confirmAndDelete(message: string, onConfirm: () => void): void {
    Swal.fire({
      title: 'Confirmar Eliminación',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  }
}
