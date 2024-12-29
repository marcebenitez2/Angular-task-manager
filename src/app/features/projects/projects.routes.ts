// src/app/features/projects/projects.routes.ts
import { Routes } from '@angular/router';

export const projectRoutes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./project-list/project-list.component').then(m => m.ProjectListComponent)
  }
];