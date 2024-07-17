import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post.service';
import {  MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.scss',
})
export class CreatePostDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreatePostDialogComponent>);

  createPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    body: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private postService: PostService
  ) {}

  handleSubmit($event: Event) {
    $event.preventDefault();

    if (this.createPostForm.invalid) return;
    this.postService.createPost(this.createPostForm.value).subscribe({
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
