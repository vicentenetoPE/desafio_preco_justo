import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCommentDialogComponent } from './delete-comment-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from '@root/app/services/comment.service';
import { of, throwError } from 'rxjs';
import { Comment } from '@root/app/models/comment.model';

describe('DeleteCommentDialogComponent', () => {
  let component: DeleteCommentDialogComponent;
  let fixture: ComponentFixture<DeleteCommentDialogComponent>;
  let mockDialogRef:MatDialogRef<DeleteCommentDialogComponent>;
  let mockCommentService:CommentService;
  let mockComment:Comment;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockCommentService = jasmine.createSpyObj('CommentService', ['deleteComment']);
    
    mockComment = { id: '1', postId: 100, body: 'Example comment', name:"ola", email:"vic@hot.com" };

    await TestBed.configureTestingModule({
      imports: [ DeleteCommentDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockComment },
        { provide: CommentService, useValue: mockCommentService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
