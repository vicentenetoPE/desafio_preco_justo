import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Post } from '@root/app/models/post.model';
import { PostService } from '@root/app/services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '@root/app/components/dialogs/edit-post-dialog/edit-post-dialog.component';
import { UserService } from '@root/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {  debounceTime } from 'rxjs';
import { Router } from '@angular/router';
import { DeletePostDialogComponent } from '@root/app/components/dialogs/delete-post-dialog/delete-post-dialog.component';
import { CreatePostDialogComponent } from '@root/app/components/dialogs/create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, MatPaginator, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | null =
    null;
  filter = new FormControl('');
  posts:Post[]= []

  constructor(
    protected postService: PostService,
    public dialog: MatDialog,
    private userService: UserService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.filter.valueChanges
    .pipe(debounceTime(500))
    .subscribe(() => this.updatePosts());
  }
  
  ngAfterContentChecked(): void {
    this.updatePosts();
  }

  updatePosts() {
    const { pageIndex, pageSize } = this.paginator!;
    const filterValue = this.filter.value || '';
    const filteredPosts = this.postService.posts.filter((post) =>
      Object.values(post).some((filed) =>
        filed.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    );
    this.posts =  filteredPosts.slice(pageIndex * pageSize, (pageIndex + 1)  * pageSize)
  }

  redirectToPost(postId:number){
    this.router.navigate([`post/${postId}`])
  }

  editPost(post: Post) {
    this.dialog.open(EditPostDialogComponent, { data: post });
  }

  deletePost(post: Post) {
    this.dialog.open(DeletePostDialogComponent, { data: post });
  }

  findUser(userId: number) {
    return this.userService.users.find((user) => user.id === userId)?.name;
  }

  createPost(){
    this.dialog.open(CreatePostDialogComponent);
  }
}
