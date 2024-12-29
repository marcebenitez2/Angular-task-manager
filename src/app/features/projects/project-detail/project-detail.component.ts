// src/app/features/projects/project-detail/project-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (project) {
      <div class="p-4">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <!-- Agrega más detalles según tu modelo de Project -->
      </div>
    } @else {
      <p>Cargando...</p>
    }
  `,
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    // Obtener el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(id).subscribe({
        next: (project) => {
          this.project = project;
        },
        error: (error) => {
          console.error('Error al cargar el proyecto:', error);
        }
      });
    }
  }
}