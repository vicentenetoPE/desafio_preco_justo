import { Component, inject, Inject } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../../models/post.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-post-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-post-dialog.component.html',
})
export class EditPostDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditPostDialogComponent>);

  editPostForm = new FormGroup({
    title: new FormControl<string>(this.post.title, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    body: new FormControl<string>(this.post.body, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public post: Post,
    private postService: PostService
  ) {}

  handleSubmit($event: Event) {
    $event.preventDefault();
    if (this.editPostForm.invalid) return;
    const newPost = { ...this.post, ...this.editPostForm.value };
    this.postService.editPost(this.post.id, newPost).subscribe({
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
