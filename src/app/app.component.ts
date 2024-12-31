import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
  ],
  template: `
    <mat-toolbar color="primary" class="flex items-center justify-between px-4 sm:px-6 lg:px-8 toolbar">
      <!-- Logo/Title section -->
      <div class="flex items-center">
        <span class="text-lg sm:text-xl font-medium title hidden sm:block">Project Management</span>
        <span class="text-lg sm:text-xl font-medium title sm:hidden">PM</span>
      </div>

      <!-- Navigation section -->
      <div class="flex items-center space-x-2 sm:space-x-4">
        <ng-container *ngIf="isLoggedIn$ | async; else loginButton">
          <button 
            mat-button 
            routerLink="/projects"
            class="text-sm sm:text-base px-2 sm:px-4 py-1"
          >
            Proyectos
          </button>
          <button 
            mat-button 
            (click)="logout()"
            class="text-sm sm:text-base px-2 sm:px-4 py-1"
          >
            <span class="hidden sm:inline">Cerrar Sesión</span>
            <span class="sm:hidden">Salir</span>
          </button>
        </ng-container>
        <ng-template #loginButton>
          <button 
            mat-button 
            routerLink="/auth/login"
            class="text-sm sm:text-base px-2 sm:px-4 py-1"
          >
            Login
          </button>
        </ng-template>
      </div>
    </mat-toolbar>

    <main class="p-4 sm:p-6 lg:p-8 min-h-screen bg-[#121212]">
      <div class="max-w-7xl mx-auto w-full">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styles: [`
    .toolbar {
      background-color: #1e1e1e;
    }

    .title {
      color: var(--primary-color);
    }

    :host {
      display: block;
      min-height: 100vh;
      background-color: #121212;
    }
  `],
})
export class AppComponent {
  isLoggedIn$;
  title: string = 'prueba-angular';

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isAuthenticated$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}