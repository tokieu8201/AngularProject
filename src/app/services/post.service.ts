import { Injectable } from '@angular/core';
import { POSTS, Post } from '../models/post';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = POSTS;
  private post = new BehaviorSubject<Post[]>(this.posts);

  constructor() { }

  getPosts(): Observable<Post[]>{
    return this.post.asObservable();
  }

  addPost(newPost: Post): void{
    newPost.id = this.posts.length > 0 ? this.posts[this.posts.length - 1].id + 1 : 1;
    this.posts.push(newPost);
    this.post.next(this.posts);
  }

  updatePost(updatedPost: Post): boolean {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
      this.post.next(this.posts);
      return true;
    }
    return false;
  }
}
