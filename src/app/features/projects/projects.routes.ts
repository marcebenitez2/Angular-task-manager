import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ProjectListResolver } from './resolvers/project-list.resolver';

export const projectRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./project-list/project-list.component').then(
        (m) => m.ProjectListComponent
      ),
    resolve: { projects: ProjectListResolver },
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
