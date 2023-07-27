import { Injectable } from '@angular/core';
import { POSTS, Post } from '../models/post';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts = POSTS;

  constructor() { }

  getPosts(): Post[] {
    return this.posts;
  }

  addPost(post: Post): void{
    this.posts.push(post);
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  updatePost(updatedPost: Post): boolean {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
      return true;
    }
    return false;
  }
}
