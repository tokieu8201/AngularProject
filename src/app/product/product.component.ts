import { Component } from '@angular/core';
import { ITEMS } from '../item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  items = ITEMS;
}
