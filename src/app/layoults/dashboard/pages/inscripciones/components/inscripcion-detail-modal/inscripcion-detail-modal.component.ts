import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripciones } from '../../models/index';


@Component({
  selector: 'app-inscripcion-detail-modal',
  templateUrl: './inscripcion-detail-modal.component.html',
  styleUrl: './inscripcion-detail-modal.component.scss'
})
export class InscripcionDetailModalComponent {
  Inscripciones: Inscripciones;

  constructor(
    public dialogRef: MatDialogRef<InscripcionDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscripciones
  ) {
    this.Inscripciones = data;
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}