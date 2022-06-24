import { AlertService } from './../shared/services/alert.service';
import { PostsService } from './../../shared/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postSubscription!: Subscription;
  postDeleteSubscription!: Subscription;
  searchStr: string = '';

  constructor(
    private postService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.postService
      .getAll()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  remove(id: any): void {
    this.postDeleteSubscription = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.alertService.danger('Post was deleted');
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }

    if (this.postDeleteSubscription) {
      this.postDeleteSubscription.unsubscribe();
    }
  }
}
