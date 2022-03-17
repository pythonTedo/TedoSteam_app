import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedUploadComponent } from './feed-upload/feed-upload.component';
import { FeedUploadButtonComponent } from './feed-upload/feed-upload-button/feed-upload-button.component';
import { UserItemsComponent } from './user-items/user-items.component';

import { FeedProviderService } from './services/feed.provider.service';
import { UserItemComponent } from './user-item/user-item.component';

const entryComponents = [FeedUploadComponent];
const components = [
  FeedListComponent, 
  FeedItemComponent, 
  FeedUploadComponent, 
  UserItemsComponent,
  UserItemComponent,
  FeedUploadButtonComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: components,
  exports: components,
  entryComponents: entryComponents,
  providers: [FeedProviderService]
})
export class FeedModule {}
