import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center px-4">
      <div class="max-w-lg w-full text-center">
        <h1 class="text-9xl font-bold text-gray-800">404</h1>
        
        <div class="space-y-6 mt-8">
          <h2 class="text-3xl font-semibold text-gray-700">
            ¡Página no encontrada!
          </h2>
          
          <p class="text-gray-600">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>

          <div class="flex justify-center gap-4">
            <button 
              (click)="goBack()"
              class="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Volver atrás
            </button>
            
            <button 
              (click)="goHome()"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goBack(): void {
    window.history.back();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}