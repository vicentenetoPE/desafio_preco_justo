import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { PostService } from './post.service';
import { Comment } from '../models/comment.model';
import { CreateCommentDTO } from './dto/createComment.dto';
import { environment } from '@root/environments/environment.development';

describe('CommentService', () => {
  let service: CommentService;
  let postService: PostService;
  let httpMock: HttpTestingController;

  const mockComments: Comment[] = [
    { id: '1', postId: 1, body: 'Comment 1', name:'opa', email:'v@o.com' },
    { id: '2', postId: 1, body: 'Comment 2', name:'opa', email:'v@o.com' },
  ];

  const mockPosts = [
    { id: 1,userId:1, title: 'Post 1', body: 'Content 1', comments: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [CommentService, PostService],
    });

    service = TestBed.inject(CommentService);
    postService = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);

    postService.posts = mockPosts;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('should return cached comments by blog ID', () => {
    postService.posts[0].comments = mockComments;

    service.getCommentsByBlogId(1).subscribe(comments => {
      expect(comments.length).toBe(2);
      expect(comments).toEqual(mockComments);
    });

    httpMock.expectNone(`${environment.API}/comments?postId=1`);
  });

  it('should create a comment', () => {
    const newCommentDTO: CreateCommentDTO = { postId: 1, body: 'New Comment', name:'opa', email:'v@o.com'  };
    const newComment: Comment = { id: '1', postId: 1, body: 'New Comment', name:'opa', email:'v@o.com' };

    service.createComment(newCommentDTO).subscribe(comment => {
      expect(comment).toEqual(newComment);
    });

    expect(postService.posts[0].comments.length).toBe(1);
    expect(postService.posts[0].comments[postService.posts[0].comments.length-
      1].body).toBe('New Comment');
  });

  it('should edit a comment', () => {
    postService.posts[0].comments = [...mockComments];
    const updatedComment: Comment = { id: '1', postId: 1, body: 'Updated Comment', name:'opa', email:'v@o.com' };

    service.editComment(updatedComment).subscribe(comment => {
      expect(comment).toEqual(updatedComment);
    });

    expect(postService.posts[0].comments[0].body).toBe('Updated Comment');
  });

  it('should delete a comment', () => {
    postService.posts[0].comments = [...mockComments];

    service.deleteComment(1, '1').subscribe();

    expect(postService.posts[0].comments.length).toBe(1);
    expect(postService.posts[0].comments.find(c => c.id === '1')).toBeUndefined();
  });
});
