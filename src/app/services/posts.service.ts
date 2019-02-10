import { Injectable } from '@angular/core';
import { Post } from './../interfaces/post';
import { Comment } from './../interfaces/comment';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl: string = environment.apiUrl;
  private posts: Post[] = [];
  private comments: Comment[] = [];
  private _postsSource = new BehaviorSubject(this.posts);
  public postsObservableSubject = this._postsSource.asObservable();
  private _commentsSource = new BehaviorSubject(this.comments);
  public commentsObservableSubject = this._commentsSource.asObservable();


  constructor(
    private http: HttpClient
  ) { }
  // Get post service
  public getPosts() {
    return this.http.get(`${this.apiUrl}/posts`);
  }
  // Delete post service
  public deletePost() {
    return this.http.delete(`${this.apiUrl}/posts/1`);
  }
  // Add post service
  public addPost(post: Post) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post(`${this.apiUrl}/posts`, post, httpOptions);
  }
  // Edit post service
  public editPost(currentPost: Post) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.put(`${this.apiUrl}/posts/1`, currentPost, httpOptions);
  }
  // Get comments service
  public getComments(postId) {
    return this.http.get(`${this.apiUrl}/posts/1/comments`).pipe(
      map((comments: Comment[]) => {
        const currentPostcomments = comments.filter((comment: Comment) => !!(comment.postId === postId));
        return currentPostcomments;
      })
    );
  }
}
