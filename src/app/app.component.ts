import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <span class="title">Project Management</span>
      <span class="spacer"></span>
      <ng-container *ngIf="isLoggedIn$ | async; else loginButton">
        <button mat-button routerLink="/projects">Proyectos</button>
        <button mat-button (click)="logout()">Cerrar Sesión</button>
      </ng-container>
      <ng-template #loginButton>
        <button mat-button routerLink="/auth/login">Login</button>
      </ng-template>
    </mat-toolbar>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background-color: #121212;
      }

      .toolbar {
        background-color: #1e1e1e;
      }

      .title {
        color: var(--primary-color);
        font-weight: 500;
      }

      .spacer {
        flex: 1 1 auto;
      }

      main {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
    `,
  ],
})

export class AppComponent {
  isLoggedIn$;

  constructor(
    private authService: AuthService,
    private router: Router  
  ) {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']); // Añadimos la redirección
  }
}