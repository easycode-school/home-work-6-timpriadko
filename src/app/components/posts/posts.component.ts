import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from './../../interfaces/post';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts: Post[] = [];
  currentPost;
  constructor(
    public postsService: PostsService
  ) { }

  ngOnInit() {
      this.postsService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
}
  public addPostHandler(post: Post) {
    this.postsService.addPost(post).subscribe((value: Post) => {
    this.posts.unshift({title: value.title, body: value.body});
    }, (err) => console.log(err));
  }
}
