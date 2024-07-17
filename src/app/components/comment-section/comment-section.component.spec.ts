import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentSectionComponent } from './comment-section.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { CommentService } from '@root/app/services/comment.service';
import { PostService } from '@root/app/services/post.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CommentSectionComponent', () => {
  let component: CommentSectionComponent;
  let fixture: ComponentFixture<CommentSectionComponent>;
  let commentService: CommentService;
  let routeStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const postServiceMock = jasmine.createSpyObj('PostService', ['posts']);

    routeStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1',
        }
      } as ActivatedRouteSnapshot
    };

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PostService, useValue: postServiceMock },
        { provide: ActivatedRoute, useValue: routeStub },
        {
          provide: CommentService,
          useValue: {
            getPostByID: jasmine.createSpy('getCommentsByBlogId').and.returnValue(of(commentService)),
          },
        },
      ],
      imports: [CommonModule, ReactiveFormsModule, CommentSectionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
