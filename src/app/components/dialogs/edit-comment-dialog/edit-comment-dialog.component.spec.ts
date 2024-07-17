import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentDialogComponent } from './edit-comment-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from '@root/app/services/comment.service';
import { Comment } from '@root/app/models/comment.model';

describe('EditCommentDialogComponent', () => {
  let component: EditCommentDialogComponent;
  let fixture: ComponentFixture<EditCommentDialogComponent>;
  let mockDialogRef:MatDialogRef<EditCommentDialogComponent>;
  let mockCommentService:CommentService;
  let mockComment:Comment;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockCommentService = jasmine.createSpyObj('CommentService', ['deleteComment']);
    
    mockComment = { id: '1', postId: 100, body: 'Example comment', name:"ola", email:"vic@hot.com" };

    await TestBed.configureTestingModule({
      imports: [ EditCommentDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockComment },
        { provide: CommentService, useValue: mockCommentService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
