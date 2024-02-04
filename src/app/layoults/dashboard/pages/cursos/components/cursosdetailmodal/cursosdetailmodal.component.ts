import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cursos } from '../../models';

@Component({
  selector: 'app-cursosdetailmodal',
  templateUrl: './cursosdetailmodal.component.html',
  styleUrl: './cursosdetailmodal.component.scss'
})
export class CursosdetailmodalComponent {
  cursos: Cursos;

  constructor(
    public dialogRef: MatDialogRef<CursosdetailmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cursos
  ) {
    this.cursos = data;
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
