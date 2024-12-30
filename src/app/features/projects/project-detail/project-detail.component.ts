// src/app/features/projects/project-detail/project-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProjectService } from '../../../core/services/project.service';
import { TaskService } from '../../../core/services/task.service';
import { UserService } from '../../../core/services/users.service';
import { AuthService } from '../../../core/services/auth.service';
import { Project } from '../../../core/models/project.model';
import { Task } from '../../../core/models/task.model';
import { User } from '../../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DragDropModule,
  ],
  template: `
    @if (project) {
    <div class="container mx-auto px-4 py-8 max-w-5xl">
      <div class="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <!-- Cabecera del Proyecto -->
        <div class="bg-gray-800 p-8 border-b border-gray-700">
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h1 class="text-3xl font-bold text-cyan-400 mb-2">
                {{ project.name }}
              </h1>
              <p class="text-gray-300">{{ project.description }}</p>
            </div>
            @if (isProjectOwner) {
            <div class="flex gap-3">
              <button
                mat-raised-button
                color="warn"
                (click)="confirmDeleteProject()"
                class="shadow-sm bg-orange-600 hover:bg-orange-700"
              >
                <mat-icon class="mr-2">delete</mat-icon>
                Eliminar Proyecto
              </button>
              <button
                mat-raised-button
                color="primary"
                (click)="router.navigate(['/projects', project._id, 'edit'])"
                class="shadow-sm bg-cyan-600 hover:bg-cyan-700"
              >
                <mat-icon class="mr-2">edit</mat-icon>
                Editar Proyecto
              </button>
            </div>
            }
          </div>
        </div>

        <!-- Lista de Tareas con Drag and Drop -->
        <div class="p-8">
          <h2
            class="text-2xl font-semibold mb-6 text-cyan-400 flex items-center"
          >
            <mat-icon class="mr-2 text-cyan-400">list_alt</mat-icon>
            Lista de Tareas
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Columna Pendientes -->
            <div class="bg-gray-800 rounded-lg p-4">
              <h3
                class="text-lg font-semibold text-orange-400 mb-4 flex items-center"
              >
                <mat-icon class="mr-2">pending</mat-icon>
                Pendientes
              </h3>
              <div
                cdkDropList
                #pendingList="cdkDropList"
                [cdkDropListData]="pendingTasks"
                [cdkDropListConnectedTo]="[inProgressList, completedList]"
                class="min-h-[200px] space-y-4"
                (cdkDropListDropped)="drop($event)"
              >
                @for (task of pendingTasks; track task._id) {
                <div
                  cdkDrag
                  class="border border-gray-700 rounded-lg p-4 bg-gray-750 cursor-move hover:bg-gray-700 transition-all"
                >
                  <!-- Contenido de la tarea -->
                  <div class="task-content">
                    <h4 class="text-lg font-medium text-cyan-400">
                      {{ task.title }}
                    </h4>
                    <p class="text-gray-300 text-sm mt-2">
                      {{ task.description }}
                    </p>
                    <div class="mt-3 flex items-center text-sm text-gray-400">
                      <mat-icon class="mr-1 text-sm">event</mat-icon>
                      {{ task.dueDate | date : 'dd/MM/yyyy' }}
                    </div>
                    <div class="mt-2">
                      @for (userId of task.assignedTo; track userId) {
                      <span
                        class="inline-block bg-gray-700 px-2 py-1 rounded text-xs text-gray-300 mr-1"
                      >
                        {{ getUserName(userId) }}
                      </span>
                      }
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>

            <!-- Columna En Progreso -->
            <div class="bg-gray-800 rounded-lg p-4">
              <h3
                class="text-lg font-semibold text-cyan-400 mb-4 flex items-center"
              >
                <mat-icon class="mr-2">loop</mat-icon>
                En Progreso
              </h3>
              <div
                cdkDropList
                #inProgressList="cdkDropList"
                [cdkDropListData]="inProgressTasks"
                [cdkDropListConnectedTo]="[pendingList, completedList]"
                class="min-h-[200px] space-y-4"
                (cdkDropListDropped)="drop($event)"
              >
                @for (task of inProgressTasks; track task._id) {
                <div
                  cdkDrag
                  class="border border-gray-700 rounded-lg p-4 bg-gray-750 cursor-move hover:bg-gray-700 transition-all"
                >
                  <!-- Mismo contenido de tarea que arriba -->
                  <div class="task-content">
                    <h4 class="text-lg font-medium text-cyan-400">
                      {{ task.title }}
                    </h4>
                    <p class="text-gray-300 text-sm mt-2">
                      {{ task.description }}
                    </p>
                    <div class="mt-3 flex items-center text-sm text-gray-400">
                      <mat-icon class="mr-1 text-sm">event</mat-icon>
                      {{ task.dueDate | date : 'dd/MM/yyyy' }}
                    </div>
                    <div class="mt-2">
                      @for (userId of task.assignedTo; track userId) {
                      <span
                        class="inline-block bg-gray-700 px-2 py-1 rounded text-xs text-gray-300 mr-1"
                      >
                        {{ getUserName(userId) }}
                      </span>
                      }
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>

            <!-- Columna Completadas -->
            <div class="bg-gray-800 rounded-lg p-4">
              <h3
                class="text-lg font-semibold text-green-400 mb-4 flex items-center"
              >
                <mat-icon class="mr-2">check_circle</mat-icon>
                Completadas
              </h3>
              <div
                cdkDropList
                #completedList="cdkDropList"
                [cdkDropListData]="completedTasks"
                [cdkDropListConnectedTo]="[pendingList, inProgressList]"
                class="min-h-[200px] space-y-4"
                (cdkDropListDropped)="drop($event)"
              >
                @for (task of completedTasks; track task._id) {
                <div
                  cdkDrag
                  class="border border-gray-700 rounded-lg p-4 bg-gray-750 cursor-move hover:bg-gray-700 transition-all"
                >
                  <!-- Mismo contenido de tarea que arriba -->
                  <div class="task-content">
                    <h4 class="text-lg font-medium text-cyan-400">
                      {{ task.title }}
                    </h4>
                    <p class="text-gray-300 text-sm mt-2">
                      {{ task.description }}
                    </p>
                    <div class="mt-3 flex items-center text-sm text-gray-400">
                      <mat-icon class="mr-1 text-sm">event</mat-icon>
                      {{ task.dueDate | date : 'dd/MM/yyyy' }}
                    </div>
                    <div class="mt-2">
                      @for (userId of task.assignedTo; track userId) {
                      <span
                        class="inline-block bg-gray-700 px-2 py-1 rounded text-xs text-gray-300 mr-1"
                      >
                        {{ getUserName(userId) }}
                      </span>
                      }
                    </div>
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Formulario Nueva Tarea -->
        @if (isProjectOwner || isMember) {
        <div class="p-8 bg-gray-900 border-b border-gray-700">
          <h2
            class="text-2xl font-semibold mb-6 text-cyan-400 flex items-center"
          >
            <mat-icon class="mr-2 text-cyan-400">add_task</mat-icon>
            Nueva Tarea
          </h2>

          <form
            [formGroup]="taskForm"
            (ngSubmit)="onSubmitTask()"
            class="space-y-6"
          >
            <mat-form-field class="w-full" floatLabel="always">
              <mat-label>Título de la Tarea</mat-label>
              <input
                matInput
                formControlName="title"
                placeholder="Ingrese el título"
                class="text-gray-200"
              />
            </mat-form-field>

            <mat-form-field class="w-full" floatLabel="always">
              <mat-label>Descripción</mat-label>
              <textarea
                matInput
                formControlName="description"
                rows="4"
                placeholder="Describe la tarea en detalle"
                class="text-gray-200"
              ></textarea>
            </mat-form-field>

            <mat-form-field class="w-full" floatLabel="always">
              <mat-label>Estado</mat-label>
              <mat-select formControlName="status" class="text-gray-200">
                <mat-option value="pending">Pendiente</mat-option>
                <mat-option value="in_progress">En Progreso</mat-option>
                <mat-option value="completed">Completado</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field class="w-full" floatLabel="always">
              <mat-label>Asignar a</mat-label>
              <mat-select
                formControlName="assignedTo"
                multiple
                class="text-gray-200"
              >
                @for (user of projectMembers; track user._id) {
                <mat-option [value]="user._id">
                  {{ user.username }}
                </mat-option>
                }
              </mat-select>
            </mat-form-field>

            <mat-form-field class="w-full" floatLabel="always">
              <mat-label>Fecha límite</mat-label>
              <input
                matInput
                [matDatepicker]="picker"
                formControlName="dueDate"
                placeholder="Seleccione una fecha"
                class="text-gray-200"
              />
              <mat-datepicker-toggle
                matSuffix
                [for]="picker"
              ></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <div class="flex justify-end">
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="taskForm.invalid"
                class="px-8 bg-cyan-600 hover:bg-cyan-700"
              >
                <mat-icon class="mr-2">add</mat-icon>
                Crear Tarea
              </button>
            </div>
          </form>
        </div>
        }
      </div>
    </div>
    } @else {
    <div class="flex justify-center items-center min-h-screen">
      <mat-spinner diameter="48" color="primary"></mat-spinner>
    </div>
    }
  `,
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;
  tasks: Task[] = [];
  projectMembers: User[] = [];
  taskForm: FormGroup;
  isProjectOwner = false;
  isMember = false;
  currentUserId?: string;
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['pending', Validators.required],
      assignedTo: [[], Validators.required],
      dueDate: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadCurrentUser();
    this.loadProjectData();
  }

  private loadCurrentUser() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUserId = user.id;
    });
  }

  private loadProjectData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectService.getProjectById(id).subscribe({
        next: (project) => {
          this.project = project;
          this.isProjectOwner = project.owner === this.currentUserId;
          this.isMember = project.members.includes(this.currentUserId!);
          this.loadProjectMembers(project.members);
          this.loadTasks(id);
        },
        error: (error) => {
          console.error('Error al cargar el proyecto:', error);
        },
      });
    }
  }

  private loadProjectMembers(memberIds: string[]) {
    // Asumiendo que tienes un método para obtener múltiples usuarios por sus IDs
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.projectMembers = users;
      },
      error: (error) => {
        console.error('Error al cargar los miembros del proyecto:', error);
      },
    });
  }

  private loadTasks(projectId: string) {
    this.taskService.getTasksByProject(projectId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        // Distribuir las tareas en las columnas correspondientes
        this.pendingTasks = tasks.filter((task) => task.status === 'pending');
        this.inProgressTasks = tasks.filter(
          (task) => task.status === 'in_progress'
        );
        this.completedTasks = tasks.filter(
          (task) => task.status === 'completed'
        );
      },
      error: (error) => {
        console.error('Error al cargar las tareas:', error);
      },
    });
  }

  onSubmitTask() {
    if (this.taskForm.valid && this.project) {
      const newTask: Omit<Task, '_id' | '__v'> = {
        ...this.taskForm.value,
        project: this.project._id,
      };

      this.taskService.createTask(newTask).subscribe({
        next: (task) => {
          this.tasks = [...this.tasks, task];
          this.taskForm.reset({
            status: 'pending',
            assignedTo: [],
          });
        },
        error: (error) => {
          console.error('Error al crear la tarea:', error);
        },
      });
    }
  }

  deleteTask(taskId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task._id !== taskId);
        },
        error: (error) => {
          console.error('Error al eliminar la tarea:', error);
        },
      });
    }
  }

  getUserName(userId: string): string {
    const user = this.projectMembers.find((user) => user._id === userId);
    return user ? user.username : 'Usuario Desconocido';
  }

  confirmDeleteProject() {
    if (
      confirm(
        '¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.'
      )
    ) {
      this.projectService.deleteProject(this.project!._id).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error al eliminar el proyecto:', error);
        },
      });
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Obtener la tarea que se movió
      const task = event.container.data[event.currentIndex];

      // Crear un objeto con solo los campos necesarios para actualizar
      const updatedTask: Partial<Task> = {
        status: this.getNewStatus(event.container.id),
      };

      // Actualizar el estado en el backend
      this.taskService.updateTask(task._id, updatedTask).subscribe({
        error: (error) => {
          console.error('Error al actualizar el estado de la tarea:', error);
          // Revertir el cambio en caso de error
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
        },
      });
    }
  }

  private getNewStatus(containerId: string): string {
    switch (containerId) {
      case 'cdk-drop-list-0':
        return 'pending';
      case 'cdk-drop-list-1':
        return 'in_progress';
      case 'cdk-drop-list-2':
        return 'completed';
      default:
        return 'pending';
    }
  }
}
