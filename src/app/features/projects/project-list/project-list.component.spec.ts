import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from '../../../core/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Project } from '../../../core/models/project.model';
import { of } from 'rxjs';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectService: jasmine.SpyObj<ProjectService>;

  const mockProjects: Project[] = [
    {
      _id: '1',
      name: 'Test Project',
      description: 'Test Description',
      owner: 'testUser',
      members: [],

      __v: 0,
    },
    {
      _id: '2',
      name: 'Another Project',
      description: 'Another Description',
      owner: 'testUser',
      members: [],

      __v: 0,
    },
  ];

  beforeEach(async () => {
    const projectServiceSpy = jasmine.createSpyObj('ProjectService', [
      'getProjects',
    ]);

    await TestBed.configureTestingModule({
      imports: [ProjectListComponent, BrowserAnimationsModule],
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                projects: mockProjects,
              },
            },
          },
        },
      ],
    }).compileComponents();

    projectService = TestBed.inject(
      ProjectService
    ) as jasmine.SpyObj<ProjectService>;
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with projects from route resolver', () => {
    expect(component.projects).toEqual(mockProjects);
    expect(component.filteredProjects).toEqual(mockProjects);
  });

  it('should filter projects by name', (done) => {
    component.searchControl.setValue('Another');

    setTimeout(() => {
      expect(component.filteredProjects.length).toBe(1);
      expect(component.filteredProjects[0].name).toBe('Another Project');
      done();
    }, 400);
  });

  it('should filter projects by description', (done) => {
    component.searchControl.setValue('Another Description');

    setTimeout(() => {
      expect(component.filteredProjects.length).toBe(1);
      expect(component.filteredProjects[0].description).toBe(
        'Another Description'
      );
      done();
    }, 400);
  });

  it('should show all projects when search is cleared', (done) => {
    component.searchControl.setValue('Another');

    setTimeout(() => {
      component.searchControl.setValue('');

      setTimeout(() => {
        expect(component.filteredProjects.length).toBe(2);
        done();
      }, 400);
    }, 400);
  });

  it('should be case insensitive when filtering', (done) => {
    component.searchControl.setValue('test');

    setTimeout(() => {
      expect(component.filteredProjects.length).toBe(1);
      expect(component.filteredProjects[0].name).toBe('Test Project');
      done();
    }, 400);
  });

  it('should clean up subscriptions on destroy', () => {
    const nextSpy = spyOn(component['destroy$'], 'next');
    const completeSpy = spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
