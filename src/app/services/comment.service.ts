import { Injectable } from '@angular/core';
import { environment } from '@root/environments/environment.development';
import { Comment } from '@models/comment.model';
import { HttpClient } from '@angular/common/http';
import {  catchError, Observable, of, tap } from 'rxjs';
import { CreateCommentDTO } from './dto/createComment.dto';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = `${environment.API}/comments`;

  constructor(private http: HttpClient, private postService: PostService) {}

  getCommentsByBlogId(postId: number): Observable<Comment[]> {
    const post = this.postService.posts.find((post) => post.id === postId);
    if (!post?.comments) return of();
    if (post?.comments && post.comments.length > 0) {
      return of(post.comments);
    } else {
      return this.http.get<Comment[]>(this.url, { params: { postId } }).pipe(
        tap((comments) => {
          let counter = 1;
          post.comments = comments.map((comment) => {
            comment.id = counter.toString();
            counter++;
            return comment;
          });
        }),
        catchError(
          this.handleError<Comment[]>(`getCommentsByBlogId id=${postId}`, [])
        )
      );
    }
  }

  createComment(comment: CreateCommentDTO): Observable<Comment> {
    const post = this.postService.posts.find((post) => post.id === comment.postId);
    if (!post) return of();
    const newCommentId = post.comments.length + 1;
    const newComment: Comment = { ...comment, id: newCommentId.toString() };
    post.comments.push(newComment);
    return of(newComment);
  }

  editComment(comment: Comment): Observable<Comment> {
    const post = this.postService.posts.find((post) => post.id === comment.postId);
    if (!post) return of();

    const commentIndex = post.comments.findIndex(c => c.id === comment.id);
    if (commentIndex !== -1) {
      post.comments[commentIndex] = comment;
    }
    return of(comment).pipe(
      tap(() => console.log(`Edited comment with id=${comment.id}`)),
      catchError(this.handleError<Comment>('editComment'))
    );
  }

  deleteComment(postId: number, commentId: string): Observable<{}> {
    const post = this.postService.posts.find((post) => post.id === postId);
    if (!post) return of();

    post.comments = post.comments.filter(comment => comment.id !== commentId);

    return of({}).pipe(
      tap(() => console.log(`Deleted comment with id=${commentId}`)),
      catchError(this.handleError<{}>('deleteComment'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
