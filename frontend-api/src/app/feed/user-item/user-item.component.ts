import { Component, Input, OnInit } from '@angular/core';
import { FeedItem } from '../models/feed-item.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input() feedItem: any;
  constructor() { }

  ngOnInit() {}

}
