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
  styleUrl: './project-list.component.css',
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
