import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPostDialogComponent } from './edit-post-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogRef } from '@angular/cdk/dialog';

describe('EditPostDialogComponent', () => {
  let component: EditPostDialogComponent;
  let fixture: ComponentFixture<EditPostDialogComponent>;
  let mockDialogRef:MatDialogRef<EditPostDialogComponent>;
  let mockPostService:PostService;
  let mockPost:Post;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockPostService = jasmine.createSpyObj('CommentService', ['deleteComment']);
    
    mockPost = { id: 1, userId:1, body: 'Example comment', title:"ola", comments:[] };
    await TestBed.configureTestingModule({
      imports: [EditPostDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockPost },
        { provide: PostService, useValue: mockPostService }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
