import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'edit-add-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editPost: Post | undefined;
  editId!: number;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.editId = Number(params.get('id'));
      this.editPost = this.postService.getPostById(this.editId);
    });
  }

  updatePost(): void {
    if (this.editPost) {
      const isUpdated = this.postService.updatePost(this.editPost);
      if (isUpdated) {
        this.router.navigate(['/home']);
      }
    }
  }
}
