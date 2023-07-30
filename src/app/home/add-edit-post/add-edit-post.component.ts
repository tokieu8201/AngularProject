import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-add-edit-post',
  templateUrl: './add-edit-post.component.html',
  styleUrls: ['./add-edit-post.component.css']
})
export class AddEditPostComponent {
  @Input() post: Post | undefined;
  @Output() savePost = new EventEmitter<Post>();
  @Output() cancel = new EventEmitter<void>();
  showForm = true;

  onSave() {
    this.savePost.emit(this.post);
      this.reset();
  }

  onCancel():void{
    this.cancel.emit();
    this.showForm = false;
  }
  private reset(): void {
    this.post = {
      id: 0,
      title: '',
      shortDescription: '',
      description: '',
      image: ''
    };
  }

}
