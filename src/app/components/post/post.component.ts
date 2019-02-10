import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from './../../interfaces/post';
import { Comment } from './../../interfaces/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public posts: Post[] = [];
  @Input() public comments: Comment[] = [];
  @Output() emitedCurrentPost = new EventEmitter();
  public currentPost: Post = {
    id: 0,
    userId: 0,
    title: '',
    body: ''
   };
  constructor(
    public postsService: PostsService
  ) { }

  ngOnInit() {
  }
  // Delete post handler
  public deletePostHandler($event) {
    this.postsService.deletePost().subscribe();
    const btn = $event.currentTarget;
    btn.closest('.card').remove();
  }
  // Edit post handler
  public editPostHandler($event) {
    const btn = $event.currentTarget;
    // Get post value
    const postTitle = btn.parentElement.previousSibling.firstChild.textContent;
    const postBody = btn.parentElement.previousSibling.lastChild.textContent;
    const postId = btn.nextSibling.textContent;
    const postUserId = btn.previousSibling.textContent;
    // Set post value to the form
    const titleValue = <HTMLInputElement>document.getElementById('title');
    titleValue.value = postTitle;
    const bodyValue = <HTMLInputElement>document.getElementById('body');
    bodyValue.value = postBody;
    const idValue = <HTMLInputElement>document.getElementById('id');
    idValue.value = postId;
    const userIdValue = <HTMLInputElement>document.getElementById('userId');
    userIdValue.value = postUserId;
    // Set current post values to the currentPost-variable
    this.currentPost.title = titleValue.value;
    this.currentPost.body = bodyValue.value;
    this.currentPost.id = +idValue.value;
    this.currentPost.userId = +userIdValue.value;
    // Submit form button display toggle
    const submitFormBtn = document.getElementById('form-submit');
    submitFormBtn.style.display = submitFormBtn.style.display === '' ? 'none' : 'none';
    // Edit/Cancel form button display toggle
    const editFormBtn = document.getElementById('form-edit');
    const cancelFormBtn = document.getElementById('cancel-edit');
    editFormBtn.style.display = editFormBtn.style.display === 'none' ? '' : '';
    cancelFormBtn.style.display = cancelFormBtn.style.display === 'none' ? '' : '';
    // Emit currentPost
    this.emitedCurrentPost.emit(this.currentPost);
  }
  // Get comment handler
  public getCommentHandler($event) {
    // Get comment block display toggle
    const commentBlock = $event.currentTarget.parentElement.nextSibling;
    commentBlock.style.display = commentBlock.style.display === 'none' ? '' : 'none';
    // Get comments of the clicked post
    const postId = +$event.currentTarget.previousSibling.textContent;
    this.postsService.getComments(postId).subscribe((data: Comment[]) => {
      this.comments = data;
    });
  }
}
