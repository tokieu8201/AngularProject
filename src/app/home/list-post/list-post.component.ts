import { Component, EventEmitter, Input, Output } from '@angular/core';
import { POSTS, Post } from 'src/app/models/post';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {
  @Input() posts: Post[] = POSTS;

  @Output() onEditPost = new EventEmitter<Post>();

  editPost(post : Post): void{
    this.onEditPost.emit(post);
  }
}
