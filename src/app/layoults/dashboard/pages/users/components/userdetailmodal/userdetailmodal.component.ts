import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-userdetailmodal',
  templateUrl: './userdetailmodal.component.html',
  styleUrl: './userdetailmodal.component.scss'
})
export class UserdetailmodalComponent {
  usuario: User;

  constructor(
    public dialogRef: MatDialogRef<UserdetailmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.usuario = data;
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
