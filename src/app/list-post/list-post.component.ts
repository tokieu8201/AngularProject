import { Component, EventEmitter, Output } from '@angular/core';
import { Item } from '../models/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {
  items: Item[] = [];
  searchString: string = '';
  // @Output() liked = new EventEmitter<boolean>();
  constructor(private itemService: ItemService){}
  
  ngOnInit(): void{
    this.itemService.getItems().subscribe(
      (items) => {
        this.items = items;
      }
    );
    //this.showListPosts()
  }
  
}
