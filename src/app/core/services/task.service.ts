// src/app/core/services/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  // Obtener tareas asignadas al usuario autenticado
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Obtener todas las tareas
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/all`);
  }

  // Obtener tareas por proyecto
  getTasksByProject(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`);
  }

  // Crear una nueva tarea
  createTask(task: Omit<Task, '_id' | '__v'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Actualizar una tarea existente
  updateTask(taskId: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, task);
  }

  // Eliminar una tarea
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }

  // Asignar usuarios a una tarea
  assignTask(taskId: string, userIds: string[]): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${taskId}/assign`, { userIds });
  }

  // Desasignar un usuario de una tarea
  unassignTask(taskId: string, userId: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${taskId}/unassign`, { userId });
  }

  // Buscar tareas por título o descripción
  searchTasks(searchTerm: string): Observable<Task[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<Task[]>(`${this.apiUrl}/search`, { params });
  }

  // Obtener tareas por estado
  getTasksByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/status/${status}`);
  }
}