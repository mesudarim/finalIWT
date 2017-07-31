import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsListPage } from './notifications-list';

@NgModule({
  declarations: [
    NotificationsListPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsListPage),
  ],
  exports: [
    NotificationsListPage
  ]
})
export class NotificationsListPageModule {}
