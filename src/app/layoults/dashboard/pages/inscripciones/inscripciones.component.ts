import { ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { Inscripciones } from './models/index';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionEditFormComponent } from './components/inscripcion-edit-form/inscripcion-edit-form.component';
import { InscripcionDetailModalComponent } from './components/inscripcion-detail-modal/inscripcion-detail-modal.component';
import { InscripcionFormComponent } from './components/inscripcion-form/inscripcion-form.component';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrl: './inscripciones.component.scss'
})
export class InscripcionesComponent {
  displayedColumns: string[] = ['id', 'fullName','role','curso','date','hours', 'actions'];
  Inscripciones: Inscripciones[] = [];

  constructor(private InscripcionesService: InscripcionesService, private dialog: MatDialog, private cdr: ChangeDetectorRef) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.InscripcionesService.getInscripciones().subscribe({
      next: (inscripciones) => {
        this.Inscripciones = inscripciones;
      }
    });
  }

  onUserSubmitted(newUser: Inscripciones): void {
    this.Inscripciones = [...this.Inscripciones, { ...newUser, id: new Date().getTime() }];
    this.cdr.detectChanges();
  }

  eliminarFila(Inscripciones: Inscripciones): void {
    const confirmMessage = `¿Estás seguro de que quieres eliminar a ${Inscripciones.firstName} ${Inscripciones.lastName}?`;

    this.confirmAndDelete(confirmMessage, () => {
      this.Inscripciones = this.Inscripciones.filter(item => item !== Inscripciones);
      this.cdr.detectChanges();
      Swal.fire('Eliminado', 'La fila ha sido eliminada.', 'success');
    });
  }

  editarFila(Inscripciones: Inscripciones): void {
    const dialogRef = this.dialog.open(InscripcionEditFormComponent, {
      width: '400px',
      data: Inscripciones,
    });

    dialogRef.componentInstance.edited.subscribe((datosActualizados: Inscripciones) => {
      const index = this.Inscripciones.findIndex(item => item.id === Inscripciones.id);
      if (index !== -1) {
        this.Inscripciones = [...this.Inscripciones.slice(0, index), { ...this.Inscripciones[index], ...datosActualizados }, ...this.Inscripciones.slice(index + 1)];
        this.cdr.detectChanges();
        dialogRef.close();
      }
    });
  }

  mostrarDetallesModal(Inscripciones: Inscripciones): void {
    const dialogRef = this.dialog.open(InscripcionDetailModalComponent, {
      width: '400px',
      data: Inscripciones
    });
  }

  abrirFormulario(): void {
    const dialogRef = this.dialog.open(InscripcionFormComponent, {
      width: '100%',
    });
  
    dialogRef.afterClosed().subscribe((result: Inscripciones | undefined) => {
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
