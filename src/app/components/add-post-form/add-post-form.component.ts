import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit {
  @Output() addNewPost = new EventEmitter();
  public newPost: Post = {
    id: 0,
    userId: 0,
    title: '',
    body: ''
   };
   @Input() public currentPost;
  constructor(
    public postsService: PostsService,
  ) { }

  ngOnInit() {
  }
  // Add post form submit handler
  onSubmitHandler(form) {
    this.addNewPost.emit(this.newPost);
    form.resetForm();
  }
  // Edit post handler
  editHandler() {
    // Input value
    const titleValue = <HTMLInputElement>document.getElementById('title');
    const bodyValue = <HTMLInputElement>document.getElementById('body');
    // Send edited data to server
    this.postsService.editPost(this.currentPost = {
      id: this.currentPost.id,
      userId: this.currentPost.userId,
      title: titleValue.value,
      body: bodyValue.value
    }).subscribe();
    // Emitt editted data
    // Clear inpits
    titleValue.value = '';
    bodyValue.value = '';
  }
  // Cancel editing post
  cancelEditHandler() {
    // Clear inputs
    const titleValue = <HTMLInputElement>document.getElementById('title');
    titleValue.value = '';
    const bodyValue = <HTMLInputElement>document.getElementById('body');
    bodyValue.value = '';
     // Submit form button display toggle
     const submitFormBtn = document.getElementById('form-submit');
     submitFormBtn.style.display = submitFormBtn.style.display === 'none' ? '' : 'none';
     // Edit/Cancel form button display toggle
     const editFormBtn = document.getElementById('form-edit');
     const cancelFormBtn = document.getElementById('cancel-edit');
     editFormBtn.style.display = editFormBtn.style.display === 'none' ? '' : 'none';
     cancelFormBtn.style.display = cancelFormBtn.style.display === 'none' ? '' : 'none';
  }
}
