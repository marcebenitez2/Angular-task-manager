// src/app/features/projects/project-list/project-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Projects</mat-card-title>
      </mat-card-header>
      <mat-card-content> Project list coming soon... </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 20px;
        color: white;
      }
    `,
  ],
})
export class ProjectListComponent {}
