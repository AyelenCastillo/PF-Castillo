import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cursos } from '../../models';


@Component({
  selector: 'app-cursosformedit',
  templateUrl: './cursosformedit.component.html',
  styleUrl: './cursosformedit.component.scss'
})
export class CursosformeditComponent {
  @Output() edited = new EventEmitter<Cursos>(); 

  cursosForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CursosformeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cursos,
    private fb: FormBuilder
  ) {
    this.cursosForm = this.fb.group({
      name: [data.name, Validators.required],
      date: [data.date, Validators.required],
      hours: [data.hours, [Validators.required]],
      description: [data.description, Validators.required],
      price: [data.price, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.cursosForm.valid) {
      this.edited.emit(this.cursosForm.value);
      this.dialogRef.close(this.cursosForm.value);
    }
  }
  cerrarModal(): void {
    this.dialogRef.close();
  }
}
