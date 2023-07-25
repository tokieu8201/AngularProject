import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Item } from '../models/item';
import { query } from '@angular/animations';

const _api = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
})
export class ItemService {
    constructor(private http: HttpClient) { }
    getItems() : Observable<Item[]>{
        return this.http.get<Item[]>(_api + '/item');
    }

    getItemById(id: number): Observable<Item>{
        return this.http.get<Item>(_api + '/item/' +id);
    }
    search(key: string): Observable<Item[]>{
        key = key.trim().toLowerCase();
        return this.getItems().pipe(
            map(items => items.filter(item => item.title.toLowerCase().includes(key)))
        )
    }
}
