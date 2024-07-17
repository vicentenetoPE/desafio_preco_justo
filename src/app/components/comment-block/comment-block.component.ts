import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '@models/comment.model';
import { EditCommentDialogComponent } from '../dialogs/edit-comment-dialog/edit-comment-dialog.component';
import { DeleteCommentDialogComponent } from '../dialogs/delete-comment-dialog/delete-comment-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-block',
  standalone: true,
  imports: [],
  templateUrl: './comment-block.component.html',
  styleUrl: './comment-block.component.scss'
})
export class CommentBlockComponent {
@Input({required:true})comment!:Comment
isDropdowshidde =true;
@Output() onUpdate= new EventEmitter<void>()


constructor(
  public dialog: MatDialog,
) {}


editComment(comment: Comment) {
  const dialog = this.dialog.open(EditCommentDialogComponent, { data: comment });
  dialog.componentInstance.onUpdate.subscribe(
    ()=>this.onUpdate.emit()
  )
}

deleteComment(comment: Comment) {
  const dialog = this.dialog.open(DeleteCommentDialogComponent, { data: comment });
  dialog.componentInstance.onUpdate.subscribe(
    ()=>this.onUpdate.emit()
  )
}
}
