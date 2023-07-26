import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../models/item';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  item: Item | undefined;
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService
  ){ }
  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.id = Number(params.get('id'));
      this.itemService.getItemById(this.id).subscribe(
        (data) => {this.item = data}
      )
    })
  }
}
