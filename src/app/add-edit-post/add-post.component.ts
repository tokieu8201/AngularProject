import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { POSTS, Post } from '../models/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  createForm!: FormGroup;
  posts: Post[] = POSTS;
  error: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private postService: PostService
  ) {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    })
  }

  savePost(): void {
    if (this.createForm.valid) {
      const post : Post = this.createForm.value;
      post.id = this.posts.length > 0 ? this.posts[this.posts.length - 1].id + 1 : 1;
      this.postService.addPost(post);
      this.router.navigate(['/home']);
    } else {
      this.error = 'Please enter the required information'
    }
  }
}
