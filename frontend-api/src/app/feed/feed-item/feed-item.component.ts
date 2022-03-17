import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FeedItem } from '../models/feed-item.model';
import { FeedProviderService } from '../services/feed.provider.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedItemComponent implements OnInit {
  @Input() feedItem: FeedItem;

  constructor(public auth:AuthService,private feedService:FeedProviderService) { }

  ngOnInit() {}

  async buyItem(item:FeedItem){
    this.feedService.buyItem(JSON.parse(this.auth.getUser()).user_id,item.item_id).then(data=>{
      console.log(data);
    }).catch((err)=>{
      console.error(err)
    })
  }
}
