import { Component, OnInit } from '@angular/core';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="new-project-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Editar Proyecto' : 'Crear Nuevo Proyecto' }}</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="editProject" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width">
              <mat-label>Nombre del Proyecto</mat-label>
              <input
                matInput
                formControlName="name"
                placeholder="Ingresa el nombre"
              />
              <mat-error *ngIf="editProject.get('name')?.errors?.['required']">
                El nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Descripción</mat-label>
              <textarea
                matInput
                formControlName="description"
                placeholder="Describe tu proyecto"
                rows="4"
              ></textarea>
            </mat-form-field>

            <div class="actions">
              <button mat-button type="button" (click)="goBack()">
                Cancelar
              </button>
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="editProject.invalid"
              >
                {{ isEditMode ? 'Guardar Cambios' : 'Crear Proyecto' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .new-project-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      }

      mat-card {
        width: 100%;
        max-width: 600px;
      }

      mat-form-field.full-width {
        width: 100%;
      }

      .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
    `,
  ],
})
export class ProjectEditComponent implements OnInit {
  editProject: FormGroup;
  project?: Project;
  isEditMode = false; // Indica si estamos en modo edición

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {
    this.editProject = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id; // Si hay un ID, estamos en modo edición

    if (this.isEditMode && id) {
      this.loadProjectData(id);
    }
  }

  private loadProjectData(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (project: Project) => {
        this.project = project;
        this.editProject.patchValue({
          name: project.name,
          description: project.description,
        });
      },
      error: (error) => {
        console.error('Error loading project:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.editProject.invalid) {
      return;
    }

    const projectData = this.editProject.value;

    if (this.isEditMode && this.project?._id) {
      // Actualizar proyecto existente
      this.projectService.updateProject(this.project._id, projectData).subscribe({
        next: () => {
          console.log('Proyecto actualizado exitosamente');
          this.goBack();
        },
        error: (error) => {
          console.error('Error actualizando proyecto:', error);
        },
      });
    } else {
      // Crear nuevo proyecto
      this.projectService.createProject(projectData).subscribe({
        next: (newProject) => {
          console.log('Proyecto creado exitosamente:', newProject);
          this.goBack();
        },
        error: (error) => {
          console.error('Error creando proyecto:', error);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/projects']); // Cambia la ruta según la navegación de tu aplicación
  }
}
