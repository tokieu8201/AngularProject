import { Component, OnInit } from '@angular/core';
import { POSTS, Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = POSTS;
  selectedPost: Post | undefined;
  showAddForm = false;
  showEditForm = false;
  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => this.posts = posts);
  }

  addNewPost(): void {
    this.showAddForm = true;
    this.selectedPost = {} as Post;
  }

  onEditPost(post: Post) {
    this.showAddForm = false;
    this.showEditForm = true;
    this.selectedPost = {...post};
  }

  onSavePost(newPost: Post) {
    if (!this.showEditForm) {
      this.postService.addPost(newPost);
      this.showAddForm = false;
    } else {
      this.postService.updatePost(newPost);
      this.showEditForm = false;
    }
  }

  onCancel(){
    this.showAddForm = false;
    this.showEditForm = false;
  }
}
