import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { FeedProviderService } from '../services/feed.provider.service';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss'],
})
export class UserItemsComponent implements AfterViewInit {
  userItems:any = [];
  render = false;
  constructor(private authService:AuthService,private changeDetectRef:ChangeDetectorRef,private feedServise:FeedProviderService) { }

  async ngAfterViewInit() {
    let id = JSON.parse(this.authService.getUser()).user_id
    this.userItems = []
    this.authService.getAllUserItems(id).then(async (items)=>{
      let ids = items.ids
      for(let i = 0 ; i < ids.length;i++){
        let id= ids[i];
        let item = await this.feedServise.getItem(id);
        console.log(item);
        this.userItems.push(item)
      }
      /* this.userItems = items
      this.render = true;
      this.changeDetectRef.detectChanges() */
    })
  }
}