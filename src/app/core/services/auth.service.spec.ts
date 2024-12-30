import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../models/auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login and store user data', () => {
      const mockCredentials: LoginCredentials = {
        email: 'test@test.com',
        password: '123456'
      };

      const mockResponse: AuthResponse = {
        token: 'mock-token',
        user: {
          id: '1',
          email: 'test@test.com',
          name: 'Test User'
        }
      };

      service.login(mockCredentials).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(localStorage.getItem('token')).toBe(mockResponse.token);
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users/login`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('register', () => {
    it('should register and store user data', () => {
      const mockCredentials: RegisterCredentials = {
        email: 'test@test.com',
        password: '123456',
        name: 'Test User'
      };

      const mockResponse: AuthResponse = {
        token: 'mock-token',
        user: {
          id: '1',
          email: 'test@test.com',
          name: 'Test User'
        }
      };

      service.register(mockCredentials).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(localStorage.getItem('token')).toBe(mockResponse.token);
        expect(localStorage.getItem('user')).toBe(JSON.stringify(mockResponse.user));
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users/register`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should clear storage and reset user', () => {
      // Set initial data
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ id: '1', email: 'test@test.com', name: 'Test User' }));

      service.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      
      service.getCurrentUser().subscribe(user => {
        expect(user).toEqual({ id: '', email: '', name: '' });
      });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorage.setItem('token', 'mock-token');
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false when token does not exist', () => {
      localStorage.removeItem('token');
      expect(service.isAuthenticated()).toBeFalse();
    });
  });
});