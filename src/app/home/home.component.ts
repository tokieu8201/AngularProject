import { Component, OnInit } from '@angular/core';
import { ITEMS, Item } from '../item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login']);
  }
}
