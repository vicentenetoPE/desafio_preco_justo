import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comment } from '@root/app/models/comment.model';
import { CommentService } from '@root/app/services/comment.service';

@Component({
  selector: 'app-delete-comment-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-comment-dialog.component.html',
  styleUrl: './delete-comment-dialog.component.scss'
})
export class DeleteCommentDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteCommentDialogComponent>);
  @Output() onUpdate= new EventEmitter<void>()

  constructor(@Inject(MAT_DIALOG_DATA) public comment: Comment, private commentService: CommentService) {

  }

  handleSubmit($event:Event) {
    $event.preventDefault()
    this.commentService
      .deleteComment(this.comment.postId, this.comment.id)
      .subscribe({
        error: () => console.log('error'),
        complete: () => {
          this.onUpdate.emit()
          this.dialogRef.close();},
      });
  }
}
