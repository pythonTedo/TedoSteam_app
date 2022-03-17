import { Injectable } from '@angular/core';
import { FeedItem } from '../models/feed-item.model';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class FeedProviderService {
  currentFeed$: BehaviorSubject<FeedItem[]> = new BehaviorSubject<FeedItem[]>([]);

  constructor(private api: ApiService) { }

  async getFeed(): Promise<BehaviorSubject<FeedItem[]>> {
    const req = await this.api.get('/feed');
    
    const items = <FeedItem[]> req.rows;
    console.log(items);
    this.currentFeed$.next(items);
    return Promise.resolve(this.currentFeed$);
  }
  
  async getItem(id:string): Promise<any> {
    const req = await this.api.get('/feed/'+id);
    return Promise.resolve(req);
  }

  async uploadFeedItem(caption: string,price:number, file: File): Promise<any> {
    const res = await this.api.upload('/feed', file, {caption: caption,price, url: file.name});
    const feed = [res, ...this.currentFeed$.value];
    this.currentFeed$.next(feed);
    return res;
  }

  async buyItem(user_id:string,item_id:string){
   return  await this.api.post('/feed/'+item_id,{user_id});
  }

}