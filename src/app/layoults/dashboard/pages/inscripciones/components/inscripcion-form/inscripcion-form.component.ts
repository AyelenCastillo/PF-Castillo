import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Inscripciones } from '../../models/index';


@Component({
  selector: 'app-inscripcion-form',
  templateUrl: './inscripcion-form.component.html',
  styleUrl: './inscripcion-form.component.scss'
})
export class InscripcionFormComponent {
 InscripcionesForm: FormGroup;
  passwordAcceptable: boolean = false;
  @Output() userSubmitted = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<InscripcionFormComponent>, private fb: FormBuilder) {
    this.InscripcionesForm = this.fb.group({
      firstName: this.fb.control("", Validators.required),
      lastName: this.fb.control("", Validators.required),
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required, this.passwordValidator]),
      role: this.fb.control("", Validators.required),
      curso: this.fb.control("", Validators.required),
      date: this.fb.control("", Validators.required),
      hours: this.fb.control("", Validators.required),
      dni: this.fb.control("", Validators.required),
      birth: this.fb.control("", Validators.required),
    });

    const passwordControl = this.InscripcionesForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe(() => {
        this.passwordAcceptable = this.isPasswordAcceptable();
      });
    }
  }

  passwordValidator(control: AbstractControl | null): ValidationErrors | null {
    if (!control) {
      return null;
    }
    const value = control.value;
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const isValid = hasLetter && hasNumber;
  
    return isValid ? null : { invalidPassword: true };
  }

  isEmailInvalid(): boolean {
    const emailControl = this.InscripcionesForm.get('email');
    return !!emailControl && emailControl.touched && emailControl.hasError('email');
  }
  
  isPasswordInvalid(): boolean {
    const passwordControl = this.InscripcionesForm.get('password');
    return !!passwordControl && passwordControl.touched && passwordControl.hasError('invalidPassword');
  }
  
  isPasswordAcceptable() {
    const passwordControl = this.InscripcionesForm.get('password');
    return !!passwordControl && passwordControl.valid && this.passwordValidator(passwordControl) === null;
  }
  
  onSubmit(): void {
    if (this.InscripcionesForm.invalid) {
      this.InscripcionesForm.markAllAsTouched();
      console.log('Formulario no válido. Por favor, complete correctamente todos los campos.');
    } else {
      console.log('Enviando formulario:', this.InscripcionesForm.value);
      this.dialogRef.close(this.InscripcionesForm.value);
    }
  }

  onUserSubmitted(newUser: Inscripciones): void {
    this.dialogRef.close(newUser);
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
