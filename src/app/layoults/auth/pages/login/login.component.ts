import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginData } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required, Validators.pattern(/.*[0-9].*/), Validators.minLength(6)]),
    });
    this.form.patchValue({
      email: 'admin@example.com',
      password: 'Admin1'
    });
  }
  
  getEmailErrorMessage(): string | null {
    const emailControl = this.form?.get('email');
    if (emailControl?.hasError('email')) {
      return 'No es un email válido.';
    }
    if (emailControl?.hasError('required')) {
      return 'Este campo es requerido.';
    }
    return null;
  }
  
  getPasswordErrorMessage(): string | null {
    const passwordControl = this.form?.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Este campo es requerido.';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return null;
  }
  

  onSubmit(): void {
    const form = this.form;
    if (form && form.valid) {
        const email = form.get('email')?.value;
        const password = form.get('password')?.value;
  
        if (email && password) {
            const loginData: LoginData = { email, password };
            this.authService.login(loginData);
        }
    }
  }  


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
