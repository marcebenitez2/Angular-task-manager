// src/app/features/projects/task-edit-dialog/task-edit-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-semibold mb-6 text-cyan-400">Editar Tarea</h2>
      
      <form [formGroup]="editForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <mat-form-field class="w-full" floatLabel="always">
          <mat-label>Título de la Tarea</mat-label>
          <input matInput formControlName="title" placeholder="Ingrese el título" class="text-gray-200">
        </mat-form-field>

        <mat-form-field class="w-full" floatLabel="always">
          <mat-label>Descripción</mat-label>
          <textarea matInput formControlName="description" rows="4" 
                    placeholder="Describe la tarea en detalle" class="text-gray-200"></textarea>
        </mat-form-field>

        <mat-form-field class="w-full" floatLabel="always">
          <mat-label>Fecha límite</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="dueDate" 
                 placeholder="Seleccione una fecha" class="text-gray-200">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <div class="flex justify-end gap-4">
          <button mat-button type="button" (click)="onCancel()" 
                  class="text-gray-400 hover:text-gray-300">
            Cancelar
          </button>
          <button mat-raised-button color="primary" type="submit" 
                  [disabled]="editForm.invalid" 
                  class="bg-cyan-600 hover:bg-cyan-700">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  `
})
export class TaskEditDialogComponent {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.editForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      dueDate: [new Date(data.dueDate), Validators.required],
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}