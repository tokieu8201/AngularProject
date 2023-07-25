import { Component } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  items: Item[] = [];
  searchString: string = '';
  constructor(private itemService: ItemService){}
  ngOnInit(): void{
    this.itemService.getItems().subscribe(
      (items) => {
        this.items = items;
      }
    );
    this.showListPosts()
  }
  showListPosts(): void{
    console.log(this.searchString);
    this.itemService.search(this.searchString).subscribe((
      (items) => this.items = items
    ))
  }
}
