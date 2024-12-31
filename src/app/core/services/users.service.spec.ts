import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { UserService } from './users.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const API_URL = `${environment.apiUrl}/users`;

  const mockUser: User = {
    _id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
    __v: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual([mockUser]);
    });

    const req = httpMock.expectOne(`${API_URL}/all`);
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  });
});