import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePostDialogComponent } from './delete-post-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostService } from '@root/app/services/post.service';
import { Post } from '@root/app/models/post.model';

describe('DeletePostDialogComponent', () => {
  let component: DeletePostDialogComponent;
  let fixture: ComponentFixture<DeletePostDialogComponent>;
  let mockDialogRef:MatDialogRef<DeletePostDialogComponent>;
  let mockPostService:PostService;
  let mockPost:Post;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockPostService = jasmine.createSpyObj('CommentService', ['deleteComment']);
    
    mockPost = { id: 1, userId:1, body: 'Example comment', title:"ola", comments:[] };
    await TestBed.configureTestingModule({
      imports: [DeletePostDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockPost },
        { provide: PostService, useValue: mockPostService }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
