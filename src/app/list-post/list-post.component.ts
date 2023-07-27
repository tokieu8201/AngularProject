import { Component } from '@angular/core';
import { POSTS, Post } from '../models/post';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {
  posts: Post[]= POSTS;
}
