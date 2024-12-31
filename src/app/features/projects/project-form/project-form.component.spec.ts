import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { of, throwError } from 'rxjs';
import { NewProjectComponent } from './project-form.component';

describe('NewProjectComponent', () => {
  let component: NewProjectComponent;
  let fixture: ComponentFixture<NewProjectComponent>;
  let router: jasmine.SpyObj<Router>;
  let projectService: jasmine.SpyObj<ProjectService>;

  const mockProject: Project = {
    _id: '1',
    name: 'Test Project',
    description: 'Test Description',
    owner: 'testUser',
    members: [],
    __v: 0
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['createProject']);

    await TestBed.configureTestingModule({
      imports: [
        NewProjectComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ProjectService, useValue: projectServiceSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
    fixture = TestBed.createComponent(NewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.projectForm.get('name')?.value).toBe('');
    expect(component.projectForm.get('description')?.value).toBe('');
  });

  it('should validate required name field', () => {
    const nameControl = component.projectForm.get('name');
    expect(nameControl?.valid).toBeFalsy();
    expect(nameControl?.errors?.['required']).toBeTruthy();

    nameControl?.setValue('Test Project');
    expect(nameControl?.valid).toBeTruthy();
    expect(nameControl?.errors).toBeNull();
  });

  it('should call createProject and navigate on valid submit', () => {
    const projectData = { name: 'Test Project', description: 'Test Description' };
    projectService.createProject.and.returnValue(of(mockProject));

    component.projectForm.setValue(projectData);
    component.onSubmit();

    expect(projectService.createProject).toHaveBeenCalledWith(projectData);
    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  it('should handle error on project creation', () => {
    const projectData = { name: 'Test Project', description: 'Test Description' };
    const errorSpy = spyOn(console, 'error');
    projectService.createProject.and.returnValue(throwError(() => new Error('Test error')));

    component.projectForm.setValue(projectData);
    component.onSubmit();

    expect(errorSpy).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back when cancel is clicked', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });
});