// src/app/features/projects/projects.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const projectRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./project-list/project-list.component').then(
        (m) => m.ProjectListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./project-form/project-form.component').then(
        (m) => m.NewProjectComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./project-edit/project-edit.component').then(
        (m) => m.ProjectEditComponent
      ),
    canActivate: [authGuard],
  },
];
