import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsListPage } from './events-list';



@NgModule({
  declarations: [
    EventsListPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsListPage),

  ],
  exports: [
    EventsListPage
  ]
})
export class EventsListPageModule {}
