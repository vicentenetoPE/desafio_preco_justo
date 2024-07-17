import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comment } from '@root/app/models/comment.model';
import { CommentService } from '@root/app/services/comment.service';

@Component({
  selector: 'app-edit-comment-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-comment-dialog.component.html',
  styleUrl: './edit-comment-dialog.component.scss',
})
export class EditCommentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditCommentDialogComponent>);
  @Output() onUpdate= new EventEmitter<void>()

  commentForm =new FormGroup(
    {
      body:new FormControl(this.comment.body, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      name:new FormControl(this.comment.name, {
        nonNullable: true,
        validators: [Validators.required],
      })
    }
  ) ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public comment: Comment,
    private commentService: CommentService
  ) {}

  handleSubmit($event: Event) {
    $event.preventDefault();
    if (this.commentForm.invalid) return;
    const newComment = { ...this.comment, body:this.commentForm.value['body']!,name:this.commentForm.value['name']! };
    this.commentService.editComment(newComment).subscribe({
      error: () => this.handleError(),
      complete: () => this.handleSuccess(),
    });
  }

  handleSuccess() {
    this.dialogRef.close();
  }

  handleError() {
    this.dialogRef.close();
  }
}
