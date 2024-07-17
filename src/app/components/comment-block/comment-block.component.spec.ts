import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentBlockComponent } from './comment-block.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Comment } from '@root/app/models/comment.model';

describe('CommentBlockComponent', () => {
  let component: CommentBlockComponent;
  let fixture: ComponentFixture<CommentBlockComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      providers: [{ provide: MatDialog, useValue: dialogMock }],
      imports: [MatDialogModule, CommentBlockComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentBlockComponent);
    component = fixture.componentInstance;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    component.comment= {
      email: 'vic@precojusto.com',
      id: '1',
      postId: 1,
      body: 'body',
      name: 'title',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
