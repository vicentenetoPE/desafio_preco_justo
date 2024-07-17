import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment.development';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = `${environment.API}/users`;
  users: User[] = [];

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      catchError(this.handleError<User[]>('getAllPostHTTP', [])),
      tap(users => {
        this.users = users;
      })
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
