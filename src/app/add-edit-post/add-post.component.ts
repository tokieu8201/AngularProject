import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class CreatePostComponent{
  createForm!: FormGroup;
  error: string = '';
  postedOn: Date = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService   
  ){
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],

    })
  }
  savePost(): void{
    if(this.createForm.valid){     
      const post: Item = this.createForm.value;
      post.postedOn = this.getDate();
      console.log(post);
      this.itemService.addPost(post).subscribe(
        (createPost) => {this.router.navigate(['/home'])}
      )
    }else{
      this.error = 'Please enter the required information'
    }
  }
  getDate(): Date{
    return new Date;
  }
}
