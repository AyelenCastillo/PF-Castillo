import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService, LoginData } from './auth.service';
import { UsersService } from '../dashboard/pages/users/users.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  const usersServiceMock = {
    getUsers: () => of([
      { email: 'admin@example.com', password: 'admin123', role: 'ADMIN' },
      { email: 'user@example.com', password: 'user123', role: 'User' }
    ])
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate')} } // Espía el método navigate
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('logiarse con credenciales validas', async(inject([UsersService], (usersService: UsersService) => {
    const loginData: LoginData = { email: 'admin@example.com', password: 'admin123' };
    service.login(loginData);
    expect(router.navigate).toHaveBeenCalledWith(['dashboard']); 
  })));

  it('no debe logearse con credenciales invalidas', async(inject([UsersService], (usersService: UsersService) => {
    const loginData: LoginData = { email: 'nonexistent@example.com', password: 'password123' };
    service.login(loginData);
    expect(service.authUser).toBeNull();
  })));

  it('debe cerrar secion', () => {
    service.logout();
    expect(service.authUser).toBeNull();
  });

  it('debe generar token', () => {
    const token = service.generarToken();
    expect(token.length).toBe(10);
  });

  it('verificar token', (done: DoneFn) => {
    // Simulamos que el token existe en el localStorage
    localStorage.setItem('token', 'testtoken');
  
    service.verifyToken().subscribe((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });
});
