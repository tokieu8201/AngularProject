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
  editPost!: Item;
  editId!: number;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.editId = Number(params.get('id'));
      this.itemService.getItemById(this.editId).subscribe(
        (data) => { this.editPost = data; }
      )
    });
  }

  updatePost(): void{
    this.itemService.updatePost(this.editPost).subscribe(
      () => {this.router.navigate(['/home'])},
      (error) => {console.log(error);}
    );
  }
}
