import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import { environment } from '../../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const API_URL = `${environment.apiUrl}/tasks`;

  const mockTask: Task = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'pending',
    project: 'project1',
    assignedTo: ['user1'],
    dueDate: '2024-12-31',
    __v: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tasks', () => {
    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual([mockTask]);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([mockTask]);
  });

  it('should get all tasks', () => {
    service.getAllTasks().subscribe(tasks => {
      expect(tasks).toEqual([mockTask]);
    });

    const req = httpMock.expectOne(`${API_URL}/all`);
    expect(req.request.method).toBe('GET');
    req.flush([mockTask]);
  });

  it('should get tasks by project', () => {
    const projectId = 'project1';
    
    service.getTasksByProject(projectId).subscribe(tasks => {
      expect(tasks).toEqual([mockTask]);
    });

    const req = httpMock.expectOne(`${API_URL}/project/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockTask]);
  });

  it('should create task', () => {
    const newTask = {
      title: 'New Task',
      description: 'New Description',
      status: 'pending',
      project: 'project1',
      assignedTo: ['user1'],
      dueDate: '2024-12-31'
    };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(mockTask);
  });

  it('should update task', () => {
    const updates = { title: 'Updated Task' };
    
    service.updateTask('1', updates).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${API_URL}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updates);
    req.flush(mockTask);
  });

  it('should delete task', () => {
    service.deleteTask('1').subscribe();

    const req = httpMock.expectOne(`${API_URL}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should assign users to task', () => {
    const userIds = ['user2', 'user3'];
    
    service.assignTask('1', userIds).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${API_URL}/1/assign`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ userIds });
    req.flush(mockTask);
  });

  it('should unassign user from task', () => {
    service.unassignTask('1', 'user1').subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpMock.expectOne(`${API_URL}/1/unassign`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ userId: 'user1' });
    req.flush(mockTask);
  });

  it('should search tasks', () => {
    const searchTerm = 'test';
    
    service.searchTasks(searchTerm).subscribe(tasks => {
      expect(tasks).toEqual([mockTask]);
    });

    const req = httpMock.expectOne(`${API_URL}/search?searchTerm=test`);
    expect(req.request.method).toBe('GET');
    req.flush([mockTask]);
  });

  it('should get tasks by status', () => {
    const status = 'pending';
    
    service.getTasksByStatus(status).subscribe(tasks => {
      expect(tasks).toEqual([mockTask]);
    });

    const req = httpMock.expectOne(`${API_URL}/status/${status}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockTask]);
  });
});