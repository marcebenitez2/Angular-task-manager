// src/app/features/projects/project-list/project-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div class="projects-container">
      <header class="projects-header">
        <h1>Mis Proyectos</h1>
        <button mat-raised-button color="primary" routerLink="new">
          <mat-icon>add</mat-icon>
          Nuevo Proyecto
        </button>
      </header>

      <mat-form-field class="search-field">
        <mat-label>Buscar proyectos</mat-label>
        <input
          matInput
          [formControl]="searchControl"
          placeholder="Escribe para buscar..."
        />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="projects-grid">
        @for (project of filteredProjects; track project._id) {
        <mat-card
          class="project-card"
          [routerLink]="['/projects', project._id]"
        >
          <mat-card-header>
            <mat-card-title>{{ project.name }}</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <p class="project-description">{{ project.description }}</p>
          </mat-card-content>

          <mat-card-actions align="end">
            <button mat-button color="primary">
              <mat-icon>visibility</mat-icon>
              Ver detalles
            </button>
          </mat-card-actions>
        </mat-card>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .projects-container {
        padding: 20px;
      }

      .projects-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        h1 {
          margin: 0;
          color: white;
          font-size: 24px;
        }
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }

      .project-card {
        background-color: #1e1e1e;
        color: white;
        cursor: pointer;
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-4px);
        }
      }

      .project-description {
        margin: 16px 0;
        color: #cccccc;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      mat-card-title {
        color: white;
      }

      mat-card-subtitle {
        color: #cccccc;
      }

      .status-active {
        background-color: #4caf50;
        color: white;
      }

      .status-completed {
        background-color: #2196f3;
        color: white;
      }

      .status-on-hold {
        background-color: #ffc107;
        color: black;
      }

      mat-card-actions button {
        margin-right: 8px;
      }

      .search-field {
        width: 100%;
        margin-bottom: 20px;
        color: white;
      }

      ::ng-deep .search-field .mat-form-field-outline {
        color: white;
      }

      ::ng-deep .search-field .mat-form-field-label {
        color: white;
      }

      ::ng-deep .search-field .mat-input-element {
        color: white;
      }
    `,
  ],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projects = this.route.snapshot.data['projects'];
    this.filteredProjects = this.projects;
    // Cargar proyectos
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.filterProjects(searchTerm || '');
      });

    // Configurar la búsqueda en tiempo real
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.filterProjects(searchTerm || '');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterProjects(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredProjects = this.projects;
      return;
    }

    searchTerm = searchTerm.toLowerCase();
    this.filteredProjects = this.projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
    );
  }
}
