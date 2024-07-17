import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '@root/app/models/post.model';
import { PostService } from '@root/app/services/post.service';

@Component({
  selector: 'app-delete-post-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-post-dialog.component.html',
  styleUrl: './delete-post-dialog.component.scss',
})
export class DeletePostDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeletePostDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public post: Post, private postService: PostService) {}

  handleSubmit($event:Event) {
    $event.preventDefault()
    this.postService
      .deletePost(this.post.id)
      .subscribe({
        error: () => console.log('error'),
        complete: () => {this.dialogRef.close();},
      });
  }
}
