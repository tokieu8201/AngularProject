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
    
    addPost(post: Item): Observable<Item>{
        return this.http.post<Item>(_api + '/item', post);
    }
    

    updatePost(post: Item): Observable<Item> {
        return this.http.put<Item>(`${_api}/item/${post.id}`, post);
    }
}
