import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '@root/app/models/comment.model';
import { CommentService } from '@root/app/services/comment.service';
import { CommentBlockComponent } from '../comment-block/comment-block.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '@root/app/services/post.service';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommentBlockComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss',
})
export class CommentSectionComponent implements OnInit {
  postId = 0;
  commentForm =new FormGroup(
    {
      body:new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      name:new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      })
    }
  ) ;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private postService: PostService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postId = parseInt(id);
    }
  }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    if (!this.postId) return;
    this.commentService.getCommentsByBlogId(this.postId).subscribe({
      complete: () => {
        const post = this.postService.posts.find(
          (post) => post.id === this.postId
        );
        if (!post) return;
        this.comments = post.comments;
      },
    });
  }

  postComment($event: Event) {
    const fakeEmail = 'vicente@precojusto.com';
    $event.preventDefault();
    if (!this.postId) return;
    if (this.commentForm.invalid) return;
    this.commentService
      .createComment({postId:this.postId, ...this.commentForm.value as {name:string, body:string}, email:fakeEmail })
      .subscribe();
  }


}
