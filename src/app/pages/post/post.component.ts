import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentSectionComponent } from '@root/app/components/comment-section/comment-section.component';
import { PostService } from '@services/post.service';
import { Post } from '@models/post.model';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '@root/app/components/loading/loading.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommentSectionComponent, CommonModule, LoadingComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  post: Post | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostService
  ) {}

  async ngOnInit() {
    let retries = 0
    while(!this.post && retries <4){
      !this.post && await new Promise(resolve => setTimeout(resolve, 300));
      this.loadPost();
      retries++
    }
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  private loadPost(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      const postSubscription = this.postService.getPostByID(parseInt(postId)).subscribe(res => {
        this.post = res || null;
      });
      this.subscription =postSubscription;
    }
  }
}
