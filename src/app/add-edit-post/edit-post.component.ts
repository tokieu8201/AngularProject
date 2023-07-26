import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../models/item';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post!: Item;
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    //private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.id = Number(params.get('id'));
      this.itemService.getItemById(this.id).subscribe(
        (data) => {this.post = data}
      )
    })
  }

  updatePost(): void{
    this.itemService.updatePost(this.post).subscribe(
      //(post) => {this.router.navigate(['/home'])}
    )
  }
}
