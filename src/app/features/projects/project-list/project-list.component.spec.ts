import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectService } from '../../../core/services/project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
      ],
      providers: [ProjectService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});