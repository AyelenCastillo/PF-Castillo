import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../auth.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'; // Asegúrate de importar MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Puede que necesites importar MatInputModule si usas MatInput
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
    let component: LoginComponent | null;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: jasmine.SpyObj<AuthService>;
  
    beforeEach(async(() => {
      const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
      TestBed.configureTestingModule({
        declarations: [ LoginComponent ],
        imports: [ ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, BrowserAnimationsModule, ], 
        providers: [
          FormBuilder,
          { provide: AuthService, useValue: authServiceSpy }
        ]
      })
      .compileComponents();
      authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('crear componente', () => {
        expect(component).toBeTruthy();
    });


    it('inicializar con valores defoult', () => {
        expect(component?.form.get('email')?.value).toBe('admin@example.com');
        expect(component?.form.get('password')?.value).toBe('Admin1');
    });

    it('requisito de pass y email', () => {
        const email = component?.form.get('email');
        const password = component?.form.get('password');
        email?.setValue('');
        password?.setValue('');
        expect(email?.valid).toBeFalsy();
        expect(password?.valid).toBeFalsy();
    });

    it('mensajes de error', () => {
        const email = component?.form.get('email');
        const password = component?.form.get('password');
        email?.setValue('invalidemail');
        password?.setValue('12345');
        expect(component?.getEmailErrorMessage()).toBe('No es un email válido.');
        expect(component?.getPasswordErrorMessage()).toBe('La contraseña debe tener al menos 6 caracteres.');
    });

    it('accionar el authservice cuando los datos son validos', () => {
        const email = 'test@example.com';
        const password = 'Test123';
        const loginData = { email, password };
        component?.form.get('email')?.setValue(email);
        component?.form.get('password')?.setValue(password);
        authService.login.and.returnValue(undefined); // Aquí se establece el valor de retorno
        component?.onSubmit();
        expect(authService.login).toHaveBeenCalledWith(loginData);
    });

    it('el ojito de la pass', () => {
        expect(component?.showPassword).toBe(false);
        component?.togglePasswordVisibility();
        expect(component?.showPassword).toBe(true);
    });
});
