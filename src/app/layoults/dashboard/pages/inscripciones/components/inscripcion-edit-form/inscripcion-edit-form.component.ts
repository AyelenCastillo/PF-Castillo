import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inscripciones } from '../../models';


@Component({
  selector: 'app-inscripcion-edit-form',
  templateUrl: './inscripcion-edit-form.component.html',
  styleUrl: './inscripcion-edit-form.component.scss'
})
export class InscripcionEditFormComponent {
  @Output() edited = new EventEmitter<Inscripciones>(); 

  InscripcionesForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<InscripcionEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscripciones,
    private fb: FormBuilder
  ) {
    this.InscripcionesForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, Validators.required],
      curso: [data.role, Validators.required],
      date: [data.role, Validators.required],
      hours: [data.role, Validators.required],
      role: [data.role, Validators.required],
      dni: [data.dni, Validators.required],
      birth: [data.birth, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.InscripcionesForm.valid) {
      this.edited.emit(this.InscripcionesForm.value);
      this.dialogRef.close(this.InscripcionesForm.value);
    }
  }
  cerrarModal(): void {
    this.dialogRef.close();
  }
}
