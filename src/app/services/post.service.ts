import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from '../models/post.model';
import { environment } from '@root/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly url = `${environment.API}/posts`;
  posts: Post[] = [];

  constructor(private readonly http: HttpClient) {}

  getAllPostsFromHttp(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url).pipe(
      map(posts => posts.map(post => ({ ...post, comments: [] }))),
      tap(posts => this.posts = posts),
      catchError(this.handleError<Post[]>('getAllPostsFromHttp', []))
    );
  }

  getAllPosts(): Observable<Post[]> {
    if (this.posts.length > 0) {
      return of(this.posts);
    }
    return this.getAllPostsFromHttp();
  }

  getPostByID(id: number): Observable<Post | undefined> {
    const post = this.posts.find(post => post.id === id);
    return of(post);
  }

  deletePost(id: number): Observable<{}> {
    const url = `${this.url}/${id}`;
    return this.http.delete<{}>(url).pipe(
      tap(() => this.posts = this.posts.filter(post => post.id !== id)),
      catchError(this.handleError<{}>(`deletePost id=${id}`))
    );
  }

  editPost(id: number, post: Post): Observable<Post> {
    const url = `${this.url}/${id}`;
    return this.http.put<Post>(url, post).pipe(
      tap(updatedPost => {
        const index = this.posts.findIndex(p => p.id === id);
        if (index !== -1) {
          this.posts[index] = { ...this.posts[index], ...updatedPost };
        }
      }),
      catchError(this.handleError<Post>(`editPost id=${id}`))
    );
  }

  createPost(post: Partial<Post>): Observable<Post> {
    const { body, title } = post;
    if (!body || !title) {
      return of({} as Post);
    }
    const userId = 1;
    const newPost: Post = { ...post, id: this.posts.length + 1, userId, comments: [] } as Post;
    return this.http.post<Post>(this.url, newPost).pipe(
      tap(createdPost => this.posts.unshift(createdPost)),
      catchError(this.handleError<Post>('createPost'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
