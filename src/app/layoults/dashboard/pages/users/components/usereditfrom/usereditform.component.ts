import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-usereditform',
  templateUrl: './usereditform.component.html',
  styleUrls: ['./usereditform.component.scss']
})
export class UsereditformComponent {
  @Output() edited = new EventEmitter<User>(); 

  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UsereditformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, Validators.required],
      role: [data.role, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.edited.emit(this.userForm.value);
      this.dialogRef.close(this.userForm.value);
    }
  }
  cerrarModal(): void {
    this.dialogRef.close();
  }
}
