// src/app/features/projects/new-project/new-project.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-new-project',
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
          <mat-card-title>Crear Nuevo Proyecto</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
            <mat-form-field>
              <mat-label>Nombre del Proyecto</mat-label>
              <input
                matInput
                formControlName="name"
                placeholder="Ingresa el nombre"
              />
              <mat-error *ngIf="projectForm.get('name')?.errors?.['required']">
                El nombre es requerido
              </mat-error>
            </mat-form-field>

            <mat-form-field>
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
                [disabled]="projectForm.invalid"
              >
                Crear Proyecto
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './project-form.component.css',
})
export class NewProjectComponent {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe({
        next: () => {
          // Redirigir a la lista de proyectos después de crear
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error creating project:', error);
          // Aquí podrías agregar un manejo de errores más sofisticado
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
