import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostComponent } from './post.component';
import { PostService } from '@services/post.service';
import { Post } from '@models/post.model';
import { CommonModule } from '@angular/common';
import {  provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let postService: PostService;
  const mockPost: Post = { id: 1,userId:1, title: 'Test Post', body: 'This is a test post', comments: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
        {
          provide: PostService,
          useValue: {
            getPostByID: jasmine.createSpy('getPostByID').and.returnValue(of(mockPost)),
          },
        },
      ],
      imports: [CommonModule, PostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
