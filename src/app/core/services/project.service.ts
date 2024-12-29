import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project } from '../models/project.model';

interface AddMemberRequest {
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly API_URL = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) {}

  // Obtener proyectos del usuario actual
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}`);
  }

  // Obtener todos los proyectos (admin)
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}/all`);
  }

  // Obtener un proyecto específico
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/${id}`);
  }

  // Crear un nuevo proyecto
  createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(`${this.API_URL}`, project);
  }

  // Actualizar un proyecto
  updateProject(id: string, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${id}`, project);
  }

  // Eliminar un proyecto
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Agregar miembro a un proyecto
  addMember(projectId: string, userId: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/${projectId}/members`, { userId });
  }

  // Eliminar miembro de un proyecto
  removeMember(projectId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${projectId}/members/${userId}`);
  }
}