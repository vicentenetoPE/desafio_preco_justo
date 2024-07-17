import { TestBed } from '@angular/core/testing';
import {  HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { environment } from '@root/environments/environment.development';
import { provideHttpClient } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService,    provideHttpClient(),
        provideHttpClientTesting() ],
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

  it('should fetch all users', () => {
    service.getAllUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${environment.API}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);

    expect(service.users).toEqual(mockUsers);
  });

  it('should handle error when fetching all users', () => {
    spyOn(console, 'error');

    service.getAllUsers().subscribe(users => {
      expect(users).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.API}/users`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(console.error).toHaveBeenCalled();
    expect(service.users).toEqual([]);
  });
});
