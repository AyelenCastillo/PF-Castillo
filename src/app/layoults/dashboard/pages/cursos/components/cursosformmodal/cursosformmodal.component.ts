import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Cursos } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cursosformmodal',
  templateUrl: './cursosformmodal.component.html',
  styleUrl: './cursosformmodal.component.scss'
})
export class CursosformmodalComponent {
  cursosForm: FormGroup;
  passwordAcceptable: boolean = false;
  @Output() userSubmitted = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<CursosformmodalComponent>, private fb: FormBuilder) {
    this.cursosForm = this.fb.group({
      name: this.fb.control("", Validators.required),
      date: this.fb.control("", Validators.required),
      hours: this.fb.control("", Validators.required),
      description: this.fb.control("", Validators.required),
      price: this.fb.control("", Validators.required),
    }); 
  }

  onSubmit(): void {
    if (this.cursosForm.invalid) {
      this.cursosForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.cursosForm.value);
    }
  }

  onUserSubmitted(newUser: Cursos): void {
    this.dialogRef.close(newUser);
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
