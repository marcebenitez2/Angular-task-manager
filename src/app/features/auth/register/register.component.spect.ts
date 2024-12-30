import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../core/services/auth.service';
import { of, throwError } from 'rxjs';

class MockAuthService {
  register(data: any) {
    return of({}); // Simula una respuesta exitosa
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const form = component.registerForm;
    expect(form.get('username')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('password')?.value).toBe('');
  });

  it('should validate the form as invalid if fields are empty', () => {
    const form = component.registerForm;
    expect(form.valid).toBeFalse();
  });

  it('should validate the form as valid if fields are correctly filled', () => {
    component.registerForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should call AuthService.register on form submission', () => {
    spyOn(authService, 'register').and.callThrough();

    component.registerForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith({
      name: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should navigate to /projects on successful registration', () => {
    component.registerForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  it('should handle registration errors', () => {
    spyOn(authService, 'register').and.returnValue(
      throwError(() => new Error('Registration failed'))
    );
    spyOn(console, 'error');

    component.registerForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith(
      'Error en el registro:',
      jasmine.any(Error)
    );
  });
});
