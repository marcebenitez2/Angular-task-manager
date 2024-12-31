import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';
import { environment } from '../../../environments/environment';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;
  const API_URL = `${environment.apiUrl}/projects`;

  const mockProject: Project = {
    _id: '1',
    name: 'Test Project',
    description: 'Test Description',
    owner: 'user1',
    members: ['user1', 'user2'],
    __v: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get projects', () => {
    service.getProjects().subscribe(projects => {
      expect(projects).toEqual([mockProject]);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([mockProject]);
  });

  it('should get all projects', () => {
    service.getAllProjects().subscribe(projects => {
      expect(projects).toEqual([mockProject]);
    });

    const req = httpMock.expectOne(`${API_URL}/all`);
    expect(req.request.method).toBe('GET');
    req.flush([mockProject]);
  });

  it('should get project by id', () => {
    service.getProjectById('1').subscribe(project => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne(`${API_URL}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProject);
  });

  it('should create project', () => {
    const newProject = { name: 'New Project', description: 'New Description' };
    
    service.createProject(newProject).subscribe(project => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProject);
    req.flush(mockProject);
  });

  it('should update project', () => {
    const updates = { name: 'Updated Project' };
    
    service.updateProject('1', updates).subscribe(project => {
      expect(project).toEqual(mockProject);
    });

    const req = httpMock.expectOne(`${API_URL}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updates);
    req.flush(mockProject);
  });

  it('should delete project', () => {
    service.deleteProject('1').subscribe();

    const req = httpMock.expectOne(`${API_URL}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should add member to project', () => {
    service.addMember('1', 'user3').subscribe();

    const req = httpMock.expectOne(`${API_URL}/1/members`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ userId: 'user3' });
    req.flush(null);
  });

  it('should remove member from project', () => {
    service.removeMember('1', 'user2').subscribe();

    const req = httpMock.expectOne(`${API_URL}/1/members/user2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});