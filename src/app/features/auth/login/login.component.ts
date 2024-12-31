import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
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
    MatSnackBarModule,
    MatProgressSpinner,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <div class="header-content">
            <mat-icon class="header-icon">lock</mat-icon>
            <mat-card-title>Bienvenido</mat-card-title>
            <mat-card-subtitle>Inicia sesión para continuar</mat-card-subtitle>
          </div>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field>
              <mat-label>Email</mat-label>
              <input
                matInput
                type="email"
                formControlName="email"
                placeholder="Ingrese su email"
              />
              <mat-icon matPrefix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.errors?.['required']">
                El email es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field>
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
                *ngIf="loginForm.get('password')?.errors?.['required']"
              >
                La contraseña es requerida
              </mat-error>
            </mat-form-field>

            <button
              mat-raised-button
              color="primary"
              type="submit"
              [disabled]="loginForm.invalid || isLoading"
              class="submit-button"
            >
              <span *ngIf="!isLoading">Iniciar sesión</span>
              <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
            </button>
          </form>

          <div class="register-link">
            ¿No tienes cuenta?
            <a mat-button color="accent" routerLink="/auth/register">
              Regístrate aquí
            </a>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/projects']);
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
