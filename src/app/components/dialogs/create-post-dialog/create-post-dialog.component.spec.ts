import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostDialogComponent } from './create-post-dialog.component';
import { provideHttpClient } from '@angular/common/http';
import { PostService } from '@root/app/services/post.service';
import { MatDialogRef } from '@angular/material/dialog';

describe('CreatePostDialogComponent', () => {
  let component: CreatePostDialogComponent;
  let fixture: ComponentFixture<CreatePostDialogComponent>;
  let mockDialogRef:MatDialogRef<CreatePostDialogComponent>;
  let mockPostService:PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePostDialogComponent],
      providers:[
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: PostService, useValue: mockPostService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
