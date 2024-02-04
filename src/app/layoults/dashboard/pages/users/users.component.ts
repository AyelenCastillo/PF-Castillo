import { ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from './models';
import { MatDialog } from '@angular/material/dialog';
import { UsereditformComponent } from './components/usereditfrom/usereditform.component';
import { UsersService } from './users.service';
import { UserdetailmodalComponent } from './components/userdetailmodal/userdetailmodal.component';
import { UserformComponent } from './components/userform/userform.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
  users: User[] = [];

  constructor(private UsersService: UsersService, private dialog: MatDialog, private cdr: ChangeDetectorRef) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.UsersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      }
    });
  }

  onUserSubmitted(newUser: User): void {
    this.users = [...this.users, { ...newUser, id: new Date().getTime() }];
    this.cdr.detectChanges();
  }

  eliminarFila(usuario: User): void {
    const confirmMessage = `¿Estás seguro de que quieres eliminar a ${usuario.firstName} ${usuario.lastName}?`;

    this.confirmAndDelete(confirmMessage, () => {
      this.users = this.users.filter(item => item !== usuario);
      this.cdr.detectChanges();
      Swal.fire('Eliminado', 'La fila ha sido eliminada.', 'success');
    });
  }

  editarFila(usuario: User): void {
    const dialogRef = this.dialog.open(UsereditformComponent, {
      width: '400px',
      data: usuario
    });

    dialogRef.componentInstance.edited.subscribe((datosActualizados: User) => {
      const index = this.users.findIndex(item => item.id === usuario.id);
      if (index !== -1) {
        this.users = [...this.users.slice(0, index), { ...this.users[index], ...datosActualizados }, ...this.users.slice(index + 1)];
        this.cdr.detectChanges();
        dialogRef.close();
      }
    });
  }

  mostrarDetallesModal(usuario: User): void {
    const dialogRef = this.dialog.open(UserdetailmodalComponent, {
      width: '400px',
      data: usuario
    });
  }

  abrirFormulario(): void {
    const dialogRef = this.dialog.open(UserformComponent, {
      width: '100%',
    });
  
    dialogRef.afterClosed().subscribe((result: User | undefined) => {
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
