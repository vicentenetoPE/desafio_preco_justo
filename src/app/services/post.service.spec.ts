import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../models/post.model';
import { environment } from '@root/environments/environment.development';
import { provideHttpClient } from '@angular/common/http';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Content 1', comments: [] },
    { id: 2, userId: 1, title: 'Post 2', body: 'Content 2', comments: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService,provideHttpClient(),
        provideHttpClientTesting() ],
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a post by ID', () => {
    service['posts'] = mockPosts;
    service.getPostByID(1).subscribe(post => {
      expect(post).toEqual(mockPosts[0]);
    });
  });

  it('should delete a post', () => {
    service['posts'] = mockPosts;

    service.deletePost(1).subscribe();

    const req = httpMock.expectOne(`${environment.API}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(service['posts'].length).toBe(1);
    expect(service['posts']).toEqual([mockPosts[1]]);
  });

  it('should edit a post', () => {
    service['posts'] = mockPosts;
    const updatedPost: Post = { id: 1, userId: 1, title: 'Updated Post', body: 'Updated Content', comments: [] };

    service.editPost(1, updatedPost).subscribe(post => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${environment.API}/posts/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);

    expect(service['posts'][0]).toEqual(updatedPost);
  });

  it('should create a post', () => {
    service['posts'] = mockPosts;
    const newPost: Post = { id: 3, userId: 1, title: 'New Post', body: 'New Content', comments: [] };

    service.createPost(newPost).subscribe(post => {
      expect(post).toEqual(newPost);
    });

    const req = httpMock.expectOne(`${environment.API}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(newPost);

    expect(service['posts'].length).toBe(3);
    expect(service['posts'][2]).toEqual(newPost);
  });

  it('should handle error when fetching all posts', () => {
    spyOn(console, 'error');

    service.getAllPostsFromHttp().subscribe(posts => {
      expect(posts).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.API}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(console.error).toHaveBeenCalled();
    expect(service['posts']).toEqual([]);
  });
});
