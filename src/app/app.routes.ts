import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
    canActivate: [authGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.routes').then(m => m.projectRoutes),
    canActivate: [authGuard]
  },
  { 
    path: '', 
    redirectTo: 'projects', // Cambiamos esto para que intente ir a projects primero
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  }
];