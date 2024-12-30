import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <div class="header-content">
            <mat-icon class="header-icon">person_add</mat-icon>
            <mat-card-title>Registrarse</mat-card-title>
            <mat-card-subtitle>Regístrate para comenzar</mat-card-subtitle>
          </div>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Nombre de usuario</mat-label>
              <input
                matInput
                formControlName="username"
                placeholder="Escriba su nombre de usuario"
              />
              <mat-icon matPrefix>person</mat-icon>
              <mat-error
                *ngIf="registerForm.get('username')?.errors?.['required']"
              >
                Nombre de usuario es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                formControlName="email"
                placeholder="Escriba su email"
              />
              <mat-icon matPrefix>email</mat-icon>
              <mat-error
                *ngIf="registerForm.get('email')?.errors?.['required']"
              >
                El email es requerido
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.errors?.['email']">
                El email no es válido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Contraseña</mat-label>
              <input
                matInput
                [type]="hidePassword ? 'password' : 'text'"
                formControlName="password"
              />
              <mat-icon matPrefix>lock</mat-icon>
              <mat-icon matSuffix (click)="hidePassword = !hidePassword">
                {{ hidePassword ? 'visibility_off' : 'visibility' }}
              </mat-icon>
              <mat-error
                *ngIf="registerForm.get('password')?.errors?.['required']"
              >
                La contraseña es requerida
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="registerForm.invalid"
              class="submit-button"
            >
              Registrarse
            </button>
          </form>

          <div class="login-link">
            ¿Ya tienes cuenta?
            <a mat-button color="accent" routerLink="/auth/login">
              Inicia sesión aquí
            </a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .register-container {
        height: calc(100vh - 64px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .register-card {
        max-width: 400px;
        width: 100%;
        padding: 20px;
        background-color: #1e1e1e;
        color: #ffffff;
      }

      .header-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 20px;
      }

      .header-icon {
        font-size: 48px;
        height: 48px;
        width: 48px;
        margin-bottom: 16px;
        color: var(--primary-color);
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      mat-form-field {
        width: 100%;
      }

      .submit-button {
        height: 48px;
        font-size: 16px;
        margin-top: 16px;
      }

      mat-card-title {
        font-size: 24px;
        margin: 8px 0;
      }

      mat-card-subtitle {
        margin-bottom: 0;
      }

      .login-link {
        text-align: center;
        margin-top: 20px;
        color: #cccccc;
      }

      input {
        color: #ffffff !important;
      }

      mat-label {
        color: #cccccc !important;
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          // Aquí podrías agregar un manejo de errores más elaborado
        },
      });
    }
  }
}