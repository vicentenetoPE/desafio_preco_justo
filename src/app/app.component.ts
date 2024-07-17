import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `<app-navbar/> <router-outlet /> `,
})
export class AppComponent implements OnInit {
  title = 'angular-blog';

  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe();
    this.postService.getAllPostsFromHttp().subscribe();
  }
}
